function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card p-4 h-100">
      <div className="feature-icon">{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;