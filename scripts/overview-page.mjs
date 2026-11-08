export default function overview(d, esc, picture) {
  const e = d.evidence;
  return `
  <section class="hero dark" id="overview" aria-labelledby="hero-title">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> EXPERIMENTAL NATIVE PROTOTYPE</p>
        <h1 id="hero-title">Your wellbeing.<br>Your habits.<br><em>Your school day.</em></h1>
        <p class="hero-description">TwinTrack helps students track their wellbeing and reflect on everyday habits alongside their studies. Built for iPhone and iPad, with Apple Health context, personal inputs and on-device conversation when available.</p>
        <div class="actions"><a class="button primary" href="#app">See the app <span aria-hidden="true">↗</span></a><a class="text-link" href="engineering.html">Explore the engineering <span aria-hidden="true">→</span></a></div>
      </div>
      <div class="hero-media">
        <div class="phone hero-phone">${picture('home','hero-screen',true,'(max-width: 650px) 164px, 320px')}</div>
        <div class="hero-annotations" aria-label="Three parts of the prototype">
          <div><span>01 / CONTEXT</span><strong>Apple Health<br>& your inputs</strong></div>
          <div><span>02 / MODEL</span><strong>Deterministic<br>Ridge estimates</strong></div>
          <div><span>03 / CONVERSATION</span><strong>Foundation<br>Models</strong><small>When available</small></div>
        </div>
      </div>
      <p class="hero-footnote">REAL APP · FICTIONAL DEMO DATA</p>
    </div>
  </section>
  <nav class="section-nav wrap" aria-label="Quick project navigation"><a href="#app">The app <span>↓</span></a><a href="research.html">Research <span>↗</span></a><a href="engineering.html#verification">Evidence <span>↗</span></a></nav>
  <section class="section wrap opening">
    <p class="eyebrow blue">THE QUESTION BEHIND THE PROJECT</p>
    <div class="two-column"><h2>Understand the habits<br>behind your school day.</h2><div><p class="lead">Student wellbeing is the starting point: sleep, movement, study time and the routines that make up a day.</p><p>TwinTrack brings available Apple Health data and student-entered records into one place for tracking and reflection. Students can review their wellbeing, explore their recorded habits and consider their academic context on the device that fits their day.</p><p>Experimental assessment estimates and What-If scenarios add another perspective, with clear limits on what the model can tell us.</p></div></div>
  </section>
  <section class="section app-section" id="app">
    <div class="wrap">
      <div class="section-head"><div><p class="eyebrow blue">THE REAL APP</p><h2>Three spaces.<br>One connected experience.</h2></div><p>Native SwiftUI on iPhone and iPad.<br>Home, TwinTrack AI and Profile.</p></div>
      <div class="app-showcase">
        <div class="app-switcher" role="tablist" aria-label="App screenshots">
          ${['home','ai','profile'].map((key,i)=>`<button role="tab" id="tab-${key}" aria-controls="app-panel" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}" data-screen-tab="${key}">${esc(d.gallery[key].title)}</button>`).join('')}
        </div>
        <div class="app-stage" role="tabpanel" id="app-panel" aria-labelledby="tab-home" tabindex="0">
          <div class="phone gallery-phone">${picture('home','gallery-screen',false,'(max-width: 650px) 300px, 340px')}</div>
        </div>
        <div class="gallery-caption"><p class="eyebrow blue" id="gallery-number">01 / HOME</p><h3 id="gallery-title">Your day, in context.</h3><p id="gallery-copy">${esc(d.gallery.home.text)}</p><p class="caption">Genuine app captures. Fictional demo information. Tap a tab to inspect another space.</p><a class="text-link" href="engineering.html#data-lifecycle">See how records are handled <span aria-hidden="true">↗</span></a></div>
      </div>
      <noscript><p class="note">The Home screenshot is shown above. <a href="${d.screenshots.ai.src}">View TwinTrack AI</a> or <a href="${d.screenshots.profile.src}">view Profile</a>.</p></noscript>
    </div>
  </section>
  <section class="section dark ipad-section" id="ipad" aria-labelledby="ipad-title">
    <div class="wrap">
      <div class="two-column"><div><p class="eyebrow">BUILT AROUND THE SCHOOL DAY</p><h2 id="ipad-title">Wellbeing that fits<br>the school day.</h2></div><div><p class="lead">A clearer view of your wellbeing, on the iPad you use at school.</p><p>TwinTrack gives students a place to review their wellbeing, track study habits and reflect on their daily routine during school. Health data collected outside school can become part of that picture once it has synced to their iPad.</p><p>Students can explore their available sleep, movement and activity records alongside their study inputs, connecting everyday habits with academic reflection. Home, TwinTrack AI and Profile adapt to the larger display in Light and Dark appearances.</p></div></div>
      <figure class="ipad-feature"><a href="${esc(d.screenshots.ipadHomeDark.src)}" aria-label="Open the full iPad Home screenshot">${picture('ipadHomeDark','ipad-home-screen',false,'(max-width: 650px) 92vw, 960px')}</a><figcaption>Home on iPad · supplied app capture. Tap to view the larger image.</figcaption></figure>
      <div class="two-column ipad-sync"><div><p class="eyebrow">OUTSIDE SCHOOL → DURING SCHOOL</p><h3>Bring everyday health context into reflection.</h3><p>Health information collected outside school can sync through Apple Health and iCloud to the student’s iPad. With permission, TwinTrack reads available sleep, steps, exercise and resting heart rate through HealthKit, ready to review alongside student-entered study records.</p></div><div><h3>Health sync depends on the school’s setup.</h3><p>Devices need the same Apple Account, Health enabled in iCloud and an internet connection for sync. TwinTrack needs permission to read the relevant categories. Managed school accounts and device restrictions require checking with the school; automatic Health sync cannot be assumed.</p><p>Students review the health data already available on their iPad. Apple Health sync does not itself transfer TwinTrack’s study records, chats or saved estimates.</p><a class="text-link" href="https://support.apple.com/en-mide/guide/ipad/ipad50c1fd42/ipados" target="_blank" rel="noopener noreferrer">Apple’s guide to Health sync ↗</a></div></div>
      <details class="detail"><summary>Explore the iPad screens <span class="plus" aria-hidden="true">+</span></summary><div class="ipad-grid">${[['ipadHomeLight','Home · Light'],['ipadAiDark','TwinTrack AI · Dark'],['ipadAiLight','TwinTrack AI · Light'],['ipadProfileDark','Profile · Dark'],['ipadProfileLight','Profile · Light']].map(([key,label])=>`<figure><a href="${esc(d.screenshots[key].src)}" aria-label="Open ${esc(label)} iPad screenshot">${picture(key,`screen-${key}`,false,'(max-width: 650px) 90vw, 520px')}</a><figcaption>${esc(label)}</figcaption></figure>`).join('')}</div></details>
      <p class="caption ipad-evidence">iPad operation confirmed by the project owner, with six supplied screenshots. These captures supplement the dated engineering evidence; they do not replace a complete device acceptance test.</p>
    </div>
  </section>
  <section class="demo-section wrap" id="demo" aria-labelledby="demo-title">
    <div><p class="eyebrow blue">THE WALKTHROUGH</p><h2 id="demo-title">A closer look at TwinTrack.</h2><p>Home, a real calculation, a temporary scenario, and an explanation of the saved result.</p></div>
    <div class="demo-shell" id="demo-shell">
      ${d.demo.src ? `<div class="video-frame"><video controls playsinline preload="none" ${d.demo.poster?`poster="${esc(d.demo.poster)}"`:''} aria-label="TwinTrack project demonstration"><source src="${esc(d.demo.src)}" type="${esc(d.demo.type)}">${d.demo.captions?`<track kind="captions" src="${esc(d.demo.captions)}" srclang="${esc(d.demo.captionsLanguage)}" label="${esc(d.demo.captionsLabel)}" default>`:''}<p>Your browser does not support video. <a href="${esc(d.demo.src)}">Open the demonstration file</a>.</p></video><p class="video-error" role="status" hidden>The recording could not load. Please try again later.</p></div><p class="caption">${esc(d.demo.disclosure)}</p>${d.demo.transcript?`<a class="text-link" href="${esc(d.demo.transcript)}">Read the transcript ↗</a>`:''}` : `<div class="demo-empty"><span class="recording-symbol" aria-hidden="true">◌</span><div><strong>${esc(d.demo.status)}</strong><p>The final film will follow physical acceptance and UI freeze.</p></div></div>`}
    </div>
  </section>
  <section class="section dark" id="how-it-works">
    <div class="wrap">
      <div class="section-head"><div><p class="eyebrow">THE ENGINEERING IDEA</p><h2>Ridge owns the numbers.<br><span class="violet-text">AI handles the conversation.</span></h2></div><p>The numerical and conversational paths have different responsibilities.</p></div>
      <div class="role-split"><article><p class="eyebrow">DETERMINISTIC</p><h3>A reproducible numerical core.</h3><p>Four accessible HealthKit values and three manual inputs enter a frozen, standardized Ridge model. An explicit run produces an experimental estimate and saves its source context.</p><div class="flow-mini"><span>Eligible inputs</span><span aria-hidden="true">→</span><span>Ridge V2</span><span aria-hidden="true">→</span><span>Saved estimate</span></div></article><article class="conversation"><p class="eyebrow">GENERATIVE</p><h3>Conversation around grounded results.</h3><p>App-owned routing and tools provide permitted context and numerical cards. Apple Foundation Models supplies conversation and explanation on supported, ready devices.</p><div class="flow-mini"><span>App context & tools</span><span aria-hidden="true">→</span><span>Explanation</span></div></article></div>
      <details class="detail feature-disclosure"><summary>Exactly seven model inputs <span class="summary-meta">4 HealthKit + 3 manual</span><span class="plus" aria-hidden="true">+</span></summary><div class="detail-body two-column"><div><h3>Apple Health / HealthKit</h3><ol class="feature-list"><li>Sleep hours</li><li>Steps</li><li>Apple Exercise Time, minutes</li><li>Resting heart rate</li></ol></div><div><h3>Manual inputs</h3><ol class="feature-list" start="5"><li>Selected-subject study minutes</li><li>Recreational screen-time minutes</li><li>Previous comparable score</li></ol></div><p class="span-all">Subject, assessment and dates determine context and eligibility. They are not extra Ridge features. Missing or stale inputs prevent a new eligible calculation.</p></div></details>
      <div class="section-end"><p class="caption">Synthetic-trained V2. Real-student predictive accuracy is not established.</p><a class="text-link" href="engineering.html#architecture">Explore the full architecture <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>
  <section class="section wrap scenario-section" id="what-if">
    <div class="scenario-copy"><p class="eyebrow blue">MODEL SENSITIVITY</p><h2>Explore a scenario,<br>not a promise.</h2><p class="lead">A different input profile.<br>The same frozen model.</p><p>What-If starts from a captured eligible baseline, applies temporary changes and compares the outputs. It leaves real inputs and normal prediction history unchanged.</p><p class="note">This shows how the model responds. It does not establish what changing a habit would cause.</p><a class="text-link" href="engineering.html#model-contract">Read the model contract <span aria-hidden="true">↗</span></a></div>
    <div class="scenario-showcase">
      <fieldset class="segmented-control"><legend>Real scenario examples</legend><label><input type="radio" name="scenario" value="whatifLight" checked><span>Light example</span></label><label><input type="radio" name="scenario" value="whatifDark"><span>Dark example</span></label></fieldset>
      <div class="scenario-image">${picture('whatifLight','scenario-screen',false,'(max-width: 650px) 340px, 470px')}</div>
      <p class="caption" id="scenario-caption" aria-live="polite">Light example: study changes from 2h to 4h. The Dark example uses 2h to 3h; these are different scenarios, not an appearance-only comparison.</p>
      <noscript><a class="text-link" href="${d.screenshots.whatifDark.src}">View the different Dark scenario ↗</a></noscript>
    </div>
  </section>
  <section class="section research-overview" id="research">
    <div class="wrap">
      <p class="eyebrow blue">WHAT CHANGED THE THINKING?</p>
      <div class="two-column"><div><h2>The evidence changed<br>the claim.</h2><p class="lead">Wearable context was worth exploring. Its added predictive value had to be tested.</p></div><div><p>The completed NetHealth comparison found no convincing improvement beyond prior academic performance. The wider review also found unequal support across TwinTrack’s seven inputs.</p><p>The result sharpened the project’s purpose: an evidence-informed reflection prototype, with a research question still to test.</p></div></div>
      <div class="research-result"><div><span class="eyebrow blue">NETHEALTH</span><p><strong>${d.research.students}</strong> students · <strong>${d.research.observations}</strong> repeated student-semester observations</p></div><div><h3>No convincing incremental wearable value.</h3><p>A separate U.S. undergraduate study. It does not validate deployed TwinTrack V2.</p></div><a class="text-link" href="research.html#nethealth">Read the comparison <span aria-hidden="true">↗</span></a></div>
      <div class="section-end"><p>Previous score has the strongest support. The other inputs have mixed, weak or insufficient direct academic evidence.</p><a class="text-link" href="research.html#input-evidence">Inspect all seven inputs <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>
  <section class="section wrap" id="evidence">
    <div class="section-head"><div><p class="eyebrow blue">SOFTWARE VERIFICATION</p><h2>Tested behavior.<br>A clear boundary.</h2></div><p>Recorded ${esc(e.displayDate)}.<br>${esc(e.scope)}.</p></div>
    <div class="verification-strip"><div><strong class="big-stat">${e.automatedTestTotal}<small>/${e.automatedTestTotal}</small></strong><span class="stat-label">Simulator executions passed</span></div><div><strong class="big-stat">${e.distinctCaseTotal}</strong><span class="stat-label">Distinct cases</span></div><div><strong class="big-stat">${e.v2Parity.passed}<small>/${e.v2Parity.total}</small></strong><span class="stat-label">V2 golden profiles matched</span></div></div>
    <p class="verification-caption">${e.unitTestCount} unit + ${e.uiTestCount} UI executions. Parity profiles are checked within unit methods, not added to the execution total.</p>
    <div class="status-line"><span>${esc(e.physicalAcceptanceStatus)}</span><span>${esc(e.featureFreezeStatus)}</span></div>
    <div class="section-end"><p>Software verification establishes exercised behavior and numerical parity. It does not establish real-student prediction accuracy.</p><a class="text-link" href="engineering.html#verification">View scope, findings & evidence <span aria-hidden="true">↗</span></a></div>
  </section>
  <section class="section dark boundary-section" id="responsibility"><div class="wrap two-column"><div><p class="eyebrow">RESPONSIBLE BY DESIGN</p><h2>Local processing.<br>Explicit controls.</h2><p>HealthKit reads are permission-controlled. Saved estimates and chats have separate controls. Export is user-initiated.</p><a class="text-link" href="engineering.html#data-controls">Inspect the data boundaries <span aria-hidden="true">↗</span></a></div><div class="boundary-points"><div><h3>Missing means unavailable.</h3><p>Missing readings are not fabricated as zero. Saved estimates remain historical when fresh inputs are unavailable.</p></div><div><h3>Wellbeing stays separate.</h3><p>Optional RHR trends and Body & Wellbeing information are non-diagnostic. BMI and body data do not become academic Ridge inputs.</p></div><div><h3>Validation is the next question.</h3><p>Frozen V2 needs prospective comparison with a previous-score baseline. Calibrated real-student uncertainty is not yet available.</p><a class="text-link" href="research.html#next-study">The next meaningful study <span aria-hidden="true">↗</span></a></div></div></div></section>
  <section class="section wrap project-context" id="project"><p class="eyebrow blue">A GRADUATION PROJECT, BUILT THROUGH ITERATION</p><div class="two-column"><div><h2>From a native prototype<br>to a testable question.</h2><p>${esc(d.institution)}<br>Grade 12 graduation project.</p><a class="text-link" href="engineering.html#journey">Follow the development journey <span aria-hidden="true">↗</span></a></div><div>${d.showTeam?`<h3>Project team</h3><ul class="team-names">${d.team.map(m=>`<li>${esc(m.name)}${m.role?`<span>${esc(m.role)}</span>`:''}</li>`).join('')}</ul>`:''}<p class="caption">An experimental engineering prototype. Public app distribution and prospective predictive validation are not established.</p></div></div><div class="institution-strip"><span>School project context</span><img src="${d.brand.ats}" width="180" height="131" loading="lazy" decoding="async" alt="Applied Technology Schools"><img src="${d.brand.actvet}" width="210" height="157" loading="lazy" decoding="async" alt="Abu Dhabi Centre for Technical and Vocational Education and Training"></div></section>
  `;
}
