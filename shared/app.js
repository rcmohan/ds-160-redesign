/* Shared data + helpers. All three designs render from SECTIONS and App.answers. */
const YN = [["Yes", "Yes"], ["No", "No"]];
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const COUNTRIES = ["", "CANADA", "INDIA", "MEXICO", "UNITED KINGDOM", "UNITED STATES", "OTHER"];

const SECTIONS = [
  { id: "personal", title: "Personal Information", short: "Personal", note: "Data on this page must match the information as it is written in the passport.",
    fields: [
      { id: "surname", type: "text", label: "Surnames", eg: "e.g., FERNANDEZ GARCIA", required: true, help: ["Surnames", "Enter all surnames as listed in the passport. If only one name is listed, enter that Surname."] },
      { id: "given", type: "text", label: "Given Names", eg: "e.g., JUAN MIGUEL", required: true, help: ["Given Names", "If the passport does not include a given name, please enter 'FNU' in Given Names."] },
      { id: "native", type: "text", label: "Full Name in Native Alphabet", dna: "Does Not Apply/Technology Not Available", required: true },
      { id: "othernames", type: "yesno", label: "Have you ever used other names (i.e., maiden, religious, professional, alias, etc.)?", required: true, help: ["Other Names", "Other names used include maiden name, religious name, professional name, or any other names by which the applicant is or has been known."] },
      { id: "othernames_txt", type: "text", label: "Other name used", required: true, showIf: ["othernames", "Yes"] },
      { id: "sex", type: "select", label: "Sex", options: ["", "MALE", "FEMALE"], required: true, help: ["Sex", "Please select MALE or FEMALE."] },
      { id: "marital", type: "select", label: "Marital Status", options: ["", "SINGLE", "MARRIED", "DIVORCED", "WIDOWED"], required: true },
      { id: "dob", type: "date", label: "Date of Birth", group: "Date and Place of Birth", required: true, help: ["Date of Birth", "If day or month is unknown, enter as shown in passport."] },
      { id: "pob_city", type: "text", label: "City of Birth", required: true },
      { id: "pob_country", type: "select", label: "Country/Region of Birth", options: COUNTRIES, required: true, help: ["Country/Region", "Select the name that is currently in use for the place where the applicant was born."] },
      { id: "nat", type: "select", label: "Country/Region of Origin (Nationality)", group: "Nationality", options: COUNTRIES, required: true },
      { id: "othernat", type: "yesno", label: "Do you hold or have you held any nationality other than the one indicated above?", required: true },
      { id: "natid", type: "text", label: "National Identification Number", dna: "Does Not Apply", required: true, help: ["Identification Numbers", "A National ID Number is a unique number that a government provides."] },
    ] },
  { id: "travel", title: "Travel Information", short: "Travel", note: "Provide the following information concerning the travel plans.",
    fields: [
      { id: "purpose", type: "select", label: "Purpose of Trip to the U.S.", options: ["", "TEMP. BUSINESS OR PLEASURE VISITOR (B)", "STUDENT (F)", "TEMPORARY WORKER (H)"], required: true },
      { id: "plans", type: "yesno", label: "Have you made specific travel plans?", required: true },
      { id: "arrival", type: "date", label: "Intended Date of Arrival", required: true, help: ["Arrival Plans", "If you are unsure of your travel plans, please provide an estimate."] },
      { id: "stay", type: "text", label: "Intended Length of Stay in U.S.", required: true, eg: "e.g., 2 WEEKS" },
      { id: "us_street", type: "text", label: "Street Address (Line 1)", group: "Address Where You Will Stay in the U.S.", required: true },
      { id: "us_street2", type: "text", label: "Street Address (Line 2)", optional: true },
      { id: "us_city", type: "text", label: "City", required: true },
      { id: "us_zip", type: "text", label: "ZIP Code (if known)", eg: "e.g., 12345 or 12345-1234", optional: true },
      { id: "payer", type: "select", label: "Person/Entity Paying for Your Trip", options: ["", "SELF", "OTHER PERSON", "EMPLOYER", "ORGANIZATION"], required: true },
    ] },
  { id: "companions", title: "Travel Companions", short: "Travel Companions", note: "Provide the following travel companion information.",
    fields: [
      { id: "withothers", type: "yesno", label: "Are there other persons traveling with you?", required: true, help: ["Traveling with Others", "Answer Yes if traveling with family, as part of an organized tour, or as part of a performing group or athletic team."] },
      { id: "group", type: "yesno", label: "Are you traveling as part of a group or organization?", required: true, showIf: ["withothers", "Yes"] },
      { id: "groupname", type: "text", label: "Group Name", required: true, showIf: ["group", "Yes"] },
    ] },
  { id: "previous", title: "Previous U.S. Travel", short: "Previous U.S. Travel", note: "Provide complete and accurate information to all questions that require an explanation.",
    fields: [
      { id: "been", type: "yesno", label: "Have you ever been in the U.S.?", required: true },
      { id: "prev_arrival", type: "date", label: "Date of most recent arrival in the U.S.", required: true, showIf: ["been", "Yes"], kw: "previous arrival date" },
      { id: "visa", type: "yesno", label: "Have you ever been issued a U.S. Visa?", required: true },
      { id: "refused", type: "yesno", label: "Have you ever been refused a U.S. Visa, or been refused admission to the United States, or withdrawn your application for admission at the port of entry?", required: true },
      { id: "refused_txt", type: "text", label: "Explain", required: true, showIf: ["refused", "Yes"] },
      { id: "petition", type: "yesno", label: "Has anyone ever filed an immigrant petition on your behalf with the United States Citizenship and Immigration Services?", required: true },
    ] },
  { id: "address", title: "Address and Phone Information", short: "Address and Phone", note: "",
    fields: [
      { id: "h_street", type: "text", label: "Street Address (Line 1)", group: "Home Address", required: true, kw: "previous address" },
      { id: "h_city", type: "text", label: "City", required: true },
      { id: "h_country", type: "select", label: "Country/Region", options: COUNTRIES, required: true },
      { id: "mail_same", type: "yesno", label: "Is your Mailing Address the same as your Home Address?", group: "Mailing Address", required: true },
      { id: "phone", type: "text", label: "Primary Phone Number", group: "Phone", required: true, help: ["Phone", "You must provide a primary phone number at which you are most likely to be reached."] },
      { id: "email", type: "text", label: "Email Address", group: "Email Address", eg: "e.g., emailaddress@example.com", required: true, help: ["Email Address", "The email address you provide will be used for correspondence purposes."] },
      { id: "social", type: "yesno", label: "Do you have a social media presence?", group: "Social Media", required: true },
    ] },
  { id: "passport", title: "Passport Information", short: "Passport", note: "Provide the following passport information.",
    fields: [
      { id: "ptype", type: "select", label: "Passport/Travel Document Type", options: ["", "REGULAR", "OFFICIAL", "DIPLOMATIC", "OTHER"], required: true },
      { id: "pnum", type: "text", label: "Passport/Travel Document Number", required: true, help: ["Passport Number", "Enter the number exactly as it appears in the passport."] },
      { id: "pcountry", type: "select", label: "Country/Authority that Issued Passport/Travel Document", options: COUNTRIES, required: true },
      { id: "pcity", type: "text", label: "City where Issued", required: true },
      { id: "pissue", type: "date", label: "Issuance Date", required: true },
      { id: "pexpiry", type: "date", label: "Expiration Date", required: true },
      { id: "plost", type: "yesno", label: "Have you ever lost a passport or had one stolen?", required: true },
    ] },
];

/* Fictional applicant: partially complete, one wrong passport number, no previous arrival date. */
const SEED = {
  surname: "SANTOS ORTEGA", given: "MARIA ELENA", "native.dna": true, othernames: "No", sex: "FEMALE", marital: "MARRIED",
  "dob.d": "14", "dob.m": "MAR", "dob.y": "1978", pob_city: "MONTERREY", pob_country: "MEXICO", nat: "MEXICO", othernat: "No", natid: "SAOM780314MNLRRL09",
  purpose: "TEMP. BUSINESS OR PLEASURE VISITOR (B)", plans: "Yes", "arrival.d": "12", "arrival.m": "DEC", "arrival.y": "2026",
  us_street: "412 Maple Avenue",
  withothers: "No",
  been: "Yes", visa: "No", refused: "No", petition: "No",
  h_street: "Calle Hidalgo 220", h_city: "MONTERREY", h_country: "MEXICO",
  ptype: "REGULAR", pnum: "G4821953", pcountry: "MEXICO", pcity: "MONTERREY",
  "pissue.d": "05", "pissue.m": "JUN", "pissue.y": "2021", "pexpiry.d": "04", "pexpiry.m": "JUN", "pexpiry.y": "2031", plost: "No",
};

const App = (() => {
  const answers = {};
  const meta = {};
  let KEY = "ds160-x";
  const state = { showMissing: false, onInput: () => {}, onChange: () => {} };
  const indicators = [];

  const now = () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  function persist() { try { localStorage.setItem(KEY, JSON.stringify({ answers, meta })); } catch (e) {} }

  /* Each design has its own storage key so one evaluation never changes another's start state. */
  function init(design) {
    KEY = "ds160-" + design;
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
    Object.keys(answers).forEach(k => delete answers[k]);
    Object.keys(meta).forEach(k => delete meta[k]);
    Object.assign(answers, s ? s.answers : JSON.parse(JSON.stringify(SEED)));
    Object.assign(meta, s ? s.meta : { savedAt: null });
    if (!answers._later) answers._later = {};
    return !!s;
  }
  function reset() { try { localStorage.removeItem(KEY); localStorage.removeItem(KEY.replace("ds160-", "ds160-metrics-")); } catch (e) {} location.reload(); }

  /* Simulated autosave: "Saving..." then "Saved". */
  let st;
  function save() {
    indicators.forEach(i => i.update("saving"));
    clearTimeout(st);
    st = setTimeout(() => { meta.savedAt = now(); persist(); indicators.forEach(i => i.update("saved")); }, 600);
  }
  function saveIndicator() {
    const el = document.createElement("span");
    el.className = "saveind";
    el.setAttribute("aria-live", "polite");
    const draw = mode => { el.textContent = mode === "saving" ? "Saving..." : mode === "flash" ? "Saved." : "All changes saved" + (meta.savedAt ? " — " + meta.savedAt : ""); el.dataset.mode = mode; };
    let t;
    el.update = mode => {
      if (mode === "saved") { draw("flash"); clearTimeout(t); t = setTimeout(() => draw("idle"), 1200); } else draw(mode);
    };
    draw("idle");
    indicators.push(el);
    return el;
  }
  const visible = f => !f.showIf || answers[f.showIf[0]] === f.showIf[1];
  function answered(f) {
    if (answers[f.id + ".dna"]) return true;
    if (f.type === "date") return !!(answers[f.id + ".d"] && answers[f.id + ".m"] && answers[f.id + ".y"]);
    return !!(answers[f.id] && String(answers[f.id]).trim());
  }
  const needed = f => f.required && visible(f);
  const touched = f => answered(f) || (f.type === "date" && (answers[f.id + ".d"] || answers[f.id + ".m"] || answers[f.id + ".y"]));
  function stats(s) {
    const req = s.fields.filter(needed);
    const missing = req.filter(f => !answered(f));
    const any = s.fields.some(f => visible(f) && touched(f));
    const later = missing.filter(f => answers._later[f.id] && !answers._later[f.id].resolved).length;
    return { total: req.length, done: req.length - missing.length, missing, later, status: missing.length === 0 ? "done" : any ? "part" : "todo" };
  }
  const label = { done: "Complete", part: "Incomplete", todo: "Not Started" };
  function overall() {
    let t = 0, d = 0;
    SECTIONS.forEach(s => { const x = stats(s); t += x.total; d += x.done; });
    return { total: t, done: d, pct: t ? Math.round(100 * d / t) : 0 };
  }
  const pendingAll = () => SECTIONS.flatMap(s => stats(s).missing.map(f => ({ section: s, field: f })));
  const findField = id => { for (const s of SECTIONS) for (const f of s.fields) if (f.id === id) return { section: s, field: f }; return null; };

  function answerText(f) {
    if (answers[f.id + ".dna"]) return "Does Not Apply";
    if (f.type === "date") return [answers[f.id + ".d"], answers[f.id + ".m"], answers[f.id + ".y"]].filter(Boolean).join("-");
    return answers[f.id] || "";
  }
  /* Search: any-token match over label, help, section, group, keywords and the current answer. */
  function search(q) {
    const toks = q.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    if (!toks.length) return [];
    const out = [];
    SECTIONS.forEach(s => s.fields.filter(visible).forEach(f => {
      const primary = (f.label + " " + (f.kw || "") + " " + answerText(f)).toLowerCase();
      const secondary = (s.title + " " + (f.group || "") + " " + (f.help ? f.help.join(" ") : "")).toLowerCase();
      let score = 0;
      toks.forEach(t => { if (primary.includes(t)) score += 2; else if (secondary.includes(t)) score += 1; });
      if (score) out.push({ section: s, field: f, score });
    }));
    return out.sort((a, b) => b.score - a.score);
  }

  /* ---- DOM helper ---- */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const k in (attrs || {})) {
      if (k === "class") el.className = attrs[k];
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) el.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    }
    kids.flat().forEach(k => k != null && el.append(k.nodeType ? k : document.createTextNode(k)));
    return el;
  }
  function set(key, v, structural) {
    answers[key] = v; save();
    structural ? state.onChange() : state.onInput();
  }

  function control(f) {
    const id = "f_" + f.id;
    if (f.type === "yesno") {
      return h("div", {},
        h("div", { class: "q" }, h("b", {}, "Q:"), f.label),
        h("div", { class: "a", role: "radiogroup", "aria-label": f.label }, h("b", {}, "A:"),
          YN.map(([v, t]) => h("label", {}, h("input", { type: "radio", name: id, value: v, checked: answers[f.id] === v, onchange: () => set(f.id, v, true) }), " " + t))));
    }
    if (f.type === "select") {
      return h("div", {}, h("label", { class: "lbl", for: id }, f.label),
        h("select", { id, onchange: e => set(f.id, e.target.value) },
          f.options.map(o => h("option", { value: o, selected: answers[f.id] === o }, o || "- SELECT ONE -"))));
    }
    if (f.type === "date") {
      return h("div", {}, h("label", { class: "lbl" }, f.label),
        h("div", { class: "inline" },
          h("select", { "aria-label": "Day", style: "width:70px", onchange: e => set(f.id + ".d", e.target.value) },
            ["", ...Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))].map(o => h("option", { selected: answers[f.id + ".d"] === o }, o))),
          h("select", { "aria-label": "Month", style: "width:80px", onchange: e => set(f.id + ".m", e.target.value) },
            ["", ...MONTHS].map(o => h("option", { selected: answers[f.id + ".m"] === o }, o))),
          h("input", { type: "text", class: "num", "aria-label": "Year", placeholder: "YYYY", maxlength: 4, value: answers[f.id + ".y"] || "", oninput: e => set(f.id + ".y", e.target.value) })),
        h("div", { class: "eg" }, "(Format: DD-MMM-YYYY)"));
    }
    const dis = !!answers[f.id + ".dna"];
    return h("div", {}, h("label", { class: "lbl", for: id }, f.label, f.optional ? h("span", { class: "opt" }, " *Optional") : null),
      h("input", { type: "text", id, value: answers[f.id] || "", disabled: dis, oninput: e => set(f.id, e.target.value) }),
      f.eg ? h("div", { class: "eg" }, "(" + f.eg + ")") : null,
      f.dna ? h("label", { class: "dna" }, h("input", { type: "checkbox", checked: dis, onchange: e => set(f.id + ".dna", e.target.checked, true) }), " " + f.dna) : null);
  }

  /* Render visible fields of a section into `box`.
     opts.extra(f) -> element appended under a field; opts.hit -> Set of field ids to highlight. */
  function renderSection(box, s, opts = {}) {
    box.innerHTML = "";
    let lastGroup = null;
    s.fields.filter(visible).forEach(f => {
      if (f.group && f.group !== lastGroup) box.append(h("div", { class: "group-h" }, f.group));
      if (f.group) lastGroup = f.group;
      const miss = state.showMissing && needed(f) && !answered(f);
      const hit = opts.hit && opts.hit.has(f.id);
      box.append(h("div", { class: "row" + (f.help ? "" : " nohelp") + (miss ? " missing" : "") + (hit ? " hit" : ""), id: "row_" + f.id },
        h("div", {}, control(f), miss ? h("div", { class: "req-flag", role: "alert" }, opts.flagText || "This question is required.") : null, opts.extra ? opts.extra(f) : null),
        h("aside", { class: "help" }, f.help ? [h("b", {}, "Help: " + f.help[0]), f.help[1]] : null)));
    });
  }
  function jump(fieldId) {
    const el = document.getElementById("row_" + fieldId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("flash");
    const i = el.querySelector("input:not([disabled]),select"); if (i) i.focus({ preventScroll: true });
    setTimeout(() => el.classList.remove("flash"), 1700);
  }
  function chrome(design, extraUtil) {
    document.getElementById("chrome").innerHTML =
      `<div class="proto-banner">Academic Usability Prototype &mdash; Not a Government Website. Fictional applicant data only.</div>
       <div class="hdr"><div class="logo">LOGO</div><div><h1>Consular Electronic Application Center</h1><small>U.S. DEPARTMENT of STATE</small></div>
        <div class="util"><a class="returnbtn" href="index.html">&larr; Return to Design Options</a><span id="utilslot"></span></div></div>
       <div class="tabs"><div class="on">COMPLETE</div><div>REVIEW</div><div>SIGN</div></div>
       <div class="apptitle">Online Nonimmigrant Visa Application (DS-160) <span>Application ID: FICT-0001</span><span class="designtag">${design}</span></div>`;
    document.getElementById("footer").innerHTML =
      `<div class="footer">Academic Usability Prototype &mdash; Not a Government Website. &nbsp;<button class="link" id="resetbtn">Reset prototype to starting state</button></div>`;
    document.getElementById("resetbtn").onclick = () => { if (confirm("Reset this design to its starting state?")) reset(); };
  }
  return { state, answers, meta, SECTIONS, init, reset, h, stats, label, overall, pendingAll, findField, answerText, search,
           renderSection, jump, chrome, save, saveIndicator, answered, visible, now };
})();
