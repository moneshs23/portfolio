import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const batting2024 = [
  { player: 'Virat', runs: 661, avg: 41.3, sr: 154.2, color: '#00f5ff' },
  { player: 'Warner', runs: 214, avg: 17.8, sr: 152.1, color: '#a855f7' },
  { player: 'Dhoni', runs: 161, avg: 53.7, sr: 220.5, color: '#ff2d9d' },
  { player: 'Hardik', runs: 216, avg: 24.0, sr: 146.9, color: '#ff6b35' },
  { player: 'KL Rahul', runs: 520, avg: 37.1, sr: 136.5, color: '#00ff88' },
  { player: 'Shubman', runs: 426, avg: 30.4, sr: 144.4, color: '#febc2e' },
];

const bowling2024 = [
  { player: 'Bumrah', wkts: 15, eco: 6.72 },
  { player: 'Chahal', wkts: 13, eco: 8.80 },
  { player: 'Rashid', wkts: 14, eco: 7.64 },
  { player: 'Shami', wkts: 17, eco: 8.30 },
  { player: 'Nortje', wkts: 12, eco: 8.95 },
  { player: 'Siraj', wkts: 11, eco: 9.41 },
];

const squad2023 = [
  { subject: 'Batting', A: 85, fullMark: 100 },
  { subject: 'Bowling', A: 78, fullMark: 100 },
  { subject: 'Fielding', A: 82, fullMark: 100 },
  { subject: 'Powerplay', A: 76, fullMark: 100 },
  { subject: 'Death Overs', A: 88, fullMark: 100 },
  { subject: 'Spin', A: 91, fullMark: 100 },
];

const tooltipStyle = {
  contentStyle: { background: '#0d0d22', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '10px', color: '#fff', fontSize: '0.8rem' },
  labelStyle: { color: '#00f5ff', fontWeight: 700 },
};

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;
  return <rect x={x} y={y} width={width} height={height} fill={fill || '#00f5ff'} rx={4} opacity={0.85} />;
};

export default function Analytics() {
  const [tab, setTab] = useState('batting');

  return (
    <div>
      <div className="stats-row">
        {[
          { val: '2', lbl: 'Seasons Analysed', color: '#00f5ff' },
          { val: '10', lbl: 'Teams Tracked', color: '#a855f7' },
          { val: '661', lbl: 'Virat\'s Top Runs', color: '#ff2d9d' },
          { val: '93%+', lbl: 'Model Accuracy', color: '#00ff88' },
          { val: '17', lbl: 'Shami\'s Wickets', color: '#ff6b35' },
          { val: 'IPL', lbl: '2023 & 2024', color: '#febc2e' },
        ].map(s => (
          <div className="stat-card" key={s.lbl}>
            <div className="stat-val" style={{ color: s.color }}>{s.val}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="chart-wrap">
        <div className="chart-tabs">
          {['batting', 'bowling', 'squad-radar'].map(t => (
            <button key={t} className={`ctab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'batting' ? '🏏 Batting Stats 2024' : t === 'bowling' ? '🎳 Bowling Stats 2024' : '📊 Squad Radar 2023'}
            </button>
          ))}
        </div>

        {tab === 'batting' && (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              # IPL 2024 — Top Batters Run Tally
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={batting2024} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="player" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="runs" shape={<CustomBar />} fill="#00f5ff" />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
              {batting2024.map(p => (
                <div key={p.player} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '0.75rem', border: `1px solid ${p.color}30` }}>
                  <p style={{ color: p.color, fontWeight: 700, fontSize: '0.85rem' }}>{p.player}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', marginTop: '0.2rem' }}>Avg: {p.avg} | SR: {p.sr}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'bowling' && (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              # IPL 2024 — Wickets & Economy Comparison
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bowling2024} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="player" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="wkts" fill="#a855f7" radius={[4,4,0,0]} name="Wickets" />
                <Bar dataKey="eco" fill="#ff2d9d" radius={[4,4,0,0]} name="Economy" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === 'squad-radar' && (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              # IPL 2023 — Ideal Squad Composition Analysis
            </p>
            <ResponsiveContainer width="100%" height={340}>
              <RadarChart data={squad2023}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" fontSize={10} />
                <Radar name="Squad" dataKey="A" stroke="#00f5ff" fill="#00f5ff" fillOpacity={0.15} />
                <Tooltip {...tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
