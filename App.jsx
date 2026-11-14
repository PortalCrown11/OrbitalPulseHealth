import React, { useMemo, useState } from "react";
import {
  Activity, HeartPulse, Moon, Brain, Thermometer, Droplets, Gauge,
  LayoutDashboard, ClipboardList, UserRound, CalendarDays, Settings,
  Bell, Search, ChevronDown, ArrowUpRight, ArrowDownRight, Plus,
  Download, CircleHelp, ShieldCheck, Sparkles, AlertTriangle, Check,
  Menu, X, Send, Zap, Footprints, TrendingUp
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis,
  Tooltip, LineChart, Line, BarChart, Bar
} from "recharts";

const defaultVitals = [
  { key: "heartRate", label: "Heart rate", value: 72, unit: "bpm", icon: HeartPulse, color: "#69d7ff", status: "Within baseline", change: "−2 bpm", trend: "down" },
  { key: "bloodPressure", label: "Blood pressure", value: "118/76", unit: "mmHg", icon: Activity, color: "#a99bff", status: "Within baseline", change: "Stable", trend: "flat" },
  { key: "temperature", label: "Body temperature", value: 36.7, unit: "°C", icon: Thermometer, color: "#ffb56b", status: "Within baseline", change: "+0.1 °C", trend: "up" },
  { key: "sleep", label: "Sleep duration", value: 7.4, unit: "hrs", icon: Moon, color: "#8fe2b5", status: "Good recovery", change: "+0.6 hrs", trend: "up" },
];

const heartData = [
  { day: "M", value: 75 }, { day: "T", value: 73 }, { day: "W", value: 76 },
  { day: "T", value: 71 }, { day: "F", value: 74 }, { day: "S", value: 70 }, { day: "S", value: 72 }
];
const sleepData = [
  { day: "M", hours: 6.2 }, { day: "T", hours: 7.1 }, { day: "W", hours: 6.8 },
  { day: "T", hours: 7.6 }, { day: "F", hours: 7.0 }, { day: "S", hours: 8.1 }, { day: "S", hours: 7.4 }
];
const missionData = [
  { day: "D01", heart: 74, sleep: 6.7 }, { day: "D07", heart: 73, sleep: 7.0 },
  { day: "D14", heart: 75, sleep: 6.8 }, { day: "D21", heart: 71, sleep: 7.2 },
  { day: "D28", heart: 72, sleep: 7.4 }, { day: "D35", heart: 72, sleep: 7.4 }
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Health records", icon: ClipboardList },
  { label: "Digital twin", icon: UserRound },
  { label: "Mission timeline", icon: CalendarDays },
];

function Logo() {
  return <div className="brand">
    <div className="brand-mark"><Activity size={21} strokeWidth={2.5}/></div>
    <div><strong>OrbitalPulse</strong><span>HEALTH SYSTEM</span></div>
  </div>;
}

function SectionTitle({ eyebrow, title, right }) {
  return <div className="section-title">
    <div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div>
    {right}
  </div>;
}

function MetricCard({ item }) {
  const Icon = item.icon;
  const trendIcon = item.trend === "up" ? <ArrowUpRight size={13}/> : item.trend === "down" ? <ArrowDownRight size={13}/> : <Activity size={13}/>;
  return <div className="metric-card">
    <div className="metric-top">
      <div className="metric-icon" style={{ color: item.color, background: `${item.color}17` }}><Icon size={18}/></div>
      <span className="metric-status"><span className="status-dot"/> {item.status}</span>
    </div>
    <div className="metric-label">{item.label}</div>
    <div className="metric-value">{item.value}<small>{item.unit}</small></div>
    <div className="metric-foot"><span className={`trend ${item.trend}`}>{trendIcon} {item.change}</span><span>vs. last check</span></div>
  </div>;
}

function BodyMap({ selected, onSelect }) {
  const parts = [
    { name: "Brain", x: 150, y: 34, r: 17, color: "#a99bff" },
    { name: "Heart", x: 150, y: 108, r: 13, color: "#ff7896" },
    { name: "Lungs", x: 150, y: 91, r: 22, color: "#69d7ff" },
    { name: "Muscles", x: 150, y: 165, r: 28, color: "#ffb56b" },
    { name: "Bones", x: 150, y: 215, r: 18, color: "#8fe2b5" },
  ];
  return <div className="body-map-wrap">
    <svg className="body-svg" viewBox="0 0 300 300" role="img" aria-label="Interactive astronaut body illustration">
      <defs>
        <linearGradient id="suit" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#dce9f8"/><stop offset="100%" stopColor="#7e9bbd"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="150" cy="145" r="112" fill="none" stroke="#233650" strokeDasharray="3 8"/>
      <circle cx="150" cy="145" r="90" fill="none" stroke="#1a2a41"/>
      {/* suit silhouette */}
      <circle cx="150" cy="40" r="29" fill="url(#suit)" stroke="#69d7ff" strokeWidth="1.5"/>
      <ellipse cx="150" cy="41" rx="19" ry="17" fill="#10243b" stroke="#69d7ff" strokeWidth="2"/>
      <path d="M119 77 Q150 65 181 77 L196 143 Q181 160 170 154 L169 207 L131 207 L130 154 Q119 160 104 143 Z" fill="url(#suit)" stroke="#69d7ff" strokeWidth="1.5"/>
      <path d="M108 87 L83 150 Q79 161 90 166 Q101 170 106 158 L128 111" fill="url(#suit)" stroke="#69d7ff" strokeWidth="1.5"/>
      <path d="M192 87 L217 150 Q221 161 210 166 Q199 170 194 158 L172 111" fill="url(#suit)" stroke="#69d7ff" strokeWidth="1.5"/>
      <path d="M132 205 L121 265 Q120 276 132 278 L143 278 L151 218" fill="url(#suit)" stroke="#69d7ff" strokeWidth="1.5"/>
      <path d="M168 205 L179 265 Q180 276 168 278 L157 278 L149 218" fill="url(#suit)" stroke="#69d7ff" strokeWidth="1.5"/>
      <rect x="132" y="117" width="36" height="24" rx="5" fill="#10243b" stroke="#69d7ff"/>
      {parts.map(p => <g key={p.name} onClick={() => onSelect(p.name)} style={{cursor:"pointer"}}>
        <circle cx={p.x} cy={p.y} r={p.r} fill={p.color} opacity={selected === p.name ? .9 : .28} stroke={p.color} strokeWidth={selected === p.name ? 2 : 1} filter={selected === p.name ? "url(#glow)" : undefined}/>
        <circle cx={p.x} cy={p.y} r={4} fill={p.color}/>
      </g>)}
      <g fontSize="9" fill="#9db3ce">
        <text x="195" y="37">BRAIN</text><text x="190" y="110">HEART</text>
        <text x="196" y="87">LUNGS</text><text x="195" y="165">MUSCLES</text><text x="192" y="216">BONES</text>
      </g>
    </svg>
    <div className="body-map-caption"><span className="status-dot"/> Select a body region to explore</div>
  </div>;
}

export default function App() {
  const [active, setActive] = useState("Overview");
  const [selectedPart, setSelectedPart] = useState("Heart");
  const [showEntry, setShowEntry] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ heartRate: "72", systolic: "118", diastolic: "76", temperature: "36.7", sleep: "7.4", mood: "Good", glucose: "94" });

  const currentVitals = useMemo(() => defaultVitals.map(v => {
    const latest = records[0];
    if (!latest) return v;
    if (v.key === "heartRate") return { ...v, value: latest.heartRate };
    if (v.key === "bloodPressure") return { ...v, value: `${latest.systolic}/${latest.diastolic}` };
    if (v.key === "temperature") return { ...v, value: latest.temperature };
    if (v.key === "sleep") return { ...v, value: latest.sleep };
    return v;
  }), [records]);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function submitRecord(e) {
    e.preventDefault();
    const entry = { ...form, timestamp: new Date().toLocaleString(), id: Date.now() };
    setRecords(prev => [entry, ...prev]);
    setShowEntry(false);
    notify("Health check-in saved locally.");
  }

  function downloadReport() {
    const data = { project: "OrbitalPulseHealth", generatedAt: new Date().toISOString(), demoNotice: "Simulated prototype data; not a medical record.", latestVitals: currentVitals, records };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "orbitalpulse-health-report.json"; a.click();
    URL.revokeObjectURL(url);
    notify("Report exported.");
  }

  const pageHeading = active === "Overview" ? "Mission overview" : active;
  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
      <div className="sidebar-head"><Logo/><button className="icon-btn close-nav" onClick={() => setMobileNav(false)}><X size={18}/></button></div>
      <div className="mission-chip"><span className="pulse"/> MISSION SIMULATION <span className="chip-day">DAY 028</span></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{navItems.map(item => {
        const Icon = item.icon;
        return <button key={item.label} className={`nav-item ${active === item.label ? "active" : ""}`} onClick={() => {setActive(item.label); setMobileNav(false);}}>
          <Icon size={18}/><span>{item.label}</span>{item.label === "Health records" && records.length > 0 && <span className="nav-count">{records.length}</span>}
        </button>;
      })}</nav>
      <div className="sidebar-bottom">
        <div className="connection-card"><div className="connection-head"><ShieldCheck size={17}/> Systems status</div><div className="connection-line"><span className="status-dot"/> Demo environment online</div><div className="connection-sub">Local prototype · no device connection</div></div>
        <button className="nav-item" onClick={() => notify("Help center is a demo placeholder.")}><CircleHelp size={18}/><span>Help center</span></button>
        <button className="nav-item" onClick={() => notify("Settings are a demo placeholder.")}><Settings size={18}/><span>Settings</span></button>
        <div className="profile"><div className="avatar">AC</div><div className="profile-info"><strong>Astronaut Chen</strong><span>Mission specialist</span></div><ChevronDown size={16} className="profile-chevron"/></div>
      </div>
    </aside>

    {mobileNav && <div className="scrim" onClick={() => setMobileNav(false)}/>}
    <main className="main-content">
      <header className="topbar">
        <button className="icon-btn menu-btn" onClick={() => setMobileNav(true)}><Menu size={20}/></button>
        <div className="breadcrumbs"><span>Workspace</span><span className="crumb-sep">/</span><strong>{pageHeading}</strong></div>
        <div className="topbar-actions">
          <div className="search-box"><Search size={16}/><input placeholder="Search dashboard..." aria-label="Search dashboard"/></div>
          <button className="icon-btn notification-btn" onClick={() => notify("No new notifications.")}><Bell size={18}/><span className="notification-dot"/></button>
          <div className="top-avatar">AC</div>
        </div>
      </header>

      <div className="page">
        <div className="welcome-row">
          <div><div className="eyebrow">THURSDAY, MISSION DAY 028</div><h1>{pageHeading}</h1><p className="welcome-sub">Good morning, Astronaut Chen. Here's your wellness snapshot.</p></div>
          <div className="welcome-actions"><button className="btn secondary" onClick={downloadReport}><Download size={16}/> Export report</button><button className="btn primary" onClick={() => setShowEntry(true)}><Plus size={17}/> New check-in</button></div>
        </div>

        {active === "Overview" && <>
          <div className="alert-banner"><div className="alert-icon"><Sparkles size={18}/></div><div><strong>Daily health check-in is ready</strong><p>Record your measurements and review trends against your personal baseline.</p></div><button onClick={() => setShowEntry(true)}>Start check-in <ArrowUpRight size={15}/></button></div>

          <SectionTitle eyebrow="YOUR VITALS" title="Health indicators" right={<span className="updated-label"><span className="status-dot"/> Updated just now · Demo data</span>}/>
          <div className="metrics-grid">{currentVitals.map(item => <MetricCard key={item.key} item={item}/>)}</div>

          <div className="content-grid">
            <section className="panel chart-panel">
              <div className="panel-heading"><div><h3>Heart rate trend</h3><p>Resting heart rate · last 7 days</p></div><div className="chart-legend"><span className="legend-dot blue"/> BPM <button className="small-select">7 days <ChevronDown size={13}/></button></div></div>
              <div className="chart-stat"><strong>{currentVitals[0].value}</strong><span>bpm</span><span className="trend down"><ArrowDownRight size={14}/> 2.6%</span></div>
              <div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={heartData} margin={{top:10,right:5,left:-25,bottom:0}}><defs><linearGradient id="heartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#69d7ff" stopOpacity={.22}/><stop offset="100%" stopColor="#69d7ff" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#1e3047" strokeDasharray="3 4" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:"#8196b2",fontSize:11}}/><YAxis domain={[60,85]} axisLine={false} tickLine={false} tick={{fill:"#8196b2",fontSize:11}}/><Tooltip contentStyle={{background:"#101e31",border:"1px solid #29415f",borderRadius:10,color:"#eaf2ff"}}/><Area type="monotone" dataKey="value" stroke="#69d7ff" strokeWidth={2.5} fill="url(#heartFill)" activeDot={{r:5,fill:"#69d7ff"}}/></AreaChart></ResponsiveContainer></div>
            </section>

            <section className="panel chart-panel">
              <div className="panel-heading"><div><h3>Sleep consistency</h3><p>Hours slept · last 7 days</p></div><div className="chart-legend"><span className="legend-dot green"/> HOURS</div></div>
              <div className="chart-stat"><strong>{currentVitals[3].value}</strong><span>hrs avg</span><span className="trend up"><ArrowUpRight size={14}/> 8.4%</span></div>
              <div className="chart-area"><ResponsiveContainer width="100%" height="100%"><BarChart data={sleepData} margin={{top:10,right:5,left:-25,bottom:0}}><CartesianGrid stroke="#1e3047" strokeDasharray="3 4" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:"#8196b2",fontSize:11}}/><YAxis domain={[0,10]} axisLine={false} tickLine={false} tick={{fill:"#8196b2",fontSize:11}}/><Tooltip contentStyle={{background:"#101e31",border:"1px solid #29415f",borderRadius:10,color:"#eaf2ff"}}/><Bar dataKey="hours" fill="#8fe2b5" radius={[5,5,0,0]} barSize={22}/></BarChart></ResponsiveContainer></div>
            </section>
          </div>

          <div className="lower-grid">
            <section className="panel body-panel"><div className="panel-heading"><div><h3>Astronaut digital twin</h3><p>Interactive body systems overview</p></div><span className="live-badge">INTERACTIVE</span></div><BodyMap selected={selectedPart} onSelect={setSelectedPart}/><div className="selected-region"><div className="region-icon"><HeartPulse size={17}/></div><div><strong>{selectedPart} system</strong><span>{selectedPart === "Heart" ? "Cardiovascular monitoring · baseline stable" : selectedPart === "Brain" ? "Behavioral and cognitive wellness · daily check-in" : selectedPart === "Lungs" ? "Respiratory awareness · routine monitoring" : selectedPart === "Muscles" ? "Muscle function · exercise routine tracking" : "Skeletal health · mission countermeasure awareness"}</span></div><ChevronDown size={16}/></div></section>
            <section className="panel insight-panel"><div className="panel-heading"><div><h3>Wellness insights</h3><p>Based on your demo trend data</p></div><div className="ai-badge"><Sparkles size={13}/> AI ASSIST</div></div>
              <div className="insight-item"><div className="insight-icon green"><Moon size={17}/></div><div><strong>Sleep trend looks steady</strong><p>Your recent average is 7.4 hours. Keep your planned sleep schedule consistent.</p><span className="insight-tag">RECOVERY</span></div></div>
              <div className="insight-item"><div className="insight-icon blue"><HeartPulse size={17}/></div><div><strong>Heart rate near baseline</strong><p>Recent resting values are close to the illustrative personal baseline.</p><span className="insight-tag">CARDIOVASCULAR</span></div></div>
              <div className="insight-item"><div className="insight-icon orange"><Zap size={17}/></div><div><strong>Remember daily movement</strong><p>Log your scheduled exercise and hydration routine for a more complete check-in.</p><span className="insight-tag">MISSION ROUTINE</span></div></div>
              <div className="insight-disclaimer"><AlertTriangle size={14}/> Prototype insights only. Not medical diagnosis or treatment advice.</div>
            </section>
          </div>
        </>}

        {active === "Health records" && <section className="panel records-panel">
          <div className="panel-heading"><div><h3>Health records</h3><p>Locally stored check-ins for this browser session</p></div><button className="btn primary" onClick={() => setShowEntry(true)}><Plus size={16}/> Add record</button></div>
          {records.length === 0 ? <div className="empty-state"><ClipboardList size={34}/><strong>No check-ins recorded yet</strong><p>Add a health check-in to populate your record history.</p><button className="btn primary" onClick={() => setShowEntry(true)}>Create first check-in</button></div> :
          <div className="table-wrap"><table><thead><tr><th>Recorded at</th><th>Heart rate</th><th>Blood pressure</th><th>Temperature</th><th>Sleep</th><th>Mood</th></tr></thead><tbody>{records.map(r => <tr key={r.id}><td>{r.timestamp}</td><td>{r.heartRate} bpm</td><td>{r.systolic}/{r.diastolic} mmHg</td><td>{r.temperature} °C</td><td>{r.sleep} hrs</td><td><span className="mood-pill">{r.mood}</span></td></tr>)}</tbody></table></div>}
        </section>}

        {active === "Digital twin" && <section className="panel digital-page"><div className="panel-heading"><div><h3>Astronaut digital twin</h3><p>Choose a body region to view its demo wellness context.</p></div></div><BodyMap selected={selectedPart} onSelect={setSelectedPart}/><div className="digital-info"><span className="live-badge">SELECTED REGION</span><h2>{selectedPart}</h2><p>{selectedPart === "Heart" ? "Cardiovascular monitoring can include heart rate and blood pressure trend review." : selectedPart === "Brain" ? "Behavioral wellness check-ins can include mood, stress, sleep, and cognitive self-report." : selectedPart === "Lungs" ? "Respiratory self-awareness can be part of routine crew health check-ins." : selectedPart === "Muscles" ? "Exercise routines and functional self-reports can support muscle health awareness." : "Microgravity is associated with bone loss; mission countermeasures and medical monitoring are important."}</p><div className="note-box"><AlertTriangle size={15}/> Visual body map is illustrative and does not represent clinical examination.</div></div></section>}

        {active === "Mission timeline" && <section className="panel timeline-panel"><div className="panel-heading"><div><h3>Mission health timeline</h3><p>Illustrative trends over the first 35 mission days</p></div><span className="live-badge">SIMULATED DATA</span></div><div className="timeline-chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={missionData} margin={{top:20,right:15,left:-15,bottom:5}}><CartesianGrid stroke="#1e3047" strokeDasharray="3 4"/><XAxis dataKey="day" tick={{fill:"#8196b2",fontSize:12}} axisLine={false} tickLine={false}/><YAxis yAxisId="left" tick={{fill:"#8196b2",fontSize:11}} axisLine={false} tickLine={false}/><YAxis yAxisId="right" orientation="right" tick={{fill:"#8196b2",fontSize:11}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"#101e31",border:"1px solid #29415f",borderRadius:10,color:"#eaf2ff"}}/><Line yAxisId="left" type="monotone" dataKey="heart" name="Resting heart rate (bpm)" stroke="#69d7ff" strokeWidth={2.5} dot={{r:4}}/><Line yAxisId="right" type="monotone" dataKey="sleep" name="Sleep (hours)" stroke="#8fe2b5" strokeWidth={2.5} dot={{r:4}}/></LineChart></ResponsiveContainer></div><div className="timeline-events"><div className="event"><span className="event-marker blue"/> <div><strong>Mission Day 01</strong><p>Baseline health profile established (illustrative).</p></div></div><div className="event"><span className="event-marker green"/> <div><strong>Mission Day 14</strong><p>Routine self-check and wellness review.</p></div></div><div className="event"><span className="event-marker purple"/> <div><strong>Mission Day 28</strong><p>Current simulated dashboard snapshot.</p></div></div></div></section>}
      </div>
      <footer className="footer"><span>OrbitalPulseHealth <span className="footer-sep">·</span> NASA Space Apps Challenge concept</span><span><ShieldCheck size={13}/> Privacy-first demo · data remains in session</span></footer>
    </main>

    {showEntry && <div className="modal-backdrop" onClick={() => setShowEntry(false)}><div className="modal" onClick={e => e.stopPropagation()}>
      <div className="modal-head"><div><span className="eyebrow">MISSION DAY 028</span><h2>Daily health check-in</h2><p>Enter sample values to add a local demo record.</p></div><button className="icon-btn" onClick={() => setShowEntry(false)}><X size={19}/></button></div>
      <form onSubmit={submitRecord} className="entry-form">
        <label>Heart rate <span>bpm</span><input type="number" min="30" max="220" required value={form.heartRate} onChange={e => setForm({...form,heartRate:e.target.value})}/></label>
        <div className="form-row"><label>Systolic BP <span>mmHg</span><input type="number" min="60" max="250" required value={form.systolic} onChange={e => setForm({...form,systolic:e.target.value})}/></label><label>Diastolic BP <span>mmHg</span><input type="number" min="30" max="150" required value={form.diastolic} onChange={e => setForm({...form,diastolic:e.target.value})}/></label></div>
        <div className="form-row"><label>Temperature <span>°C</span><input type="number" step="0.1" min="30" max="45" required value={form.temperature} onChange={e => setForm({...form,temperature:e.target.value})}/></label><label>Sleep duration <span>hours</span><input type="number" step="0.1" min="0" max="24" required value={form.sleep} onChange={e => setForm({...form,sleep:e.target.value})}/></label></div>
        <div className="form-row"><label>Blood glucose <span>mg/dL · optional</span><input type="number" min="20" max="600" value={form.glucose} onChange={e => setForm({...form,glucose:e.target.value})}/></label><label>Mood <span>self-report</span><select value={form.mood} onChange={e => setForm({...form,mood:e.target.value})}><option>Good</option><option>Okay</option><option>Low</option><option>Stressed</option></select></label></div>
        <div className="form-disclaimer"><ShieldCheck size={15}/> Demo-only values. This app is not a medical device.</div>
        <div className="modal-actions"><button type="button" className="btn secondary" onClick={() => setShowEntry(false)}>Cancel</button><button type="submit" className="btn primary"><Check size={16}/> Save check-in</button></div>
      </form>
    </div></div>}
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>;
}