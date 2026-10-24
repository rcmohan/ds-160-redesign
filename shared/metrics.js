/* Lightweight study metrics. Stores only counts, timings and task outcomes in localStorage.
   Never records answers, keystrokes or identifying information. Participants copy a summary into the survey. */
const Metrics = (() => {
  const CORRECT_PASSPORT = "G4821935";      // value participants are told to enter for task 2
  const IDLE_CAP_MS = 30000;                // time between interactions beyond this is treated as idle
  const NAMES = { option1: "wizard", option2: "outline", option3: "hub" };
  let key = null, m = null, last = Date.now();

  const load = k => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
  const persist = () => { try { localStorage.setItem(key, JSON.stringify(m)); } catch (e) {} };

  function init(design) {
    key = "ds160-metrics-" + design;
    m = load(key) || { design: NAMES[design] || design, pageLoads: 0, ms: 0, nav: 0, validation: 0, tasks: {}, returned: false, viewedPrev: false };
    m.pageLoads++;
    if (m.pageLoads > 1) m.returned = true;     // reopening the page counts as returning after an interruption
    last = Date.now();
    persist();
    ["click", "keydown", "input", "change"].forEach(ev => document.addEventListener(ev, activity, true));
    mountFooter();
  }
  function activity() {
    const t = Date.now();
    m.ms += Math.min(t - last, IDLE_CAP_MS); last = t;
    persist();
    setTimeout(check, 60);
  }
  const nav = () => { if (m) { m.nav++; persist(); } };
  const validation = () => { if (m) { m.validation++; persist(); } };
  const returned = () => { if (m) { m.returned = true; persist(); } };
  function complete(id) {
    if (m.tasks[id]) return;
    m.tasks[id] = { seconds: Math.round(m.ms / 1000), nav: m.nav };
    persist();
  }
  /* Task 1: viewed Previous U.S. Travel, then moved to another section with the arrival date still blank. */
  function view(sectionId) {
    if (!m) return;
    if (sectionId === "previous") m.viewedPrev = true;
    else if (m.viewedPrev && !App.answered(App.findField("prev_arrival").field)) complete("T1");
    persist();
  }
  /* Tasks 2 and 3 are detected from state. */
  function check() {
    if (!m) return;
    const pn = String(App.answers.pnum || "").replace(/\s/g, "").toUpperCase();
    if (pn === CORRECT_PASSPORT) complete("T2");
    if (m.returned && App.pendingAll().length === 0) complete("T3");
  }
  const summary = k => {
    const s = k === key ? m : load(k);
    if (!s) return null;
    const t = s.tasks || {};
    return { completionSeconds: Math.round(s.ms / 1000), navigationActions: s.nav, validationErrors: s.validation, pageLoads: s.pageLoads,
             tasksCompleted: Object.keys(t).length, tasks: t };
  };
  function combined() {
    let order = null; try { order = JSON.parse(localStorage.getItem("ds160-order") || "null"); } catch (e) {}
    const out = { order: order ? order.map(n => NAMES["option" + n]) : null };
    Object.keys(NAMES).forEach(d => { const s = summary("ds160-metrics-" + d); out[NAMES[d]] = s; });
    return out;
  }

  /* ---- summary dialog ---- */
  function el(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const k in (attrs || {})) k.startsWith("on") ? e.addEventListener(k.slice(2), attrs[k]) : e.setAttribute(k, attrs[k]);
    kids.forEach(x => e.append(x)); return e;
  }
  function showSummary(data, title) {
    const text = JSON.stringify(data);
    const ta = el("textarea", { readonly: "", rows: "8", style: "width:100%;font:12px monospace;margin-top:8px", "aria-label": "Results summary" });
    ta.value = text;
    const msg = el("span", { role: "status", style: "margin-left:10px;color:#2e7d32;font-weight:700" });
    const scrim = el("div", { class: "scrim" }, el("div", { class: "modal" },
      el("h3", {}, title),
      el("p", {}, "This summary contains only timing, click counts and task outcomes. It contains none of the answers entered. Copy it and paste it into the survey."),
      ta,
      el("div", { class: "btnbar" },
        el("button", { class: "rbtn c", onclick: () => { ta.select(); (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => msg.textContent = "Copied.", () => { document.execCommand && document.execCommand("copy"); msg.textContent = "Selected - press Ctrl+C to copy."; }); } }, "Copy results"),
        el("button", { class: "rbtn c", onclick: () => scrim.remove() }, "Close")),
      msg));
    document.body.append(scrim); ta.focus(); ta.select();
  }
  function mountFooter() {
    const f = document.querySelector("#footer .footer"); if (!f) return;
    f.append(document.createTextNode("   "), el("button", { class: "link", onclick: () => { check(); showSummary(Object.assign({ design: m.design }, summary(key)), "Finish this design"); } }, "Finish and copy my results"));
  }
  return { init, nav, view, validation, returned, check, combined, showSummary, summary };
})();
