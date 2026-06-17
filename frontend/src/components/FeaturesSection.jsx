import FeatureCard from "./FeatureCard";

function FeaturesSection() {

  const features = [
    {
      icon: "📚",
      title: "Student Records",
      description: "Organize and manage student data efficiently."
    },
    {
      icon: "📝",
      title: "Assignments",
      description: "Create, track and monitor assignments easily."
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Visualize attendance and academic performance."
    }
  ];

  return (
    <div className="row mt-5">

      {features.map((feature, index) => (
        <div className="col-md-4 mb-3" key={index}>
          <FeatureCard
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        </div>
      ))}

    </div>
  );
}

export default FeaturesSection;