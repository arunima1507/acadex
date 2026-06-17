import "./App.css";
import FeatureCard from "./components/FeatureCard";

function App() {
  return (
    <div className="hero">
      <div className="container text-center">

        <h1 className="hero-title">
          Acadex
        </h1>

        <p className="hero-subtitle">
          Academic Management Portal
        </p>

        <p className="hero-text">
          A smarter way to manage students,
          attendance, assignments and academic
          performance from a single platform.
        </p>

        <div className="mt-4">
          <button className="btn accent-btn btn-lg me-3">
            Get Started
          </button>

          <button className="btn btn-outline-dark btn-lg">
            Learn More
          </button>
        </div>

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

      </div>
    </div>
  );
}

export default App;