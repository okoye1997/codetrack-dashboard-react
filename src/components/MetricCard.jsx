export default function MetricCard({ icon: Icon, label, value, unit, note, tone }) {
  return (
    <article className="metric-card">
      <div className="metric-label"><Icon className={`metric-icon metric-icon--${tone}`} size={19} aria-hidden="true" /><span>{label}</span></div>
      <div className="metric-value">{value}{unit && <span className={`metric-unit metric-unit--${tone}`}>{unit}</span>}</div>
      <p>{note}</p>
    </article>
  )
}
