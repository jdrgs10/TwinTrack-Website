// Local QA only. This deliberately serves no production deployment or arbitrary files.
import http from 'node:http';
import { readFile } from 'node:fs/promises';

http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://127.0.0.1:4189').pathname;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (pathname === '/deliberately-missing.mp4') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Deliberate QA fixture failure. No demo video exists.');
    return;
  }
  if (pathname === '/fixture-captions.vtt') {
    res.writeHead(200, { 'Content-Type': 'text/vtt; charset=utf-8' }).end('WEBVTT\n\n');
    return;
  }
  if (pathname === '/fixture-transcript.txt') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Local QA fixture only. No demo recording or transcript has been supplied.');
    return;
  }
  if (pathname !== '/' && pathname !== '/demo-fixture.html') {
    res.writeHead(404).end('Not found');
    return;
  }
  try {
    const body = await readFile('qa/demo-fixture.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(body);
  } catch {
    res.writeHead(404).end('Run node scripts/check-render-states.mjs to generate the QA fixture.');
  }
}).listen(4189, '127.0.0.1', () => console.log('TwinTrack local QA fixture: http://127.0.0.1:4189/demo-fixture.html'));
