/** Public engineering narrative. Volatile model and verification facts come from project data. */
export default function renderEngineering(d, esc) {
  const m = d.model;
  const e = d.evidence;
  const t = value => esc(String(value));
  const ratio = value => typeof value === 'object' ? `${t(value.passed)}/${t(value.total)}` : `${t(value)}/${t(value)}`;
  const wellbeingExamples = [
    { image: d.screenshots.wellbeingLight, label: 'Light appearance' },
    { image: d.screenshots.wellbeingDark, label: 'Dark appearance' }
  ].map(({ image, label }) => `<figure class="wellbeing-example">
    <img src="${t(image.src)}" srcset="${t(image.small)} 480w, ${t(image.src)} 960w" sizes="(max-width: 600px) 80vw, 260px" width="${t(image.width)}" height="${t(image.height)}" loading="lazy" decoding="async" alt="${t(image.alt)}">
    <figcaption class="caption">${t(label)} · real app screenshot</figcaption>
  </figure>`).join('');
  const milestones = [
    { date: 'Earlier prototype · exact date unconfirmed', title: 'Explore the numerical workflow', body: 'A Windows/Python Ridge prototype and local Qwen3 4B/Ollama conversation explored the workflow. These are historical technologies, not the current mobile stack.' },
    { date: '7 September 2026', title: 'Establish the native foundation', body: 'Three SwiftUI tabs, shared state, persistent manual inputs and frozen V1 Ridge with golden-profile parity established a reproducible native foundation.' },
    { date: '8–9 September 2026', title: 'Connect data and scenarios', body: 'Read-only HealthKit, Home, deterministic What-If and saved estimates brought source context into the app. Refresh and timing corrections made the relationship between an input and its result clearer.' },
    { date: '9–15 September 2026', title: 'Add on-device conversation', body: 'Foundation Models added conversation alongside app-owned numbers, followed by focused reliability and safety work. This historical checkpoint is not current physical acceptance.' },
    { date: '21 September 2026', title: 'Make the V2 contract explicit', body: 'Ridge V2 introduced dated, same-subject assessment eligibility with golden-profile parity, while preserving V1. The model target and source context became explicit.' },
    { date: '21–22 September 2026', title: 'Keep optional wellbeing separate', body: 'An experimental personal RHR trend, refined Manual Inputs and optional age-aware BMI added context without changing the academic model.' },
    { date: '24–30 September · committed 1 October 2026', title: 'Strengthen context and saved records', body: 'Grounded calculation and scenario routing, consent-controlled BMI reads, Trends & History and exact saved-estimate explanations kept a conversation attached to the correct record.' },
    { date: e.displayDate, title: 'Consolidate verification and research', body: `The complete ${e.automatedTestTotal}-execution automated gate passed. A deeper evidence review sharpened the project’s claims; physical acceptance and prospective predictive validation remain distinct open steps.` }
  ];
  const timeline = milestones.map(item => `
    <li>
      <p class="eyebrow">${t(item.date)}</p>
      <h3>${t(item.title)}</h3>
      <p>${t(item.body)}</p>
    </li>`).join('');

  return `
    <section class="section wrap" aria-labelledby="engineering-title">
      <p class="eyebrow">Engineering &amp; evidence</p>
      <h1 id="engineering-title">Clear numbers.<br>Traceable decisions.</h1>
      <p class="lead">A native SwiftUI prototype with a frozen numerical model, explicit data provenance and a separate conversational layer.</p>
      <nav class="jump-links" aria-label="On this engineering page">
        <a class="text-link" href="#architecture">Architecture <span aria-hidden="true">↓</span></a>
        <a class="text-link" href="#verification">Verification <span aria-hidden="true">↓</span></a>
        <a class="text-link" href="#model-contract">Model contract <span aria-hidden="true">↓</span></a>
        <a class="text-link" href="#journey">Development journey <span aria-hidden="true">↓</span></a>
      </nav>
    </section>

    <section class="section wrap" id="architecture" aria-labelledby="architecture-title">
      <div class="section-head" id="data-lifecycle">
        <p class="eyebrow">The data lifecycle</p>
        <h2 id="architecture-title">One state. An explicit calculation. A record of its context.</h2>
        <p class="lead">The estimate belongs to the inputs and assessment that produced it. Refreshing the screen never turns an old result into a new one.</p>
      </div>
      <ol class="flow-list" aria-label="Academic estimate lifecycle">
        <li class="flow-step"><span class="flow-number" aria-hidden="true">01</span><div><h3>Bring the context together</h3><p>Permission-controlled Apple Health reads, manual academic inputs and subject, assessment and date context enter shared TwinTrack state.</p></div></li>
        <li class="flow-step"><span class="flow-number" aria-hidden="true">02</span><div><h3>Check eligibility and freshness</h3><p>Missing or stale inputs prevent an eligible new calculation. Unavailable readings remain unavailable; the app does not silently substitute zero.</p></div></li>
        <li class="flow-step"><span class="flow-number" aria-hidden="true">03</span><div><h3>Construct exactly seven features</h3><p>Four HealthKit values and three manual values form the numerical profile. Assessment dates and subject identity stay attached as context.</p></div></li>
        <li class="flow-step"><span class="flow-number" aria-hidden="true">04</span><div><h3>Run the frozen Ridge model</h3><p>An explicit prediction action, including an authorized chat calculation, uses the shared calculation path. Identical valid inputs and model version give the same numerical result.</p></div></li>
        <li class="flow-step"><span class="flow-number" aria-hidden="true">05</span><div><h3>Save the result with its provenance</h3><p>An immutable result retains its model, assessment and source context. Opening Home, refreshing inputs or viewing history does not generate a new estimate.</p></div></li>
      </ol>
      <p class="caption">Apple Watch and other compatible sources can supply Apple Health. TwinTrack reads supported data through HealthKit; it does not write readings back to Health.</p>

      <div class="section-head">
        <p class="eyebrow">Three distinct paths</p>
        <h2>Ridge owns the numbers.<br>Foundation Models supports the conversation.</h2>
      </div>
      <div class="branch-grid">
        <article class="branch numerical">
          <p class="eyebrow">Deterministic</p>
          <h3>Assessment &amp; What-If</h3>
          <p>Seven eligible numerical inputs → frozen Ridge → app-owned numerical card.</p>
          <p>A captured eligible baseline → temporary What-If changes → the same model → baseline/scenario comparison.</p>
          <p class="note">Scenarios show model sensitivity. They do not overwrite real inputs or normal prediction history, and they do not establish a causal grade gain.</p>
        </article>
        <article class="branch conversation">
          <p class="eyebrow">Generative</p>
          <h3>Conversation &amp; explanation</h3>
          <p>User request and permitted current or historical context → app routing and read-only or calculation tools → app-owned cards and Foundation Models prose.</p>
          <p class="note">Conversation depends on supported, ready devices. Generated prose is not an authoritative score or health measurement.</p>
        </article>
        <article class="branch wellbeing">
          <p class="eyebrow">Optional · separate</p>
          <h3>Wellbeing context</h3>
          <p>RHR history → an experimental personal trend. Local body measurements → app-calculated BMI.</p>
          <p class="note">Neither path changes the academic estimate. Optional chat access uses an authorized, read-only BMI summary. Conversation uses permitted app context rather than a direct feed of raw Health samples, profile photos or date of birth.</p>
        </article>
      </div>
    </section>

    <section class="section dark" id="verification" aria-labelledby="verification-title">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">Recorded software evidence · ${t(e.displayDate)}</p>
          <h2 id="verification-title">Tested behavior.<br>A precise boundary.</h2>
          <p class="lead">The latest complete simulator gate passed. Final physical acceptance and real-student predictive validation remain separate questions.</p>
        </div>
        <div class="verification-strip">
          <div><p class="big-stat">${ratio(e.automatedTestTotal)}</p><p class="stat-label">Simulator executions passed</p><p>${t(e.distinctCaseTotal)} distinct cases</p></div>
          <div><p class="big-stat">${ratio(e.v2Parity)}</p><p class="stat-label">V2 golden profiles matched</p><p>${ratio(e.v1Parity)} legacy V1 profiles preserved</p></div>
          <div><p class="big-stat">${t(e.buildStatus)}</p><p class="stat-label">Build · Analyze ${t(e.analyzeStatus)}</p><p>${t(e.compilerWarnings)} compiler / ${t(e.analyzerWarnings)} analyzer warnings</p></div>
        </div>
        <p class="callout">Software verification establishes exercised implementation behavior and numerical parity. It does not establish real-student prediction accuracy.</p>
        <div class="verification-list">
          <p class="status-line"><strong>Physical acceptance</strong><span>${t(e.physicalAcceptanceStatus)}</span></p>
          <p class="status-line"><strong>Feature / UI freeze</strong><span>${t(e.featureFreezeStatus)}</span></p>
          <p class="status-line"><strong>Real-student predictive validation</strong><span>Not established</span></p>
        </div>
        <details class="detail">
          <summary>Inspect execution counts, numerical precision and remaining findings</summary>
          <div class="prose">
            <h3>Recorded environment and scope</h3>
            <p>${t(e.gateTime)}. ${t(e.environment)}. The recorded results describe the app’s latest complete simulator gate.</p>
            <ul class="fact-list">
              <li><strong>${t(e.unitTestCount)} unit + ${t(e.uiTestCount)} UI executions:</strong> ${t(e.distinctUiMethods)} distinct UI methods; the launch method runs ${t(e.launchConfigurations)} configurations. This explains the difference between execution and case totals.</li>
              <li><strong>Final complete gate:</strong> ${t(e.failures)} failures and ${t(e.skips)} skips. Earlier failing attempts and harness corrections are not erased by the final pass.</li>
              <li><strong>Golden parity:</strong> tolerance ${t(e.parityTolerance)}; maximum absolute error approximately ${t(e.maxAbsoluteError)}. Parity profiles run inside unit-test methods and are already represented in the execution total.</li>
              <li><strong>Explicit build checks:</strong> Build ${t(e.buildStatus)}; Analyze ${t(e.analyzeStatus)}; ${t(e.buildErrors)} build/compiler errors.</li>
            </ul>
            <h3>Runtime findings remain recorded</h3>
            <ul class="fact-list">${e.runtimeFindings.map(finding => `<li>${t(finding)}</li>`).join('')}</ul>
            <p>These findings are separate from compiler/analyzer diagnostics.</p>
            <h3>Selected iPad checks</h3>
            <p><strong>3 November 2026 update:</strong> The project owner reports the app working on iPad and supplied six Light/Dark captures covering Home, TwinTrack AI and Profile. <a href="index.html#ipad">See the iPad experience and school-day use case</a>. This user-reported operation is separate from the earlier automated checks below.</p>
            <p>${t(e.ipad.cases)} selected cases have passing executions on identical source: the initial batch was ${t(e.ipad.initial)}, followed by an unchanged failed-case rerun of ${t(e.ipad.unchangedRerun)}. The first batch was not a pass; this is not a complete iPad suite.</p>
          </div>
        </details>
      </div>
    </section>

    <section class="section wrap" id="model-contract" aria-labelledby="contract-title">
      <div class="section-head">
        <p class="eyebrow">The numerical contract</p>
        <h2 id="contract-title">A reproducible model.<br>A deliberately narrow target.</h2>
        <p class="lead">${t(m.name)} · ${t(m.version)} · standardized Ridge Regression · alpha ${t(m.alpha)}.</p>
      </div>
      <div class="two-column">
        <div class="prose">
          <h3>What the output means</h3>
          <p>The frozen calculation is implemented locally in Swift and was developed using synthetic profiles. Its output is an experimental assessment-score estimate clamped to ${t(m.outputRange)}.</p>
          <p>The bound is not a confidence interval or an accuracy guarantee. No calibrated real-student prediction interval is available.</p>
        </div>
        <div class="prose">
          <h3>Which assessment is eligible</h3>
          <p>The target is the next scheduled, individually graded written quiz, test or exam in the selected subject, ${t(m.targetDays)} local calendar days ahead.</p>
          <p>The previous score must be the most recent comparable same-subject result, ${t(m.previousResultDays)} local calendar days old, normalized to a percentage.</p>
        </div>
      </div>
      <p class="note">These windows are product assumptions, not empirically validated prediction horizons. Subject, assessment identity, dates and comparability are eligibility and provenance metadata, not extra Ridge features.</p>

      <details class="detail">
        <summary>Inspect the seven features and their source windows</summary>
        <div class="prose">
          <p>The fixed feature order is preserved below. Measurements summarize different source periods; they are not a continuous live measurement of readiness.</p>
          <ol class="fact-list">
            <li><strong>Sleep hours</strong> <code>sleep_hours</code><p>HealthKit: combined asleep intervals, including naps, from yesterday’s local noon through the earlier of now and today’s local noon.</p></li>
            <li><strong>Steps</strong> <code>steps</code><p>HealthKit: the previous completed local calendar day.</p></li>
            <li><strong>Exercise minutes</strong> <code>exercise_minutes</code><p>HealthKit Apple Exercise Time: the previous completed local calendar day.</p></li>
            <li><strong>Resting heart rate</strong> <code>resting_heart_rate</code><p>HealthKit: latest valid positive sample within the previous ${t(m.rhrHours)} elapsed hours, retaining its timestamp.</p></li>
            <li><strong>Study minutes</strong> <code>study_minutes</code><p>Manual: selected-subject study outside class during the previous local day. Educational screen use belongs here.</p></li>
            <li><strong>Recreational screen time</strong> <code>screen_time_minutes</code><p>Manual: recreational screen use during the previous local day. Dated study and screen reports may require reconfirmation.</p></li>
            <li><strong>Previous score</strong> <code>previous_score</code><p>Manual: the comparable same-subject assessment percentage within the eligible prior-result window.</p></li>
          </ol>
          <p>BMI, date of birth, growth reference and the RHR wellbeing trend are not academic features. Scientific support also differs across the seven inputs.</p>
          <a class="text-link" href="research.html#input-evidence">Read the input evidence <span aria-hidden="true">↗</span></a>
        </div>
      </details>
      <details class="detail" id="data-controls">
        <summary>Inspect saved-result, chat and privacy controls</summary>
        <div class="prose">
          <h3>Results retain their identity</h3>
          <p>Saved estimates keep the model, assessment and source identity that produced them. Opening an old record or explaining it does not recalculate it as current. Recorded trends preserve gaps where dates are missing.</p>
          <h3>Conversation has explicit controls</h3>
          <p>Conversations can be renamed or deleted. Editing a user message removes later turns before regeneration. Cancellation and chat-switch guards prevent late output from entering another conversation; live conversational quality still needs physical acceptance.</p>
          <h3>Local processing and deliberate sharing</h3>
          <p>Academic calculations, model sessions and app-owned stores are local. The architecture has no app account or backend. HealthKit reads are permission-controlled, and saved estimates and chats have separate controls. Export is user-initiated and lets the user choose a destination.</p>
          <p>Optional BMI chat access is read-only and off by default. Relevant requests use fresh authorized summaries. Revocation affects future reads, not cards already saved or exports already shared.</p>
        </div>
      </details>
      <details class="detail">
        <summary>Inspect the optional wellbeing boundary</summary>
        <div class="prose">
          <p>The experimental RHR trend compares recent readings with a personal baseline using development thresholds. It does not diagnose illness or create emergency alerts from RHR alone.</p>
          <p>Body &amp; Wellbeing calculates BMI locally. With complete age and reference information, ages 2–19 use CDC BMI-for-age interpretation; ages 20 and over use adult categories. Missing reference information leaves interpretation unavailable.</p>
          <p>This is optional, non-diagnostic context. The U.S. reference does not establish UAE-specific or clinical validation, and wellbeing information never changes Ridge output.</p>
          <p class="caption">Real Light and Dark app views with approved fictional demo information. These optional BMI examples are separate from academic Ridge prediction.</p>
          <div class="wellbeing-pair">${wellbeingExamples}</div>
        </div>
      </details>
    </section>

    <section class="section wrap" id="journey" aria-labelledby="journey-title">
      <div class="section-head">
        <p class="eyebrow">Development journey</p>
        <h2 id="journey-title">More context.<br>More precise claims.</h2>
        <p class="lead">The project evolved from a local prototype into a native app, then strengthened the boundaries around its numbers, saved records and evidence.</p>
      </div>
      <ol class="timeline">${timeline}
      </ol>
      <p class="caption">Dates identify documented project milestones, not necessarily the first day work began. A historical freeze label does not establish current physical acceptance.</p>
      <div class="callout">
        <h3>Engineering reliability is one part of the question.</h3>
        <p>The next scientific step is frozen V2 against a previous-score baseline on real upcoming same-subject assessments.</p>
        <a class="text-link" href="research.html">Explore the research and validation plan <span aria-hidden="true">↗</span></a>
      </div>
    </section>`;
}
