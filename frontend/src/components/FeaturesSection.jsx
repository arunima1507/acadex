import FeatureCard from "./FeatureCard";

function FeaturesSection() {
  return (
    <div className="row mt-5">

      <div className="col-md-4 mb-3">
        <FeatureCard
          icon="📚"
          title="Student Records"
          description="Organize and manage student data efficiently."
        />
      </div>

      <div className="col-md-4 mb-3">
        <FeatureCard
          icon="📝"
          title="Assignments"
          description="Create, track and monitor assignments easily."
        />
      </div>

      <div className="col-md-4 mb-3">
        <FeatureCard
          icon="📊"
          title="Analytics"
          description="Visualize attendance and academic performance."
        />
      </div>

    </div>
  );
}

export default FeaturesSection;