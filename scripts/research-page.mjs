export default function renderResearch(d, esc) {
  const research = d.research;
  const fixed = value => Number(value).toFixed(5);
  const signed = value => `${Number(value) < 0 ? '−' : '+'}${fixed(Math.abs(Number(value)))}`;
  const folds = esc(research.validationFolds);
  const scale = esc(research.outcomeScale);
  const model = `${esc(d.model.name)} · ${esc(d.model.version)}`;

  const inputs = [
    ['Previous score', 'Strong support', 'Prior attainment is the strongest basis here for later attainment level. A comparable result gives useful context; it does not set a ceiling on a student’s potential. Long-term attainment stability does not validate TwinTrack’s exact previous-result window.', 'prior-attainment', 'Rimfeld et al., 2018'],
    ['Study minutes', 'Mixed / inconsistent', 'Time does not capture learning quality, strategy or task completion. Homework research finds benefits in some settings, but evidence for an optimal duration is limited, especially in secondary school. More minutes cannot be translated into a promised grade gain.', 'homework', 'Guo et al., 2024'],
    ['Sleep duration', 'Mixed / inconsistent', 'Duration is different from sleep quality, regularity and timing. A review of US adolescent studies found a small, nonsignificant pooled duration association. Sleep can matter for wellbeing without making one night’s duration a dependable assessment predictor.', 'sleep', 'Musshafen et al., 2021'],
    ['Recreational screen time', 'Mixed / inconsistent', 'Purpose and activity matter. Television and gaming showed negative associations in a cross-sectional review; overall screen use did not. These associations do not establish a causal dose. TwinTrack records educational screen use as study, separately from recreation.', 'screens', 'Adelantado-Renau et al., 2019'],
    ['Apple Exercise Time', 'Weak direct support', 'Physical-activity programmes and fitness measures are different from the Apple Exercise Time field. A review of childhood interventions found some cognitive benefits, but no overall academic benefit. It does not validate this wearable field or its Ridge coefficient.', 'activity', 'Vasilopoulos et al., 2023'],
    ['Steps', 'Weak direct support', 'Steps are an exploratory measure of movement volume. In a prospective adolescent cohort, the main steps analysis found no academic association one year later; an exploratory category comparison was positive. Findings do not establish a reliable steps-to-score relationship.', 'steps', 'Li et al., 2026'],
    ['Resting heart rate', 'Insufficient direct evidence', 'Direct academic studies exist, but consistent added predictive value remains unestablished. A secondary-school cross-sectional study found no significant resting-heart-rate difference between achievement groups. The separate RHR wellbeing trend does not change the academic estimate.', 'rhr', 'Canli et al., 2024']
  ];

  const inputRows = inputs.map(([title, rating, body, ref, citation]) => `
    <details class="evidence-row">
      <summary><span class="row-title">${title}</span><span class="rating">${rating}</span></summary>
      <div class="row-body"><p>${body}</p><a class="text-link" href="#ref-${ref}">${citation} <span aria-hidden="true">↗</span></a></div>
    </details>`).join('');

  const metrics = [
    ['mae', 'Mean absolute error', 'Lower is better', 'Error increased'],
    ['rmse', 'Root mean squared error', 'Lower is better', 'Error increased'],
    ['r2', 'R²', 'Higher is better', 'Fit decreased']
  ].map(([key, label, direction, result]) => `
    <article class="metric-pair">
      <h3>${label}</h3>
      <p class="caption">${key === 'r2' ? 'Unitless' : 'Grade points'} · ${direction}</p>
      <dl>
        <div><dt>Prior-performance baseline</dt><dd class="metric-value">≈ ${fixed(research.prior[key])}</dd></div>
        <div><dt>Change with wearables</dt><dd class="metric-value">${signed(research.delta[key])}</dd></div>
      </dl>
      <p class="caption">${result} when available wearable measures were added.</p>
    </article>`).join('');

  return `
    <section class="page-hero wrap">
      <p class="eyebrow">Research &amp; evidence</p>
      <h1>Evidence that changed the question.</h1>
      <p class="lead">A working prototype can make its calculations correctly while its real-world usefulness remains an open question. TwinTrack’s research keeps those claims separate.</p>
      <nav class="jump-links" aria-label="Research sections">
        <a href="#input-evidence">The seven inputs</a>
        <a href="#nethealth">NetHealth findings</a>
        <a href="#next-study">The next study</a>
        <a href="#references">References</a>
      </nav>
    </section>

    <section class="section wrap" aria-labelledby="changed-thinking">
      <div class="two-column">
        <div class="section-head"><p class="eyebrow">What changed</p><h2 id="changed-thinking">A more precise research question.</h2></div>
        <div class="prose"><p>Wearable signals seemed worth investigating alongside academic history. In the completed NetHealth comparison, they did not add convincing predictive value beyond prior performance. The wider review also found unequal support across the seven inputs.</p><p>That evidence shaped TwinTrack’s framing as an experimental student reflection prototype. The next question is whether its frozen model adds useful information beyond a previous-score baseline on real upcoming assessments.</p></div>
      </div>
    </section>

    <section class="section wrap" id="input-evidence" aria-labelledby="input-evidence-title">
      <div class="section-head"><p class="eyebrow">The seven inputs</p><h2 id="input-evidence-title">Different signals. Different evidence.</h2><p>Each row opens the reasoning behind the project’s critical-review rating.</p></div>
      ${inputRows.trimStart()}
      <p class="note">These are review judgments, not medical ratings or evidence-certification badges. None establishes TwinTrack’s fitted coefficients or exact source windows.</p>
    </section>

    <section class="section dark" id="nethealth" aria-labelledby="nethealth-title">
      <div class="wrap">
        <div class="section-head"><p class="eyebrow">The completed comparison</p><h2 id="nethealth-title">Wearables did not add convincing predictive value.</h2><p class="lead">NetHealth is TwinTrack’s only completed participant-level real-data comparison. Its result makes the next validation question sharper.</p></div>
        <div class="comparison-panel">
          <p><strong>${esc(research.students)} students · ${esc(research.observations)} repeated student-semester observations</strong></p>
          <p>A US undergraduate cohort. The outcome was a term’s unweighted mean course grade (<strong>${scale}</strong>).</p>
          <div>${metrics}</div>
          <p class="caption">Reported means across ${folds} validation folds. Positive error changes mean worse prediction; the negative R² change also favors the prior-performance baseline.</p>
        </div>
        <details class="detail">
          <summary>What this comparison can and cannot tell us</summary>
          <div class="prose">
            <p>The available wearable block included sleep, steps, activity and average daily heart rate. Average daily heart rate is different from TwinTrack’s resting heart rate. Study minutes and recreational screen time were absent.</p>
            <p>The population, outcome and measurement windows differ from TwinTrack’s intended school-assessment setting. The ${esc(research.observations)} observations are repeated records from ${esc(research.students)} students, not independent participants.</p>
            <p>Separately pooled estimates also showed no convincing improvement. They are a different estimator; their intervals should not be combined with these fold means.</p>
            <p>This analysis does not validate deployed ${model}. Nor does it show that healthy behaviors have no value. It addresses whether the available wearable measures improved prediction beyond prior performance in this cohort and design.</p>
          </div>
        </details>
      </div>
    </section>

    <section class="section wrap" aria-labelledby="study-status-title">
      <div class="two-column">
        <div class="section-head"><p class="eyebrow">Beyond NetHealth</p><h2 id="study-status-title">Preparation is a different milestone from a completed study.</h2></div>
        <div>
          <details class="detail"><summary>HSLS:09 — protocol prepared</summary><p>Access and variable auditing and an analysis protocol were prepared. A TwinTrack participant-level comparison has not been completed.</p></details>
          <details class="detail"><summary>MCS — planning and historical research</summary><p>No completed TwinTrack participant analysis is established.</p></details>
          <details class="detail"><summary>COMPASS — researched candidate</summary><p>No TwinTrack participant analysis has been completed. Published external COMPASS research is not TwinTrack’s own analysis.</p></details>
        </div>
      </div>
    </section>

    <section class="section wrap" id="next-study" aria-labelledby="next-study-title">
      <div class="section-head"><p class="eyebrow">Proposed future work</p><h2 id="next-study-title">Test the frozen model against a strong baseline.</h2><p class="lead">A prospective comparison should evaluate ${model} and a previous-score baseline on real upcoming, comparable same-subject assessments.</p></div>
      <ol class="validation-steps">
        <li><h3>Measure error and calibration.</h3><p>Compare assessment estimates with observed outcomes. Report error and whether estimates systematically run too high or too low, alongside uncertainty in the study’s results.</p></li>
        <li><h3>Measure coverage and abstention.</h3><p>Record who receives an eligible estimate, who does not, and why. Missing or stale inputs and device availability may affect participation and usefulness.</p></li>
        <li><h3>Evaluate predictive uncertainty.</h3><p>If prediction intervals are developed, test their calibration and empirical coverage. No calibrated real-student prediction interval is available for the current model.</p></li>
        <li><h3>Test understanding and trust.</h3><p>A separate user study should examine usefulness, appropriate trust and whether students understand the difference between a model scenario and a promised outcome.</p></li>
      </ol>
      <p class="note">This is a proposed study, not an executed comparison or an externally preregistered protocol.</p>
      <details class="detail"><summary>Current model limitations</summary><div class="prose"><p>${model} was developed with synthetic profiles. Prospective accuracy in its intended student population remains unverified. The inputs are imperfect measurements with unequal evidence.</p><p>Eligibility and source windows are product assumptions, not validated prediction horizons. What-If comparisons show model sensitivity; they do not establish causal effects or an optimal habit. Bounding the output to ${esc(d.model.outputRange)} does not provide a confidence interval.</p></div></details>
    </section>

    <section class="section wrap" id="references" aria-labelledby="references-title">
      <div class="section-head"><p class="eyebrow">Read the sources</p><h2 id="references-title">The evidence behind the review.</h2><p>External research provides context. None of these publications evaluates or validates the TwinTrack app.</p></div>
      <ol class="reference-list">
        <li id="ref-prior-attainment"><a href="https://www.nature.com/articles/s41539-018-0030-0">Rimfeld et al. · 2018 — Stability of educational achievement <span aria-hidden="true">↗</span></a><p class="caption">UK longitudinal twin research; attainment stability is not a limit on individual potential.</p></li>
        <li id="ref-homework"><a href="https://journals.sagepub.com/doi/10.1002/cl2.1431">Guo et al. · 2024 — Homework duration and academic performance <span aria-hidden="true">↗</span></a><p class="caption">Systematic review; evidence for an optimal duration remains limited, particularly in secondary school.</p></li>
        <li id="ref-sleep"><a href="https://www.sciencedirect.com/science/article/abs/pii/S1389945721002318">Musshafen et al. · 2021 — Sleep and US adolescent academic performance <span aria-hidden="true">↗</span></a><p class="caption">Systematic review and meta-analysis; duration and quality have different associations.</p></li>
        <li id="ref-screens"><a href="https://jamanetwork.com/journals/jamapediatrics/fullarticle/2751330">Adelantado-Renau et al. · 2019 — Screen activities and academic outcomes <span aria-hidden="true">↗</span></a><p class="caption">Cross-sectional evidence; overall screen use, television and gaming are not interchangeable measures.</p></li>
        <li id="ref-activity"><a href="https://link.springer.com/article/10.1007/s10648-023-09760-2">Vasilopoulos et al. · 2023 — Physical activity interventions in childhood <span aria-hidden="true">↗</span></a><p class="caption">Intervention evidence in younger children does not directly validate Apple Exercise Time.</p></li>
        <li id="ref-steps"><a href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2854698">Li et al. · 2026 — Adolescent steps, brain structure and outcomes <span aria-hidden="true">↗</span></a><p class="caption">Published 1 October 2026. The main prospective academic association was null; an exploratory category contrast was positive.</p></li>
        <li id="ref-rhr"><a href="https://www.mdpi.com/2227-9067/11/4/396">Canli et al. · 2024 — Physiological measures and school achievement <span aria-hidden="true">↗</span></a><p class="caption">Cross-sectional secondary-school study; RHR did not significantly differ between achievement groups.</p></li>
        <li id="ref-digital-twin"><a href="https://www.nationalacademies.org/read/26894/chapter/2">National Academies · 2024 — Foundations and research gaps for digital twins <span aria-hidden="true">↗</span></a><p class="caption">Defines dynamic representation and feedback, with continuing verification, validation and uncertainty assessment. TwinTrack uses the qualified description “digital-twin-inspired.”</p></li>
      </ol>
    </section>`;
}
