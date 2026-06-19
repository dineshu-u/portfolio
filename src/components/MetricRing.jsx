export default function MetricRing({ label, value, max, className = '' }) {
  const safeMax = Math.max(Number(max) || 1, 1);
  const percentage = Math.min(100, Math.round((Number(value || 0) / safeMax) * 100));

  return (
    <div className={`metric-ring ${className}`} style={{ '--progress': `${percentage}%` }}>
      <div className="ring-value">{value}</div>
      <div className="ring-label">{label}</div>
    </div>
  );
}
