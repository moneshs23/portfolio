import { useEffect, useRef, useState } from 'react';

const SKILLS = [
  { name: 'Python', color: '#00f5ff', projects: ['QML Research', 'Wind Prediction', 'Dance Judging AI', 'ISP Anomaly Detection'] },
  { name: 'FastAPI', color: '#00ff88', projects: ['ADVision AI', 'AgriConnect', 'MORIG Backend'] },
  { name: 'Next.js', color: '#a855f7', projects: ['Portfolio', 'MDC Website', 'AgriConnect UI'] },
  { name: 'React', color: '#61dafb', projects: ['ADVision Frontend', 'DigitalKhata', 'Analytics Dashboard'] },
  { name: 'TensorFlow', color: '#ff6b35', projects: ['Dance Judging AI', 'Wind Prediction LSTM', 'QML Models'] },
  { name: 'PyTorch', color: '#ee4c2c', projects: ['Deep Learning Research', 'ISP Fault Detection'] },
  { name: 'Expo', color: '#ffffff', projects: ['AgriConnect Mobile', 'MDC App'] },
  { name: 'SQL', color: '#00d4ff', projects: ['DigitalKhata', 'IPL Analytics', 'AgriConnect DB'] },
  { name: 'Docker', color: '#2496ed', projects: ['ADVision Deployment', 'API Containerization'] },
  { name: 'OpenCV', color: '#5c3ee8', projects: ['Dance Judging AI', 'Color Blind Algorithm'] },
  { name: 'LangChain', color: '#1c7c54', projects: ['AgriConnect RAG', 'ADVision LLM Pipeline'] },
  { name: 'QML', color: '#ff2d9d', projects: ['Quantum Circuit Research', 'SRMIST Thesis'] },
  { name: 'C#', color: '#9b4993', projects: ['Compiler Design', 'SEPM Projects'] },
  { name: 'MediaPipe', color: '#00e5ff', projects: ['Dance Judging AI', 'Pose Estimation'] },
];

const POSITIONS = [
  { x: '50%', y: '50%' },
  { x: '20%', y: '20%' }, { x: '80%', y: '20%' },
  { x: '10%', y: '50%' }, { x: '90%', y: '50%' },
  { x: '20%', y: '80%' }, { x: '80%', y: '80%' },
  { x: '50%', y: '12%' }, { x: '50%', y: '88%' },
  { x: '35%', y: '35%' }, { x: '65%', y: '35%' },
  { x: '35%', y: '65%' }, { x: '65%', y: '65%' },
  { x: '50%', y: '50%' },
];

export default function SkillCloud() {
  const [hovered, setHovered] = useState(null);
  const [offsets, setOffsets] = useState(() =>
    SKILLS.map((_, i) => ({ dx: Math.sin(i * 1.3) * 30, dy: Math.cos(i * 1.3) * 30 }))
  );

  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.008;
      setOffsets(SKILLS.map((_, i) => ({
        dx: Math.sin(t + i * 0.8) * 28,
        dy: Math.cos(t * 1.2 + i * 0.6) * 22,
      })));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="skill-cloud">
      {SKILLS.map((skill, i) => {
        const pos = POSITIONS[i % POSITIONS.length];
        const off = offsets[i];
        return (
          <div
            key={skill.name}
            className="skill-tag"
            style={{
              left: pos.x, top: pos.y,
              transform: `translate(calc(-50% + ${off.dx}px), calc(-50% + ${off.dy}px))`,
              color: skill.color, borderColor: skill.color,
              background: `${skill.color}11`,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {skill.name}
            {hovered === i && (
              <div style={{
                position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)',
                background: '#0d0d22', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', padding: '0.9rem', minWidth: '210px', zIndex: 100,
                boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${skill.color}22`,
              }}>
                <p style={{ fontSize: '0.7rem', color: skill.color, fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Used in
                </p>
                {skill.projects.map(p => (
                  <p key={p} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', margin: '0.2rem 0' }}>▹ {p}</p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
