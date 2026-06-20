import {
    FaTasks,
    FaUsers,
    FaChartLine,
    FaClock,
} from "react-icons/fa";

function Features() {
    return (
        <section id="features" className="features-section">
            <div className="container">

                <h2 className="section-title">
                    Why Choose TaskFlow?
                </h2>

                <div className="row g-4">

                    <div className="col-md-3">
                        <div className="feature-card">
                            <FaTasks className="feature-icon" />
                            <h4>Create Tasks</h4>
                            <p>
                                Create and organize tasks easily.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="feature-card">
                            <FaUsers className="feature-icon" />
                            <h4>Assign Tasks</h4>
                            <p>
                                Assign work to team members.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="feature-card">
                            <FaChartLine className="feature-icon" />
                            <h4>Track Progress</h4>
                            <p>
                                Monitor task completion status.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="feature-card">
                            <FaClock className="feature-icon" />
                            <h4>Deadlines</h4>
                            <p>
                                Never miss important due dates.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Features;
