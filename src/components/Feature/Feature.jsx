export default function Feature({ src, alt, h3, p }) {
  return (
    <div className="feature-item">
      <img
        src={src}
        alt={alt}
        className="feature-icon"
      />
      <h3 className="feature-item-title">{h3}</h3>
      <p>{p}</p>
    </div>
  );
}
