# TwinTrack AI website

A three-page case study about the TwinTrack AI student wellbeing and academic reflection prototype, with a separate static 404 page. The custom site is live at [twintrack-ai.pages.dev](https://twintrack-ai.pages.dev/). The [Canva gateway](https://twintrack.my.canva.site/) is the destination of the existing printed QR code.

## Run locally

Use a current Node.js runtime. No package installation is required.

```sh
node scripts/prepare.mjs
node scripts/serve.mjs
```

Open [http://127.0.0.1:4187](http://127.0.0.1:4187). Preparation renders and validates the static site; it does not deploy.

Edit shared content in `dist/js/project-data.js`, page templates in `scripts/`, and site styles in `dist/css/`. Approved optimized images and the ready-to-serve site live under `dist/`. Rerun preparation before committing changes to templates or shared content.

The site presents prototype and research evidence with its limitations. It does not collect student or health data. Original assets, internal reports, QA captures, and deployment caches are kept outside the repository.
