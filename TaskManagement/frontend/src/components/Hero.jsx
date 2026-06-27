import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import hero2 from "../assets/hero2.png";
import "../styles/Hero.css";

function Hero() {
    const navigate = useNavigate();

    const handleScrollToAbout = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="hero-section" style={sectionLayout}>
            <div className="container">
                <div className="row align-items-center" style={rowLayout}>

                    {/* LEFT CONTENT COLUMN */}
                    <div className="col-lg-6 hero-left-col">
                        <span className="badge mb-3">Smart Task Management</span>

                        <h1 className="fw-bold mb-4" style={headingStyle}>
                            Manage Tasks
                            <br />
                            With Confidence
                        </h1>

                        <p className="mb-4" style={paragraphStyle}>
                            Plan, organize and track your work efficiently.
                            Collaborate with team members and meet deadlines
                            using one centralized platform.
                        </p>

                        <div className="mb-5" style={buttonGroup}>
                            <button className="btn btn-primary" onClick={() => navigate("/login")}>
                                Get Started
                            </button>
                            <button className="btn btn-outline" onClick={handleScrollToAbout}>
                                Learn More
                            </button>
                        </div>

                        <div style={featuresList}>
                            <p className="mb-0" style={featureItem}><FaCheckCircle style={iconStyle} /> Create Tasks</p>
                            <p className="mb-0" style={featureItem}><FaCheckCircle style={iconStyle} /> Assign Team Members</p>
                            <p className="mb-0" style={featureItem}><FaCheckCircle style={iconStyle} /> Track Progress</p>
                            <p className="mb-0" style={featureItem}><FaCheckCircle style={iconStyle} /> Manage Deadlines</p>
                        </div>
                    </div>

                    {/* RIGHT PREVIEW COLUMN */}
                    <div className="col-lg-6 hero-right-col">
                        <div className="hero-image-card">
                            <img
                                src={hero2}
                                alt="Taskmaster App Dashboard Mockup Preview"
                                className="hero-image"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// Non-responsive inline styles are fine to leave as-is
const sectionLayout = { minHeight: "85vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "60px 0" };
const rowLayout = { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%" };
const headingStyle = { fontSize: "3.5rem", lineHeight: "1.2", color: "#0F172A" };
const paragraphStyle = { fontSize: "1.15rem", lineHeight: "1.6", color: "#64748B" };
const buttonGroup = { display: "flex", gap: "16px" };
const featuresList = { display: "flex", flexDirection: "column", gap: "12px" };
const featureItem = { fontWeight: "500", display: "flex", alignItems: "center", gap: "8px", color: "#334155" };
const iconStyle = { color: "#684AE2", fontSize: "1.1rem" };

export default Hero;