export default function Feature({ src, alt, h3, p }) {
  return (
    <div class="feature-item">
      <img
        src={src}
        alt={alt}
        class="feature-icon"
      />
      <h3 class="feature-item-title">{h3}</h3>
      <p>{p}</p>
    </div>
  );
}
