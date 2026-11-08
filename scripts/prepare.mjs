// Build and check only the public website package. No external requests or private inputs.
import './build.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { gzipSync } from 'node:zlib';

const root = path.resolve('dist');
const pageNames = ['index.html', 'research.html', 'engineering.html', '404.html'];
const sandbox = { window: {} };
vm.runInNewContext(await fs.readFile(path.join(root, 'js/project-data.js'), 'utf8'), sandbox);
const d = sandbox.window.TWINTRACK;
const problems = [];
const assetFiles = new Set();
const htmlPages = new Map();
let checkedReferences = 0;
let checkedAnchors = 0;

const fail = message => problems.push(message);
const isExternal = value => /^(?:https?:|mailto:|tel:|data:|blob:|\/\/)/i.test(value);
const decodeEntities = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
function localTarget(value, sourceFile) {
  if (!value || isExternal(value)) return null;
  if (/^[a-z][a-z\d+.-]*:/i.test(value)) {
    fail(`Unsupported or private URL in ${sourceFile}.`);
    return null;
  }
  const reference = decodeEntities(value);
  const [beforeHash, rawHash] = reference.split('#', 2);
  const rawPath = beforeHash.split('?', 1)[0];
  let file;
  let fragment;
  try {
    file = rawPath ? decodeURIComponent(rawPath) : sourceFile;
    fragment = rawHash ? decodeURIComponent(rawHash) : null;
  } catch {
    fail(`Malformed local URL in ${sourceFile}.`);
    return null;
  }
  const absolute = !rawPath ? path.join(root, sourceFile) : file.startsWith('/') ? path.resolve(root, `.${file}`) : path.resolve(root, path.dirname(sourceFile), file);
  let relative = path.relative(root, absolute);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    fail(`Local URL escapes the public package in ${sourceFile}.`);
    return null;
  }
  if (!relative || file.endsWith('/')) relative = path.join(relative, 'index.html');
  else if (!path.extname(relative) && htmlPages.has(`${relative.replaceAll(path.sep, '/')}.html`)) relative += '.html';
  return { file: relative.replaceAll(path.sep, '/'), absolute: path.join(root, relative), fragment };
}

async function checkReference(value, sourceFile, checkAnchor = false) {
  const target = localTarget(value, sourceFile);
  if (!target) return;
  checkedReferences++;
  try {
    const info = await fs.stat(target.absolute);
    if (!info.isFile()) {
      fail(`Local URL is not a file: ${target.file} (from ${sourceFile}).`);
      return;
    }
    if (!target.file.endsWith('.html')) assetFiles.add(target.file);
  } catch {
    fail(`Missing local asset or page: ${target.file} (from ${sourceFile}).`);
    return;
  }
  if (checkAnchor && target.fragment && target.file.endsWith('.html')) {
    checkedAnchors++;
    const page = htmlPages.get(target.file);
    if (!page) fail(`Anchor links to an unchecked HTML page: ${target.file}.`);
    else if (!page.ids.has(target.fragment)) fail(`Missing anchor: ${target.file}#${target.fragment} (from ${sourceFile}).`);
  }
}

for (const filename of pageNames) {
  const html = await fs.readFile(path.join(root, filename), 'utf8');
  const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) fail(`Duplicate HTML IDs in ${filename}.`);
  if (/\b(?:undefined|NaN)\b|\[object Object\]/.test(html)) fail(`Unresolved data value in ${filename}.`);
  if (/\b[A-Za-z]:[\\/]|file:\/\/|\/(?:Users|home)\/|\\\\[^\s<]+\\|\b[A-Za-z]%3A(?:%5C|%2F)/i.test(html)) fail(`Private filesystem path in ${filename}.`);
  if (/\bIMG_\d+\.(?:jpe?g|png|webp|heic)\b/i.test(html)) fail(`Original screenshot filename in ${filename}.`);
  htmlPages.set(filename, { html, ids: new Set(ids) });
}

const notFoundHtml = htmlPages.get('404.html').html;
if (!/name="robots" content="noindex"/.test(notFoundHtml)) fail('404 page should remain outside search indexing.');
for (const match of notFoundHtml.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  if (!isExternal(match[1]) && !match[1].startsWith('/') && !match[1].startsWith('#')) fail('404 links and assets must be root-absolute for nested missing routes.');
}

for (const [filename, { html }] of htmlPages) {
  for (const match of html.matchAll(/\b(href|src|poster)\s*=\s*["']([^"']+)["']/g)) {
    await checkReference(match[2], filename, match[1] === 'href');
  }
  for (const match of html.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/g)) {
    for (const candidate of match[1].split(',')) await checkReference(candidate.trim().split(/\s+/)[0], filename);
  }
}

const screenshotKeys = ['home', 'ai', 'profile', 'whatifLight', 'whatifDark', 'wellbeingLight', 'wellbeingDark', 'ipadHomeDark', 'ipadHomeLight', 'ipadAiDark', 'ipadAiLight', 'ipadProfileDark', 'ipadProfileLight'];
if (d.screenshots.publicUseApproved !== true) fail('Public screenshot approval is missing.');
for (const key of screenshotKeys) {
  const screenshot = d.screenshots[key];
  if (!screenshot?.src || !screenshot?.small) {
    fail(`Screenshot ${key} needs both responsive image files.`);
    continue;
  }
  if (!(screenshot.width > 0 && screenshot.height > 0) || !screenshot.alt) fail(`Screenshot ${key} lacks dimensions or alt text.`);
  await checkReference(screenshot.src, 'index.html');
  await checkReference(screenshot.small, 'index.html');
}
for (const key of ['src', 'poster', 'captions', 'transcript']) {
  if (d.demo[key]) await checkReference(d.demo[key], 'index.html');
}
if (d.seo.socialImage) await checkReference(d.seo.socialImage, 'index.html');
if (d.brand.appIcon) await checkReference(d.brand.appIcon, 'index.html');

const featureContract = ['sleep_hours', 'steps', 'exercise_minutes', 'resting_heart_rate', 'study_minutes', 'screen_time_minutes', 'previous_score'];
if (JSON.stringify(d.model.features) !== JSON.stringify(featureContract)) fail('Model must retain the exact seven-feature contract and order.');
if (d.evidence.unitTestCount + d.evidence.uiTestCount !== d.evidence.automatedTestTotal) fail('Unit and UI execution counts do not equal the recorded execution total.');

const fileStats = [];
const publicCodeFiles = [...pageNames];
for (const folder of ['css', 'js']) {
  const entries = await fs.readdir(path.join(root, folder), { withFileTypes: true });
  for (const entry of entries) if (entry.isFile() && entry.name.endsWith(`.${folder}`)) publicCodeFiles.push(`${folder}/${entry.name}`);
}
for (const filename of publicCodeFiles) {
  const buffer = await fs.readFile(path.join(root, filename));
  fileStats.push({ file: filename, bytes: buffer.byteLength, gzipBytes: gzipSync(buffer).byteLength });
  if (filename.endsWith('.css')) {
    const css = buffer.toString('utf8');
    for (const match of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)) await checkReference(match[1], filename);
  }
}

const totals = Object.fromEntries(['html', 'css', 'js'].map(type => {
  const matching = fileStats.filter(file => file.file.endsWith(`.${type}`));
  return [type, { files: matching.length, bytes: matching.reduce((sum, file) => sum + file.bytes, 0), gzipBytes: matching.reduce((sum, file) => sum + file.gzipBytes, 0) }];
}));
const report = {
  status: problems.length ? 'FAIL' : 'PASS',
  checkedAt: new Date().toISOString(),
  scope: 'Generated public package checks; not browser, accessibility, performance or iOS app verification.',
  pages: pageNames,
  checkedReferences,
  checkedAnchors,
  checkedAssetFiles: assetFiles.size,
  screenshots: screenshotKeys.length,
  modelFeatureCount: d.model.features.length,
  executionCountCheck: `${d.evidence.unitTestCount} + ${d.evidence.uiTestCount} = ${d.evidence.automatedTestTotal}`,
  demoVideoConfigured: Boolean(d.demo.src),
  publicUrlStatus: d.websiteUrl ? 'Custom-site canonical URL configured; live deployment and the separate Canva gateway link still require verification.' : 'Pending: custom-site production URL is not configured. The existing Canva QR destination is separate and unchanged.',
  fileStats,
  totals,
  problems
};
await fs.mkdir('qa', { recursive: true });
await fs.writeFile('qa/package-check.json', `${JSON.stringify(report, null, 2)}\n`);
if (problems.length) {
  for (const problem of problems) console.error(`FAIL: ${problem}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${pageNames.length} pages, unique IDs, ${checkedAnchors} local anchors, ${assetFiles.size} assets, all configured screenshots at both sizes and exact feature contract.`);
  console.log(`PASS: execution split ${report.executionCountCheck}; no unresolved values, private paths or original screenshot filenames in HTML.`);
}
console.log(report.publicUrlStatus);
console.log('Package check report: qa/package-check.json');
