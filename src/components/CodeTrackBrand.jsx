export default function CodeTrackBrand({ compact = false }) {
  return (
    <span className={`brand-lockup${compact ? ' brand-lockup--compact' : ''}`} aria-label="CodeTrack">
      <span className="brand-mark" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
      </span>
      <span className="brand-name"><span>Code</span><span>Track</span></span>
    </span>
  )
}
