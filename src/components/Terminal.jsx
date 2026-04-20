import { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  'cat education.txt': `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🎓 Degree    : B.Tech — Computer Science Engineering
                 (Data Science & Business Systems)
  🏛️  Institute : SRM Institute of Science & Technology
  📍 Location  : Chennai, India
  📅 Expected  : May 2027

  ── Coursework ──────────────────────────────
  ▹ Data Structures and Algorithms
  ▹ Programming in Python
  ▹ Fundamental of Data Science
  ▹ Machine Learning
  ▹ Quantum Machine Learning
  ▹ Compiler Design
  ▹ Software Engineering Project Management (SEPM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  'run experience.exe': `
[LOADING] experience.exe ...

▶ ACM SIGAPP Chapter | Research & Development Member
  📅 September 2025 – Present | Chennai, India
  ▹ Explore emerging technologies, analyse data, develop
    innovative solutions to improve products and processes
  ▹ Design and test prototypes, collaborate with cross-
    functional teams, transform research into outcomes
  ▹ Stay updated with industry advancements

▶ Data Science Club SRMIST | Non-Tech Head
  📅 September 2025 – Present | Chennai, India
  ▹ Lead all non-technical activities: event planning,
    team management, logistics, creative strategy
  ▹ Organise cultural programs: dance performances,
    entertainment segments, interactive sessions

▶ Data Science Club SRMIST | Media Lead
  📅 March 2025 – September 2025 | Chennai, India
  ▹ Managed all media: photos, videos, visual content
  ▹ Led media team for high-quality event coverage

[DONE] Exit code: 0`,

  'ls projects/': `
drwxr-xr-x  dance-judging-system/    ← MediaPipe + CV + Daltonization
drwxr-xr-x  isp-fault-detection/     ← TFT + LLM, 93%+ accuracy
drwxr-xr-x  wind-prediction/         ← LSTM+ARIMA+RF, 93%+ accuracy
drwxr-xr-x  advision-ai/             ← URL → Instagram Reel pipeline
drwxr-xr-x  agriconnect/             ← RAG farmer advisory (LangChain)
drwxr-xr-x  morig-dance-company/     ← AI judging + Smart Studio
drwxr-xr-x  digital-khata/           ← Multi-role lending platform
drwxr-xr-x  ipl-analytics/           ← Cricket squad optimisation`,

  'cat skills.json': `{
  "experienced": {
    "languages": ["Python", "Java", "C#", "C", "SQL"],
    "ml":        ["TensorFlow", "PyTorch", "Scikit-learn", "PennyLane"],
    "web":       ["React", "Next.js", "FastAPI", "Node.js", "Expo"],
    "cv":        ["MediaPipe", "OpenCV", "Librosa"],
    "llm":       ["LangChain", "Gemini API", "ChromaDB", "RAG"]
  },
  "familiar": {
    "languages": ["JavaScript", "C++"],
    "tools":     ["Visual Studio", "Jupyter", "Canva", "Docker", "Git"],
    "os":        ["Windows", "Linux", "macOS"]
  },
  "specialties": [
    "Quantum Machine Learning (QML)",
    "Deep Learning (LSTM, TFT, Random Forest)",
    "Computer Vision & Pose Estimation",
    "RAG Pipelines & LLM Engineering",
    "Compiler Design & SEPM",
    "Data Visualisation & IPL Analytics"
  ]
}`,

  'cat contact.txt': `
  📧 Email    : moneshs2306@gmail.com
  📱 Phone    : 9688833107
  🐙 GitHub   : github.com/moneshs23
  💼 LinkedIn : linkedin.com/in/monesh-s-362609333
  🔢 LeetCode : leetcode.com/u/Monesh2306
  📍 Location : Chennai, India`,

  'cat projects/dance-judging-system.txt': `
  PROJECT: Dance Judging System
  ─────────────────────────────────────────
  ▹ Dance judging using AI and Computer Vision
  ▹ Hardware implementation of Daltonization
    color-correction algorithm for color-blind users
  ▹ Consistent 60 FPS on 4K video input
  ▹ Pose estimation precision within <2° angular error
  Stack: MediaPipe, OpenCV, Librosa, FastAPI, React`,

  'cat projects/isp-fault-detection.txt': `
  PROJECT: Hybrid Anomaly Fault Detection in ISP Networks
  ─────────────────────────────────────────
  ▹ Hybrid ML: Temporal Fusion Transformer + LLM
  ▹ Traverses 5-tier topology: NOC-BLOCK-GP-OLT-ONT
  ▹ Isolates exact failing segments & cascade paths
  ▹ 93%+ fault detection accuracy on Tamil Nadu datasets
  Stack: PyTorch, TFT, LLM, FastAPI, Telemetry data`,

  'cat projects/wind-prediction.txt': `
  PROJECT: Wind Prediction for Power Generation
  ─────────────────────────────────────────
  ▹ Hybrid LSTM + ARIMA + Random Forest model
  ▹ Forecasts wind speed and turbine power output
  ▹ 93%+ prediction accuracy on real-world datasets
  Stack: Python, PyTorch, Scikit-learn, NumPy, Pandas`,

  help: `
  Available commands:
  ──────────────────────────────────────────
  cat education.txt                  → Degree & coursework
  run experience.exe                 → Work experience
  ls projects/                       → List all projects
  cat projects/dance-judging-system.txt
  cat projects/isp-fault-detection.txt
  cat projects/wind-prediction.txt
  cat skills.json                    → Full skill set
  cat contact.txt                    → Contact details
  clear                              → Clear terminal
  help                               → Show this menu`,
};

export default function Terminal() {
  const [lines, setLines] = useState([
    {type:'info', text:'╔══════════════════════════════════════════════╗'},
    {type:'info', text:'║  Monesh S — Interactive Portfolio Terminal   ║'},
    {type:'info', text:'║  B.Tech CS (Data Science) · SRMIST · 2027   ║'},
    {type:'info', text:'╚══════════════════════════════════════════════╝'},
    {type:'info', text:''},
    {type:'info', text:'Type "help" to see all available commands.'},
    {type:'info', text:''},
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const runCmd = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [...lines, {type:'cmd', text:cmd}];
    if (trimmed === 'clear') { setLines([{type:'info', text:'Terminal cleared. Type "help" for commands.'}]); setInput(''); return; }
    const output = COMMANDS[trimmed];
    if (output) newLines.push({type:'out', text:output});
    else if (trimmed !== '') newLines.push({type:'err', text:`Command not found: "${cmd}". Try "help"`});
    setLines(newLines);
    setHistory(h=>[cmd,...h]);
    setHistIdx(-1);
    setInput('');
  };

  const onKey = (e) => {
    if (e.key === 'Enter') runCmd(input);
    else if (e.key === 'ArrowUp') { const i=Math.min(histIdx+1,history.length-1); setHistIdx(i); setInput(history[i]||''); }
    else if (e.key === 'ArrowDown') { const i=Math.max(histIdx-1,-1); setHistIdx(i); setInput(i===-1?'':history[i]); }
  };

  return (
    <div className="term-window" onClick={()=>inputRef.current?.focus()}>
      <div className="term-bar">
        <div className="dot r"/><div className="dot y"/><div className="dot g"/>
        <span>monesh_s@srmist — portfolio-terminal — zsh</span>
      </div>
      <div className="term-body" ref={bodyRef}>
        {lines.map((l,i)=>(
          <div key={i} className="t-line">
            {l.type==='cmd'&&<><span className="t-prompt">monesh@srmist:~$ </span><span className="t-cmd">{l.text}</span></>}
            {l.type==='out'&&<span className="t-out">{l.text}</span>}
            {l.type==='err'&&<span className="t-err">✗ {l.text}</span>}
            {l.type==='info'&&<span className="t-info">{l.text}</span>}
          </div>
        ))}
      </div>
      <div className="term-hints">
        {['cat education.txt','run experience.exe','ls projects/','cat skills.json','cat contact.txt','help'].map(h=>(
          <button key={h} className="t-hint" onClick={()=>runCmd(h)}>{h}</button>
        ))}
      </div>
      <div className="term-input-row">
        <span className="t-prompt">monesh@srmist:~$&nbsp;</span>
        <input ref={inputRef} className="term-input" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} spellCheck={false} autoComplete="off" placeholder="type a command and press Enter..."/>
      </div>
    </div>
  );
}
