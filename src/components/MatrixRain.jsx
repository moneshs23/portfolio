import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cols = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ψφΩΔΣΠλμ∇∂∑∫≈≡QMLSTM';

    const draw = () => {
      ctx.fillStyle = 'rgba(0,5,16,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();
        ctx.fillStyle = brightness > 0.95
          ? '#ffffff'
          : brightness > 0.7
          ? '#00f5ff'
          : 'rgba(0,180,200,0.6)';
        ctx.font = `${Math.random() > 0.8 ? 'bold ' : ''}13px JetBrains Mono, monospace`;
        ctx.fillText(char, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    />
  );
}
