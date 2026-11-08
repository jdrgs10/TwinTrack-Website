/* Canonical public data. Run node scripts/prepare.mjs after changes. */
window.TWINTRACK = {
  name: 'TwinTrack AI',
  subtitle: 'Student Reflection Prototype',
  institution: 'Applied Technology Schools — Baniyas',
  websiteUrl: 'https://twintrack-ai.pages.dev/',
  repositoryUrl: null,
  seo: {
    title: 'TwinTrack AI — Student Reflection Prototype',
    description: 'TwinTrack AI helps students track wellbeing and everyday habits on iPhone and iPad, with Apple Health context, academic reflection and on-device tools.',
    ogTitle: 'TwinTrack AI — The App, Engineering and Evidence',
    ogDescription: 'Student wellbeing and everyday habits, at home and on iPad at school. Explore the real app, HealthKit integration, engineering and research.',
    socialImage: 'assets/social-preview.jpg'
  },
  model: {
    name: 'TwinTrack Ridge V2', version: '2.0-final.1', alpha: 0.1,
    targetDays: '1–7', previousResultDays: '1–90', outputRange: '0–100', rhrHours: 72,
    features: ['sleep_hours','steps','exercise_minutes','resting_heart_rate','study_minutes','screen_time_minutes','previous_score']
  },
  brand: {
    mark: 'assets/brand/twintrack-128.webp', mark2x: 'assets/brand/twintrack-256.webp', largeMark: 'assets/brand/twintrack-640.webp',
    appIcon: null, faviconFallback: 'assets/brand/twintrack-128.webp',
    ats: 'assets/brand/ats-400.webp', actvet: 'assets/brand/actvet-400.webp'
  },
  screenshots: {
    publicUseApproved: true,
    finalFrozen: false,
    ipadHomeDark: {"src": "assets/screenshots/ipad-home-dark-960.webp", "small": "assets/screenshots/ipad-home-dark-480.webp", "width": 960, "height": 637, "alt": "TwinTrack Home in Dark appearance on iPad, supplied by the project owner. Landscape app layout."},
    ipadHomeLight: {"src": "assets/screenshots/ipad-home-light-960.webp", "small": "assets/screenshots/ipad-home-light-480.webp", "width": 960, "height": 616, "alt": "TwinTrack Home in Light appearance on iPad, supplied by the project owner. Landscape app layout."},
    ipadAiDark: {"src": "assets/screenshots/ipad-ai-dark-960.webp", "small": "assets/screenshots/ipad-ai-dark-480.webp", "width": 960, "height": 627, "alt": "TwinTrack TwinTrack AI in Dark appearance on iPad, supplied by the project owner. Landscape app layout."},
    ipadAiLight: {"src": "assets/screenshots/ipad-ai-light-960.webp", "small": "assets/screenshots/ipad-ai-light-480.webp", "width": 960, "height": 629, "alt": "TwinTrack TwinTrack AI in Light appearance on iPad, supplied by the project owner. Landscape app layout."},
    ipadProfileDark: {"src": "assets/screenshots/ipad-profile-dark-960.webp", "small": "assets/screenshots/ipad-profile-dark-480.webp", "width": 960, "height": 641, "alt": "TwinTrack Profile in Dark appearance on iPad, supplied by the project owner. Landscape app layout."},
    ipadProfileLight: {"src": "assets/screenshots/ipad-profile-light-960.webp", "small": "assets/screenshots/ipad-profile-light-480.webp", "width": 960, "height": 619, "alt": "TwinTrack Profile in Light appearance on iPad, supplied by the project owner. Landscape app layout."},
    home: { src: 'assets/screenshots/home-dark-960.webp', small: 'assets/screenshots/home-dark-480.webp', width: 1125, height: 2257, alt: 'Current TwinTrack Home in dark appearance, with a saved experimental assessment estimate and Apple Health source summaries. Fictional demo data.' },
    ai: { src: 'assets/screenshots/ai-dark-960.webp', small: 'assets/screenshots/ai-dark-480.webp', width: 1116, height: 2310, alt: 'Current TwinTrack AI in dark appearance, showing on-device chat information and Manual What-If.' },
    profile: { src: 'assets/screenshots/profile-dark-960.webp', small: 'assets/screenshots/profile-dark-480.webp', width: 1094, height: 2288, alt: 'Current TwinTrack Profile in dark appearance, showing data sources, optional wellbeing and the Ridge Regression card. Fictional demo profile.' },
    whatifLight: { src: 'assets/screenshots/whatif-light-960.webp', small: 'assets/screenshots/whatif-light-480.webp', width: 1055, height: 1292, alt: 'Real Light What-If example: steps and exercise adjusted, study changed from 2 to 4 hours, recreational screen time reduced. Actual model comparison with fictional data.' },
    whatifDark: { src: 'assets/screenshots/whatif-dark-960.webp', small: 'assets/screenshots/whatif-dark-480.webp', width: 1034, height: 1274, alt: 'Real Dark What-If example: steps and exercise adjusted, study changed from 2 to 3 hours, recreational screen time reduced. A different scenario from the Light example, using fictional data.' },
    wellbeingLight: { src: 'assets/screenshots/wellbeing-light-960.webp', small: 'assets/screenshots/wellbeing-light-480.webp', width: 1125, height: 1552, alt: 'Body & Wellbeing in Light appearance, showing a fictional BMI example. Separate from academic Ridge prediction.' },
    wellbeingDark: { src: 'assets/screenshots/wellbeing-dark-960.webp', small: 'assets/screenshots/wellbeing-dark-480.webp', width: 1125, height: 1709, alt: 'Body & Wellbeing in Dark appearance, showing a fictional BMI example. Separate from academic Ridge prediction.' }
  },
  gallery: {
    home: { title: 'Home', text: 'A saved estimate, the inputs behind it, and the next useful action. Refreshing the screen does not create a new prediction.' },
    ai: { title: 'TwinTrack AI', text: 'Conversation around permitted app context. App-owned tools supply authoritative numerical cards; Foundation Models supplies prose when available.' },
    profile: { title: 'Profile', text: 'Manual inputs, appearance, local data controls, Trends & History and optional wellbeing. Numerical modeling and conversation remain separate.' }
  },
  demo: { src: null, poster: null, type: 'video/mp4', captions: null, captionsLanguage: 'en', captionsLabel: 'English', transcript: null, status: 'Demo recording in preparation', disclosure: 'Fictional demo data. Estimates calculated by the actual frozen model.' },
  team: [
    { name: 'Mansoor Eissa', role: 'Programmer & Group Leader' },
    { name: 'Ahmed Tareq', role: 'Developer' },
    { name: 'Mohamed Mabkhoot', role: 'Designer' },
    { name: 'Ahmed Ibrahim', role: 'Financial Manager' }
  ],
  showTeam: true,
  evidence: {
    lastValidatedDate: '2026-10-06', displayDate: '6 October 2026', gateTime: '02:21–03:00 Asia/Dubai',
    scope: 'Complete simulator suite', environment: 'Xcode 26.6 · iPhone 17 Pro simulator · iOS 26.5',
    releaseStatus: 'Latest automated gate passed',
    automatedTestTotal: 534, distinctCaseTotal: 531, unitTestCount: 492, uiTestCount: 42, distinctUiMethods: 39, launchConfigurations: 4,
    failures: 0, skips: 0,
    v2Parity: { passed: 176, total: 176 }, v1Parity: { passed: 21, total: 21 },
    parityTolerance: '1e-6', maxAbsoluteError: '2.84217e-14',
    buildStatus: 'PASS', analyzeStatus: 'PASS', compilerWarnings: 0, analyzerWarnings: 0, buildErrors: 0,
    runtimeFindings: ['Two Body-layout runtime entries remain recorded.', 'One grouped debugger-termination warning remains recorded.'],
    physicalAcceptanceStatus: 'Final physical acceptance pending', featureFreezeStatus: 'Feature/UI freeze not declared',
    ipad: { cases: 4, initial: '2/4', unchangedRerun: '2/2' }
  },
  research: {
    students: 207, observations: 963, validationFolds: 50, outcomeScale: '0–4 grade points',
    prior: { mae: 0.17127, rmse: 0.23888, r2: 0.52495 },
    delta: { mae: 0.00003, rmse: 0.00053, r2: -0.00181 }
  },
  evidenceLinks: []
};
