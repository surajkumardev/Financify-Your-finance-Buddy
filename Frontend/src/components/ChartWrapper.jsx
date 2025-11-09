import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
export default function ChartWrapper({ type = 'bar', data, options = {}, className }) {
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // If an old chart exists on this canvas, destroy it first
    try {
      const existing = Chart.getChart(canvas);
      if (existing) existing.destroy();
    } catch (e) {
      // ignore
    }

    // create a new chart instance
    try {
      instanceRef.current = new Chart(canvas, { type, data, options });
    } catch (err) {
      console.error('Failed to create chart', err);
    }

    return () => {
      try { if (instanceRef.current) instanceRef.current.destroy(); } catch {}
      instanceRef.current = null;
    };
  }, [type, data, options]);

  return <canvas ref={canvasRef} className={className} />;
}
// import { useEffect, useRef } from 'react';
// import { Chart, registerables } from 'chart.js';

// // register all needed chart.js elements once
// Chart.register(...registerables);

// export default function ChartWrapper({ type = 'bar', data, options = {}, className }) {
//   const canvasRef = useRef(null);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     // If Chart.js has an instance attached to this canvas already, destroy it
//     try {
//       const existing = Chart.getChart(canvas);
//       if (existing) existing.destroy();
//     } catch (e) {
//       // ignore
//     }

//     // Defensive: ensure incoming data has numbers, not strings
//     const safeData = data && {
//       ...data,
//       datasets: (data.datasets || []).map(ds => ({
//         ...ds,
//         data: (ds.data || []).map(v => (typeof v === 'string' ? Number(v) : v)),
//       })),
//     };

//     try {
//       chartRef.current = new Chart(canvas, {
//         type,
//         data: safeData,
//         options: options || {},
//       });
//     } catch (err) {
//       console.error('Chart creation failed:', err);
//     }

//     return () => {
//       try {
//         if (chartRef.current) {
//           chartRef.current.destroy();
//         }
//       } catch (err) {
//         // ignore
//       } finally {
//         chartRef.current = null;
//       }
//     };
//     // Intentionally use JSON stringified values to trigger effect only when content changes
//   }, [type, JSON.stringify(data), JSON.stringify(options)]);

//   return <canvas ref={canvasRef} className={className} />;
// }

