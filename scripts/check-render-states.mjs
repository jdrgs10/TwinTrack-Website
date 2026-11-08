// Exercise the real overview renderer and video error handlers without changing public data.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import overview from './overview-page.mjs';

const sourceConfig = await fs.readFile('dist/js/project-data.js', 'utf8');
const sourceHash = createHash('sha256').update(sourceConfig).digest('hex');
const sandbox = { window: {} };
vm.runInNewContext(sourceConfig, sandbox);
const data = sandbox.window.TWINTRACK;
const esc = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const checks = [];
const check = (name, action) => { action(); checks.push({ name, status: 'PASS' }); };
const demoSection = html => {
  const match = html.match(/<section class="demo-section wrap"[\s\S]*?<\/section>/);
  assert.ok(match, 'Overview must have a real demo section.');
  return match[0];
};
const render = config => demoSection(overview(config, esc, () => ''));

const absentData = structuredClone(data);
absentData.demo.src = null;
const absent = render(absentData);
check('Absent recording uses honest status and no player', () => {
  assert.match(absent, /Demo recording in preparation/);
  assert.doesNotMatch(absent, /<(?:video|source|track|iframe)\b|Watch (?:the )?demo/i);
  assert.match(absent, /physical acceptance and UI freeze/);
});

const presentData = structuredClone(data);
Object.assign(presentData.demo, {
  src: '/deliberately-missing.mp4',
  poster: `http://127.0.0.1:4187/${data.seo.socialImage}`,
  type: 'video/mp4',
  captions: '/fixture-captions.vtt',
  captionsLanguage: 'en',
  captionsLabel: 'English',
  transcript: '/fixture-transcript.txt'
});
const present = render(presentData);
const videoTag = present.match(/<video\b[^>]*>/)?.[0];
check('Configured video has accessible native playback and no automatic media load', () => {
  assert.ok(videoTag);
  assert.equal([...present.matchAll(/<video\b/g)].length, 1);
  assert.match(videoTag, /\bcontrols\b/);
  assert.match(videoTag, /\bplaysinline\b/);
  assert.match(videoTag, /\bpreload="none"/);
  assert.match(videoTag, /\baria-label="TwinTrack project demonstration"/);
  assert.doesNotMatch(videoTag, /\bautoplay\b/);
  assert.match(present, /<source src="\/deliberately-missing\.mp4" type="video\/mp4">/);
  assert.match(present, /Your browser does not support video/);
  assert.doesNotMatch(present, /class="demo-empty"/);
});
check('Configured poster, default captions, transcript and disclosure are retained', () => {
  assert.ok(videoTag.includes(`poster="${esc(presentData.demo.poster)}"`));
  assert.match(present, /<track kind="captions" src="\/fixture-captions\.vtt" srclang="en" label="English" default>/);
  assert.match(present, /href="\/fixture-transcript\.txt">Read the transcript/);
  assert.ok(present.includes(esc(data.demo.disclosure)));
});
check('Error layout starts hidden beside the actual video', () => {
  const frame = present.match(/<div\b[^>]*\bclass="[^"]*\bvideo-frame\b[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1];
  assert.ok(frame, 'The video and its failure feedback must share a layout frame.');
  assert.match(frame, /<video\b[\s\S]*?<\/video>/);
  const error = frame.match(/<p\b(?=[^>]*\bclass="[^"]*\bvideo-error\b[^"]*")([^>]*)>([\s\S]*?)<\/p>/);
  assert.ok(error, 'The frame must contain the video failure message.');
  assert.match(error[1], /\bhidden(?:\s|=|$)/);
  assert.match(error[1], /\brole="status"/);
  assert.match(error[2], /The recording could not load\. Please try again later\./);
});

const minimalData = structuredClone(presentData);
minimalData.demo.poster = null;
minimalData.demo.captions = null;
minimalData.demo.transcript = null;
const minimal = render(minimalData);
check('Optional unsupplied media fields do not create broken or null controls', () => {
  assert.doesNotMatch(minimal, /poster=|<track\b|Read the transcript|\b(?:undefined|null|NaN)\b/);
  assert.match(minimal, /<video controls playsinline preload="none"/);
  assert.ok(minimal.includes(esc(data.demo.disclosure)));
});

const sourceElement = new EventTarget();
const videoElement = new EventTarget();
videoElement.querySelector = selector => selector === 'source' ? sourceElement : null;
const message = { hidden: true };
const documentEvents = new EventTarget();
const documentStub = {
  documentElement: { classList: { add() {} } },
  querySelector: selector => selector === 'video' ? videoElement : selector === '.video-error' ? message : null,
  querySelectorAll: () => [],
  addEventListener: documentEvents.addEventListener.bind(documentEvents)
};
vm.runInNewContext(await fs.readFile('dist/js/main.js', 'utf8'), {
  window: { TWINTRACK: data, matchMedia: () => new EventTarget() },
  document: documentStub
});
check('Actual main.js shows failure feedback on a source loading error', () => {
  sourceElement.dispatchEvent(new Event('error'));
  assert.equal(message.hidden, false);
});
check('Actual main.js shows failure feedback on a video error', () => {
  message.hidden = true;
  videoElement.dispatchEvent(new Event('error'));
  assert.equal(message.hidden, false);
});

const fixture = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Local QA — TwinTrack missing-video state</title><link rel="stylesheet" href="http://127.0.0.1:4187/css/styles.css"><script src="http://127.0.0.1:4187/js/project-data.js" defer></script><script src="http://127.0.0.1:4187/js/main.js" defer></script></head>
<body><main id="main"><section class="wrap" style="padding-top:32px"><p class="eyebrow">LOCAL QA FIXTURE · NOT PUBLIC CONTENT</p><h1 style="font-size:28px">Unavailable video: playback failure test</h1><p>The source deliberately returns 404. This tests the finished player’s failure message; no demonstration recording is supplied.</p><button class="button primary" id="attempt-playback" type="button">Attempt playback (QA)</button></section>${present}</main><script>document.getElementById('attempt-playback').addEventListener('click', () => { document.querySelector('video').play().catch(() => {}); });</script></body></html>`;
await fs.mkdir('qa', { recursive: true });
await fs.writeFile('qa/demo-fixture.html', fixture);
const unchangedConfig = await fs.readFile('dist/js/project-data.js', 'utf8');
check('Production config was not modified by state tests', () => {
  assert.equal(sourceHash, createHash('sha256').update(unchangedConfig).digest('hex'));
});
await fs.writeFile('qa/render-states-check.json', `${JSON.stringify({
  status: 'PASS', checkedAt: new Date().toISOString(), checks,
  scope: 'Renderer contracts and actual video-error event handlers. Browser media loading, video playback success and caption synchronization require a real recording and browser verification.',
  fixture: 'http://127.0.0.1:4189/demo-fixture.html'
}, null, 2)}\n`);
console.log(`PASS: ${checks.length} demo renderer and error-handler checks. Production configuration unchanged.`);
console.log('Local-only fixture: qa/demo-fixture.html');
console.log('Start with: node scripts/serve-fixtures.mjs');
