import fs from 'node:fs/promises';
import vm from 'node:vm';
import overview from './overview-page.mjs';
import research from './research-page.mjs';
import engineering from './engineering-page.mjs';

const sandbox = { window: {} };
vm.runInNewContext(await fs.readFile('dist/js/project-data.js','utf8'), sandbox);
const d = sandbox.window.TWINTRACK;
export const esc = s => String(s ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const image = (key,id,priority=false,sizes='(max-width: 650px) 320px, 360px') => {
 const s = d.screenshots[key];
 return `<img id="${id}" src="${s.small}" srcset="${s.small} 480w, ${s.src} 960w" sizes="${sizes}" width="${s.width}" height="${s.height}" alt="${esc(s.alt)}" ${priority?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
};
function header(page) {
 return `<a class="skip-link" href="#main">Skip to content</a><header class="header"><div class="wrap header-inner"><a class="brand" href="index.html" aria-label="TwinTrack AI overview"><img src="${d.brand.mark}" srcset="${d.brand.mark} 1x, ${d.brand.mark2x} 2x" width="50" height="27" alt=""><span>${esc(d.name)}</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">☰</span></button><nav id="navigation" aria-label="Main navigation"><a href="index.html" ${page==='index'?'aria-current="page"':''}>Overview</a><a href="index.html#app">The app</a><a href="research.html" ${page==='research'?'aria-current="page"':''}>Research</a><a href="engineering.html" ${page==='engineering'?'aria-current="page"':''}>Engineering & evidence</a><a href="index.html#demo">${d.demo.src?'Watch demo':'Demo'}</a></nav></div></header>`;
}
function footer(){return `<footer class="footer dark"><div class="wrap"><div><a class="brand" href="index.html"><img src="${d.brand.mark}" width="50" height="27" alt="" loading="lazy"><span>${esc(d.name)}</span></a><p>Evidence-informed. Explicitly experimental.</p></div><nav aria-label="Footer navigation"><a href="index.html#app">The app</a><a href="research.html">Research</a><a href="engineering.html">Engineering & evidence</a><a href="#top">Back to top ↑</a></nav></div></footer>`;}
const pages = [{key:'index',title:d.seo.title,body:()=>overview(d,esc,image)},{key:'research',title:'Research & Evidence — TwinTrack AI',body:()=>research(d,esc)},{key:'engineering',title:'Engineering & Evidence — TwinTrack AI',body:()=>engineering(d,esc)}];
for (const page of pages) {
 let urls='';
 if (d.websiteUrl) {
  const base=new URL(d.websiteUrl);
  if(!/^https?:$/.test(base.protocol))throw Error('Website URL must use HTTPS or HTTP.');
  if(!base.pathname.endsWith('/')&&!base.pathname.endsWith('.html'))base.pathname+='/';
  const current=page.key==='index'?base:new URL(page.key,base);
  urls=`<link rel="canonical" href="${esc(current.href)}"><meta property="og:url" content="${esc(current.href)}"><meta property="og:image" content="${esc(new URL(d.seo.socialImage,base).href)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="TwinTrack AI — A student reflection prototype, with a real current app screen">`;
 }
 const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#081522"><title>${esc(page.title)}</title><meta name="description" content="${esc(d.seo.description)}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(d.seo.ogTitle)}"><meta property="og:description" content="${esc(d.seo.ogDescription)}"><meta name="twitter:card" content="summary_large_image">${urls}<link rel="icon" href="${d.brand.appIcon||d.brand.faviconFallback}"><link rel="stylesheet" href="css/styles.css"><noscript><style>.menu-toggle{display:none}.header{position:static}.header-inner{flex-wrap:wrap}.header nav{display:flex;position:static;flex-wrap:wrap;padding:0;gap:8px 18px}.app-switcher{display:none}</style></noscript><script src="js/project-data.js" defer></script><script src="js/main.js" defer></script></head><body id="top" class="page-${page.key}">${header(page.key)}<main id="main" tabindex="-1">${page.body()}</main>${footer()}</body></html>`;
 await fs.writeFile(`dist/${page.key}.html`,html);
}
// A real 404 prevents Pages from treating this multipage site as an SPA.
// Root-absolute assets and links also work for missing nested routes.
const rootAsset = value => /^https?:\/\//.test(value) ? value : `/${value.replace(/^\/+/, '')}`;
const notFound=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#081522"><meta name="robots" content="noindex"><title>Page not found — ${esc(d.name)}</title><link rel="icon" href="${esc(rootAsset(d.brand.appIcon||d.brand.faviconFallback))}"><link rel="stylesheet" href="/css/styles.css"></head><body class="page-not-found"><a class="skip-link" href="#main">Skip to content</a><header class="header"><div class="wrap header-inner"><a class="brand" href="/" aria-label="TwinTrack AI overview"><img src="${esc(rootAsset(d.brand.mark))}" width="50" height="27" alt=""><span>${esc(d.name)}</span></a></div></header><main class="section wrap" id="main" tabindex="-1"><p class="eyebrow blue">404 · PAGE NOT FOUND</p><h1>This page isn’t here.</h1><p class="lead">The address may have changed. Explore the TwinTrack app, research and engineering from the overview.</p><div class="actions"><a class="button primary" href="/">Return to overview <span aria-hidden="true">→</span></a><a class="text-link" href="/research">Read the research</a><a class="text-link" href="/engineering">Explore the engineering</a></div></main></body></html>`;
await fs.writeFile('dist/404.html',notFound);
console.log('Built Overview, Research, Engineering & Evidence, and the static 404 from shared project data.');
