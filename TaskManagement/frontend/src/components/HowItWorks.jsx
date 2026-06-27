import {
    FaUserPlus,
    FaSignInAlt,
    FaTasks,
    FaChartLine,
} from "react-icons/fa";

function HowItWorks() {
    const steps = [
        {
            icon: <FaUserPlus />,
            title: "Register",
            desc: "Create your account to get started.",
        },
        {
            icon: <FaSignInAlt />,
            title: "Login",
            desc: "Access your personalized dashboard.",
        },
        {
            icon: <FaTasks />,
            title: "Create Tasks",
            desc: "Add tasks and assign deadlines.",
        },
        {
            icon: <FaChartLine />,
            title: "Track Progress",
            desc: "Monitor completion and status.",
        },
    ];

    return (
        <section id="how-it-works" className="how-section">
            <div className="container">

                <h2 className="section-title">
                    How It Works
                </h2>

                <div className="row g-4">

                    {steps.map((step, index) => (
                        <div className="col-md-3" key={index}>
                            <div className="step-card">
                                {/* FIXED ICON WRAPPER COLOR AND VISUALS */}
                                <div 
                                    className="d-flex align-items-center justify-content-center mx-auto mb-4"
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        borderRadius: "50%",
                                        background: "rgba(104, 74, 226, 0.12)", /* Slightly deeper dashboard theme opacity */
                                        color: "#684AE2", /* Exact same brand purple color hex as features */
                                        fontSize: "1.6rem"
                                    }}
                                >
                                    {step.icon}
                                </div>

                                <h4 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "12px", color: "#1C1B24" }}>
                                    {step.title}
                                </h4>

                                <p>
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section >
    );
}

export default HowItWorks;
