import "./App.css";

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
            <div className="feature-card p-4 h-100">
              <div className="feature-icon">📚</div>
              <h4>Student Records</h4>
              <p>
                Organize and manage student data efficiently.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="feature-card p-4 h-100">
              <div className="feature-icon">📝</div>
              <h4>Assignments</h4>
              <p>
                Create, track and monitor assignments easily.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="feature-card p-4 h-100">
              <div className="feature-icon">📊</div>
              <h4>Analytics</h4>
              <p>
                Visualize attendance and academic performance.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;