import { useEffect, useRef, useState } from 'react';
import MatrixRain from './components/MatrixRain';
import SkillCloud from './components/SkillCloud';
import './index.css';

/* ── Cursor ── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const colors = { hero:'#00f5ff', lab:'#00f5ff', hub:'#a855f7', analytics:'#00ff88', terminal:'#ff6b35' };
    let color='#00f5ff', rx=0, ry=0, px=0, py=0, rafId;
    const onMove = (e) => {
      px=e.clientX; py=e.clientY;
      if(dot.current){ dot.current.style.left=px+'px'; dot.current.style.top=py+'px'; }
      const sec=document.elementFromPoint(px,py)?.closest('[data-section]');
      color = sec ? (colors[sec.dataset.section]||'#00f5ff') : '#00f5ff';
      if(dot.current) dot.current.style.background=color;
    };
    const lerp=(a,b,t)=>a+(b-a)*t;
    const animate=()=>{
      rx=lerp(rx,px,0.12); ry=lerp(ry,py,0.12);
      if(ring.current){ ring.current.style.left=rx+'px'; ring.current.style.top=ry+'px'; ring.current.style.borderColor=color+'55'; }
      rafId=requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove',onMove);
    rafId=requestAnimationFrame(animate);
    return()=>{ document.removeEventListener('mousemove',onMove); cancelAnimationFrame(rafId); };
  },[]);
  return(<><div ref={dot} className="cursor-dot" style={{background:'#00f5ff'}}/><div ref={ring} className="cursor-ring"/></>);
}

/* ── Scroll fade ── */
function useFadeIn(){
  useEffect(()=>{
    const els=document.querySelectorAll('.anim-fade-up');
    const obs=new IntersectionObserver(e=>e.forEach(x=>{ if(x.isIntersecting) x.target.classList.add('in-view'); }),{threshold:0.1});
    els.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
}

/* ── Nav ── */
function Nav(){
  return(
    <nav className="nav">
      <div className="nav-logo">Monesh S</div>
      <ul className="nav-links">
        {[['#about','About'],['#lab','The Lab'],['#experience','Experience'],['#hub','Projects']].map(([h,l])=>(
          <li key={h}><a href={h}>{l}</a></li>
        ))}
      </ul>
      <a href="mailto:moneshs2306@gmail.com" className="nav-cta">Hire Me →</a>
    </nav>
  );
}

/* ── Hero ── */
function Hero(){
  return(
    <section id="hero" data-section="hero" style={{
      position:'relative', height:'100vh', overflow:'hidden',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      {/* Full-width background image */}
      <img src="/hero_banner.png" alt="" style={{
        position:'absolute', inset:0, width:'100%', height:'100%',
        objectFit:'cover', objectPosition:'center', opacity:0.55,
      }}/>
      {/* Dark gradient overlay */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to bottom, rgba(5,5,16,0.45) 0%, rgba(5,5,16,0.75) 100%)',
      }}/>
      {/* Subtle matrix rain on top */}
      <div style={{position:'absolute',inset:0,opacity:0.18}}><MatrixRain/></div>
      {/* Content */}
      <div style={{
        position:'relative', zIndex:10, textAlign:'center',
        padding:'0 2rem', maxWidth:'760px',
      }}>
        <div style={{
          display:'inline-block', padding:'0.35rem 1rem', borderRadius:'999px',
          background:'rgba(0,245,255,0.08)', border:'1px solid rgba(0,245,255,0.25)',
          color:'rgba(0,245,255,0.9)', fontSize:'0.78rem', fontWeight:600,
          letterSpacing:'2px', textTransform:'uppercase', marginBottom:'1.5rem',
          fontFamily:'var(--font-mono)',
        }}>SRMIST · Chennai · B.Tech CS (Data Science) · 2027</div>
        <h1 style={{
          fontSize:'clamp(3.2rem,7vw,5.5rem)', fontWeight:900, letterSpacing:'-2px',
          background:'linear-gradient(135deg,#ffffff 0%,#a0d8ff 40%,#c084fc 70%,#f472b6 100%)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          lineHeight:1.05, marginBottom:'1.25rem',
        }}>Monesh S</h1>
        <p style={{
          fontSize:'clamp(1.05rem,2vw,1.3rem)', color:'rgba(230,230,255,0.88)',
          lineHeight:1.65, marginBottom:'2rem', fontWeight:400,
        }}>
          AI Researcher · Founder of Morig Dance Company<br/>
          <span style={{color:'rgba(180,180,220,0.7)',fontSize:'0.95em'}}>
            Building systems at the intersection of <strong style={{color:'#7dd3fc'}}>Deep Learning</strong>,{' '}
            <strong style={{color:'#c084fc'}}>Quantum ML</strong> &amp;{' '}
            <strong style={{color:'#f9a8d4'}}>Computer Vision</strong>
          </span>
        </p>
        <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'2.5rem'}}>
          {[['⚗️ QML Researcher','#00f5ff'],['🚀 Founder','#a855f7'],['👁️ Computer Vision','#ff2d9d'],['🧠 Deep Learning','#00ff88']].map(([l,c])=>(
            <span key={l} style={{
              padding:'0.4rem 1.1rem', borderRadius:'999px', fontSize:'0.82rem', fontWeight:600,
              border:`1.5px solid ${c}55`, color:c, background:`${c}0e`,
            }}>{l}</span>
          ))}
        </div>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="#hub" style={{
            padding:'0.8rem 2.2rem', borderRadius:'999px', fontWeight:700, fontSize:'0.95rem',
            background:'linear-gradient(135deg,#00f5ff,#a855f7)', color:'#000',
            textDecoration:'none', transition:'all 0.3s', display:'inline-block',
          }}
          onMouseOver={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(0,245,255,0.35)';}}
          onMouseOut={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='';}}>
            View Projects
          </a>
          <a href="#about" style={{
            padding:'0.8rem 2.2rem', borderRadius:'999px', fontWeight:700, fontSize:'0.95rem',
            border:'1.5px solid rgba(255,255,255,0.3)', color:'#fff',
            textDecoration:'none', transition:'all 0.3s', display:'inline-block',
          }}
          onMouseOver={e=>{e.currentTarget.style.borderColor='#00f5ff';e.currentTarget.style.color='#00f5ff';}}
          onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.3)';e.currentTarget.style.color='#fff';}}>
            About Me
          </a>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{
        position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem',
        color:'rgba(255,255,255,0.35)', fontSize:'0.65rem', letterSpacing:'2px',
        textTransform:'uppercase', animation:'floatY 2s ease-in-out infinite', zIndex:10,
      }}>
        <div style={{width:18,height:18,borderRight:'2px solid #00f5ff',borderBottom:'2px solid #00f5ff',transform:'rotate(45deg)'}}/>
        Scroll
      </div>
    </section>
  );
}

/* ── About ── */
function About(){
  return(
    <div className="about-strip" id="about" data-section="hero">
      <div className="about-inner">
        <div className="about-photo-wrap">
          <div className="about-photo-placeholder">
            <span style={{fontSize:'3.5rem'}}>👨‍💻</span>
            <span style={{fontSize:'0.75rem',color:'rgba(0,245,255,0.6)',fontFamily:'var(--font-mono)'}}>monesh_s</span>
          </div>
        </div>
        <div className="about-info">
          <h2>Hi, I'm <span className="grad-cyan">Monesh S</span></h2>
          <p>
            A B.Tech Computer Science (Data Science & Business Systems) student at <strong>SRM Institute of Science & Technology</strong>, Chennai — expected May 2027. I build AI systems that matter: from Quantum ML classifiers and hybrid deep learning models to RAG pipelines and computer vision apps — while also running <strong>Morig Dance Company</strong> as its founder.
          </p>
          <div className="about-meta">
            {[
              ['📧','moneshs2306@gmail.com'],['📱','9688833107'],
              ['📍','Chennai, India'],['🎓','SRMIST — Expected May 2027'],
            ].map(([icon,txt])=>(
              <div className="meta-item" key={txt}><span>{icon}</span><span>{txt}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Lab ── */
const AI_METRICS = [
  {label:'Wind Speed Prediction Accuracy',val:93,color:'#a855f7'},
  {label:'ISP Fault Detection Accuracy',val:93,color:'#ff6b35'},
  {label:'Pose Estimation Precision',val:98,color:'#ff2d9d'},
  {label:'Beat Sync Accuracy',val:91,color:'#00f5ff'},
  {label:'RAG Retrieval Precision @5',val:88,color:'#00ff88'},
  {label:'Daltonization Color Filter',val:95,color:'#febc2e'},
];
const AI_DOMAINS = [
  {icon:'⚛️',title:'Quantum Machine Learning',color:'#00f5ff',
   bullets:['Variational Quantum Circuits (VQC) using PennyLane','Angle Embedding + StronglyEntanglingLayers on 4-qubit systems','Quantum superposition & entanglement for ML speedup','QML vs classical SVM benchmarking'],
   code:`<span class="cm"># VQC Classifier — PennyLane</span>\n<span class="kw">import</span> pennylane <span class="kw">as</span> qml\ndev = qml.<span class="fn">device</span>(<span class="str">'default.qubit'</span>, wires=<span class="num">4</span>)\n\n@qml.<span class="fn">qnode</span>(dev)\n<span class="kw">def</span> <span class="fn">vqc</span>(params, x):\n    qml.<span class="fn">AngleEmbedding</span>(x, wires=range(<span class="num">4</span>), rotation=<span class="str">'Y'</span>)\n    qml.<span class="fn">StronglyEntanglingLayers</span>(params, wires=range(<span class="num">4</span>))\n    <span class="kw">return</span> [qml.<span class="fn">expval</span>(qml.PauliZ(i)) <span class="kw">for</span> i <span class="kw">in</span> range(<span class="num">4</span>)]`},
  {icon:'🧠',title:'Deep Learning — LSTM & TFT',color:'#a855f7',
   bullets:['LSTM+ARIMA+RF hybrid for wind forecasting (93%+ accuracy)','Temporal Fusion Transformer for ISP anomaly detection','Multi-step ahead forecasting on Tamil Nadu telemetry datasets','Hyperparameter tuning with Optuna; SHAP attribution'],
   code:`<span class="cm"># Hybrid LSTM + Attention — Wind Forecasting</span>\n<span class="kw">class</span> <span class="fn">HybridModel</span>(nn.Module):\n    <span class="kw">def</span> <span class="fn">__init__</span>(self):\n        super().<span class="fn">__init__</span>()\n        self.lstm = nn.<span class="fn">LSTM</span>(<span class="num">8</span>, <span class="num">128</span>, <span class="num">2</span>, batch_first=<span class="kw">True</span>, dropout=<span class="num">0.2</span>)\n        self.attn = nn.<span class="fn">MultiheadAttention</span>(<span class="num">128</span>, num_heads=<span class="num">4</span>)\n        self.fc   = nn.<span class="fn">Linear</span>(<span class="num">128</span>, <span class="num">1</span>)`},
  {icon:'👁️',title:'Computer Vision & Pose AI',color:'#ff2d9d',
   bullets:['33-keypoint BlazePose tracking at 60 FPS for 4K video','Daltonization color-correction (hardware implementation)','Joint angle kinematics → energy & coordination scoring','Dance judging pipeline: Energy + Musicality + Coordination'],
   code:`<span class="cm"># Joint Angle — Law of Cosines</span>\n<span class="kw">def</span> <span class="fn">joint_angle</span>(a, b, c):\n    ba = np.<span class="fn">array</span>(a) - np.<span class="fn">array</span>(b)\n    bc = np.<span class="fn">array</span>(c) - np.<span class="fn">array</span>(b)\n    cos = np.<span class="fn">dot</span>(ba,bc)/(np.<span class="fn">linalg</span>.<span class="fn">norm</span>(ba)*np.<span class="fn">linalg</span>.<span class="fn">norm</span>(bc)+<span class="num">1e-9</span>)\n    <span class="kw">return</span> np.<span class="fn">degrees</span>(np.<span class="fn">arccos</span>(np.<span class="fn">clip</span>(cos,<span class="num">-1</span>,<span class="num">1</span>)))`},
  {icon:'🤖',title:'LLMs & RAG Pipelines',color:'#00ff88',
   bullets:['AgriConnect RAG: ChromaDB vector search + Gemini synthesis','ADVision AI: Firecrawl scrape → Gemini script → TTS → video','Structured JSON output with Pydantic schema validation','LangChain multi-turn memory for conversational context'],
   code:`<span class="cm"># RAG Pipeline — LangChain + ChromaDB + Gemini</span>\n<span class="kw">def</span> <span class="fn">build_rag</span>(docs):\n    vs = Chroma.<span class="fn">from_documents</span>(docs,\n        embedding=<span class="fn">HFEmbeddings</span>(<span class="str">'BAAI/bge-base-en'</span>))\n    llm = <span class="fn">ChatGoogleGenerativeAI</span>(model=<span class="str">'gemini-1.5-flash'</span>)\n    <span class="kw">return</span> RetrievalQA.<span class="fn">from_chain_type</span>(llm,\n        retriever=vs.<span class="fn">as_retriever</span>(k=<span class="num">5</span>))`},
];

function Lab(){
  const [exp,setExp]=useState({});
  const toggle=k=>setExp(e=>({...e,[k]:!e[k]}));
  return(
    <section className="section bg-surface" id="lab" data-section="lab">
      <div className="section-wrap">
        <div className="anim-fade-up">
          <span className="section-badge badge-cyan">⚗️ Realm 01 — The Researcher</span>
          <h2 className="section-title">The <span className="grad-cyan">Lab</span></h2>
          <p className="section-sub">QML · Deep Learning · Computer Vision · LLM Systems · SRMIST R&D</p>
        </div>

        {/* Metrics */}
        <div className="card anim-fade-up delay-1" style={{marginBottom:'2.5rem'}}>
          <p style={{color:'var(--cyan)',fontFamily:'var(--font-mono)',fontSize:'0.8rem',marginBottom:'1.25rem',letterSpacing:'1px'}}>
            # BENCHMARKS — real results from live projects
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1.1rem'}}>
            {AI_METRICS.map(m=>(
              <div className="metric-row" key={m.label}>
                <div className="metric-labels">
                  <span>{m.label}</span>
                  <span style={{color:m.color}}>{m.val}%</span>
                </div>
                <div className="metric-bar-bg">
                  <div className="metric-bar-fill" style={{width:`${m.val}%`,background:m.color,boxShadow:`0 0 10px ${m.color}88`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill cloud */}
        <div className="anim-fade-up delay-1">
          <h3 style={{fontSize:'1.15rem',fontWeight:700,marginBottom:'0.4rem',color:'#e0e0ff'}}>⚙️ Skill Orbit — hover to see linked projects</h3>
          <SkillCloud/>
        </div>

        {/* Domain cards */}
        <div className="anim-fade-up delay-2" style={{marginTop:'3rem'}}>
          <h3 style={{fontSize:'1.3rem',fontWeight:800,marginBottom:'0.4rem',color:'#fff'}}>🔬 AI/ML <span className="grad-cyan">Domains</span></h3>
          <p style={{color:'var(--text-muted)',fontSize:'0.85rem',marginBottom:'1.75rem',fontFamily:'var(--font-mono)'}}>
            # Click "show snippet" to view real research code
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:'1.25rem'}}>
            {AI_DOMAINS.map((d,i)=>(
              <div key={d.title} className={`card anim-fade-up delay-${i+1}`} style={{borderColor:`${d.color}25`}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
                  <div style={{width:44,height:44,borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',background:`${d.color}12`,border:`1px solid ${d.color}30`}}>{d.icon}</div>
                  <h3 style={{fontSize:'1.02rem',fontWeight:700,color:'#fff'}}>{d.title}</h3>
                </div>
                <ul style={{listStyle:'none',marginBottom:'1rem'}}>
                  {d.bullets.map(b=>(
                    <li key={b} style={{display:'flex',gap:'0.5rem',marginBottom:'0.4rem',fontSize:'0.88rem',color:'var(--text-secondary)',lineHeight:1.6}}>
                      <span style={{color:d.color,flexShrink:0}}>▹</span>{b}
                    </li>
                  ))}
                </ul>
                <button onClick={()=>toggle(d.title)} style={{background:`${d.color}0d`,border:`1px solid ${d.color}35`,color:d.color,borderRadius:'8px',padding:'0.4rem 0.9rem',fontSize:'0.77rem',cursor:'pointer',fontFamily:'var(--font-mono)'}}>
                  {exp[d.title]?'▲ hide code':'▼ show snippet'}
                </button>
                {exp[d.title]&&(
                  <div className="code-block" style={{marginTop:'0.75rem'}}>
                    <div className="code-header"><div className="dot r"/><div className="dot y"/><div className="dot g"/><span style={{marginLeft:'0.5rem',fontSize:'0.7rem',color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>research.py</span></div>
                    <pre dangerouslySetInnerHTML={{__html:d.code}}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Experience ── */
function Experience(){
  const jobs=[
    {org:'ACM SIGAPP Chapter, SRMIST',role:'Research & Development Member',period:'September 2025 – Present · Chennai, India',color:'#00f5ff',
     bullets:['Explore emerging technologies, analyse data, develop innovative solutions to improve products and processes','Design and test prototypes, collaborate with cross-functional teams, transform research into impactful outcomes','Stay updated with industry advancements and contribute to applied AI research']},
    {org:'Data Science Club, SRMIST',role:'Non-Tech Head',period:'September 2025 – Present · Chennai, India',color:'#a855f7',
     bullets:['Lead all non-technical activities including event planning, team management, logistics, and creative strategy','Organise and oversee cultural programs such as dance performances, entertainment segments, and interactive sessions','Ensure smooth execution and vibrant engagement in every club event']},
    {org:'Data Science Club, SRMIST',role:'Media Lead',period:'March 2025 – September 2025 · Chennai, India',color:'#00ff88',
     bullets:['Managed all media-related activities — capturing and editing photos and videos of events','Created engaging visual content and led the media team for high-quality coverage and storytelling']},
  ];
  return(
    <section className="section" id="experience" data-section="lab">
      <div className="section-wrap">
        <div className="anim-fade-up">
          <span className="section-badge badge-purple">💼 Experience</span>
          <h2 className="section-title">Work <span className="grad-purple">Experience</span></h2>
          <p className="section-sub">Roles, responsibilities and real-world impact</p>
        </div>
        {jobs.map((j,i)=>(
          <div key={j.role} className={`exp-card anim-fade-up delay-${i+1}`} style={{borderLeftColor:j.color}}>
            <div className="role" style={{color:j.color}}>{j.role}</div>
            <h3>{j.org}</h3>
            <div className="period">{j.period}</div>
            <ul>{j.bullets.map(b=><li key={b} style={{color:'var(--text-secondary)'}}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Innovation Hub ── */
function Hub(){
  const projects=[
    {emoji:'🎬',title:'ADVision AI',sub:'URL → Instagram Reel in seconds',color:'#00f5ff',img:'/ai_project.png',
     desc:'AI engine that transforms any product URL into a production-ready Instagram Reel — end-to-end pipeline: web scraping → LLM script → TTS voiceover → video render.',
     bullets:['Firecrawl scrapes product data (price, offers, ratings, images)','Gemini 1.5 Flash generates ad scripts with structured JSON output','MoviePy renders final 1080×1920 reel with subtitles and Pexels B-roll'],
     tags:['FastAPI','React','Gemini AI','MoviePy','Pexels API','Firecrawl','TTS']},
    {emoji:'🌾',title:'AgriConnect',sub:'RAG-based farmer advisory platform',color:'#00ff88',img:null,
     desc:'RAG-based advisory platform that helps Indian farmers get real-time crop guidance, government scheme info, and weather alerts in regional languages.',
     bullets:['ChromaDB vector search over curated agricultural documents','Gemini synthesis produces localised advisory in Tamil/Hindi/English','Expo mobile app with SMS fallback for low-connectivity regions'],
     tags:['LangChain','FastAPI','Expo','ChromaDB','Gemini','PostgreSQL']},
    {emoji:'🤖',title:'Dance Judging System',sub:'AI and Computer Vision',color:'#ff2d9d',img:null,
     desc:'AI judging platform using MediaPipe (33-keypoint BlazePose) and Librosa beat analysis. Hardware implementation of Daltonization for colour-blind users.',
     bullets:['Consistent 60 FPS performance on 4K video input','Pose estimation precision maintained within <2° angular error','Daltonization color-correction algorithm implemented in hardware','Scores Energy, Musicality, and Coordination in real time'],
     tags:['MediaPipe','OpenCV','Librosa','FastAPI','React','Python']},
    {emoji:'📡',title:'ISP Fault Detection',sub:'Hybrid ML for telecom networks',color:'#ff6b35',img:null,
     desc:'Hybrid ML model combining Temporal Fusion Transformer and LLM for AI-driven anomaly detection on Tamil Nadu ISP telemetry datasets.',
     bullets:['Traverses hierarchical 5-tier telecom topology (NOC-BLOCK-GP-OLT-ONT)','Isolates exact failing segments and their cascade paths','Achieves 93%+ fault detection accuracy on real-world datasets'],
     tags:['TFT','LLM','PyTorch','FastAPI','Network Topology','Telemetry']},
    {emoji:'💨',title:'Wind Prediction',sub:'Power generation forecasting',color:'#febc2e',img:null,
     desc:'Hybrid machine learning model (LSTM + ARIMA + Random Forest) for accurate wind speed and turbine power output forecasting.',
     bullets:['Achieves 93%+ prediction accuracy on real-world datasets','Multi-step ahead forecasting with ARIMA residual correction','Random Forest ensemble for robust outlier handling'],
     tags:['LSTM','ARIMA','Random Forest','Python','NumPy','Scikit-learn']},
  ];
  return(
    <section className="section bg-surface" id="hub" data-section="hub">
      <div className="section-wrap">
        <div className="anim-fade-up">
          <span className="section-badge badge-purple">🚀 Realm 02 — The Founder</span>
          <h2 className="section-title">Innovation <span className="grad-purple">Hub</span></h2>
          <p className="section-sub">Real projects · Scroll horizontally to explore →</p>
        </div>
      </div>
      <div className="projects-scroll">
        {projects.map(p=>(
          <div key={p.title} className="proj-card">
            {p.img
              ? <img src={p.img} alt={p.title} className="proj-img"/>
              : <div className="proj-img-placeholder" style={{background:`linear-gradient(135deg,${p.color}15,${p.color}05)`}}>{p.emoji}</div>
            }
            <div className="proj-header">
              <div className="proj-icon" style={{background:`${p.color}12`,border:`1px solid ${p.color}30`}}>{p.emoji}</div>
              <h3>{p.title}</h3>
              <div className="proj-sub">{p.sub}</div>
              <p>{p.desc}</p>
            </div>
            <div className="proj-body">
              <ul className="proj-bullets">{p.bullets.map(b=><li key={b}>{b}</li>)}</ul>
              <div className="tags">{p.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Analytics ── */
function AnalyticsSection(){
  return(
    <section className="section" id="analytics" data-section="analytics">
      <div className="section-wrap">
        <div className="anim-fade-up">
          <span className="section-badge badge-green">📊 Realm 03 — The Analyst</span>
          <h2 className="section-title">Analytics <span className="grad-green">Playground</span></h2>
          <p className="section-sub">IPL 2023–2024 squad analysis · Data science applied to cricket strategy</p>
        </div>
        <div className="anim-fade-up delay-1"><Analytics/></div>
      </div>
    </section>
  );
}

/* ── Terminal ── */
function TerminalSection(){
  return(
    <section className="section bg-surface" id="terminal" data-section="terminal">
      <div className="section-wrap">
        <div className="anim-fade-up">
          <span className="section-badge badge-orange">💻 Interactive Resume</span>
          <h2 className="section-title">Terminal <span className="grad-cyan">View</span></h2>
          <p className="section-sub">Explore my resume interactively — type commands below</p>
        </div>
        <div className="anim-fade-up delay-1"><Terminal/></div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer(){
  return(
    <footer className="footer">
      <div className="footer-links">
        {[
          {href:'https://github.com/moneshs23',label:'🐙 github.com/moneshs23'},
          {href:'https://linkedin.com/in/monesh-s-362609333',label:'💼 LinkedIn'},
          {href:'https://leetcode.com/u/Monesh2306',label:'🔢 LeetCode'},
          {href:'mailto:moneshs2306@gmail.com',label:'📧 moneshs2306@gmail.com'},
          {href:'tel:9688833107',label:'📱 9688833107'},
        ].map(l=>(
          <a key={l.href} href={l.href} className="footer-link" target="_blank" rel="noreferrer">{l.label}</a>
        ))}
      </div>
      <p>© 2026 Monesh S · B.Tech CS (Data Science) · SRMIST Chennai · Researcher · Founder · Analyst</p>
    </footer>
  );
}

/* ── Dance ── */
function Dance(){
  return(
    <section className="section bg-surface" id="dance" data-section="hero" style={{padding:'4rem 0',borderTop:'1px solid var(--dark-border)'}}>
      <div className="section-wrap" style={{display:'flex',flexWrap:'wrap',gap:'3rem',alignItems:'center'}}>
        <div className="anim-fade-up" style={{flex:'1 1 400px'}}>
          <span className="section-badge badge-purple">🎭 Morig Dance Company</span>
          <h2 className="section-title">Bridging <span className="grad-purple">Art & Tech</span></h2>
          <p style={{color:'var(--text-secondary)',fontSize:'1.05rem',lineHeight:1.7,marginBottom:'1.5rem'}}>
            As the Founder of Morig Dance Company, I explore the intersection of human movement and artificial intelligence. My work involves designing AI systems that can understand, analyze, and grade complex dance choreography with high precision.
          </p>
          <ul style={{listStyle:'none',color:'var(--text-secondary)',fontSize:'0.9rem',lineHeight:1.6}}>
            <li style={{marginBottom:'0.5rem'}}><span style={{color:'var(--purple)'}}>▹</span> <strong>Choreography & Direction</strong> – Creating compelling performances.</li>
            <li style={{marginBottom:'0.5rem'}}><span style={{color:'var(--purple)'}}>▹</span> <strong>AI Integration</strong> – Building the MORIG AI Dance Judging System.</li>
            <li style={{marginBottom:'0.5rem'}}><span style={{color:'var(--purple)'}}>▹</span> <strong>Leadership</strong> – Managing creative teams and logistics.</li>
          </ul>
        </div>
        <div className="anim-fade-up delay-1" style={{flex:'1 1 400px'}}>
          <img src="/dance_studio.png" alt="Dance Performance" style={{width:'100%',borderRadius:'24px',boxShadow:'0 20px 60px rgba(168,85,247,0.15)',border:'1px solid rgba(168,85,247,0.2)'}}/>
        </div>
      </div>
    </section>
  );
}

/* ── Root ── */
export default function App(){
  useFadeIn();
  return(
    <>
      <Cursor/>
      <Nav/>
      <Hero/>
      <About/>
      <Lab/>
      <Experience/>
      <Hub/>
      <Dance/>
      <Footer/>
    </>
  );
}
