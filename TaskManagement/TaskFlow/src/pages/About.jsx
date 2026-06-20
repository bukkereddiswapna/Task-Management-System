function About() {
    return (
        <section id="about" style={aboutSection}>
            <div className="container">

                <div className="text-center mb-5">
                    <h2 style={titleStyle}>
                        About TaskFlow
                    </h2>

                    <p style={descriptionStyle}>
                        TaskFlow is a modern task management platform designed
                        to help individuals and teams stay organized, improve
                        productivity, and achieve goals efficiently. From
                        creating tasks and assigning responsibilities to
                        tracking progress and managing deadlines, TaskFlow
                        provides everything needed to streamline daily work.
                    </p>
                </div>

                <div className="row text-center">

                    <div className="col-md-4 mb-4">
                        <div style={aboutCard}>
                            <div style={iconBadge}>🚀</div>
                            <h4 style={cardTitle}>Increase Productivity</h4>
                            <p style={cardBody}>
                                Stay focused and manage tasks efficiently
                                with an easy-to-use interface.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div style={aboutCard}>
                            <div style={iconBadge}>👥</div>
                            <h4 style={cardTitle}>Team Collaboration</h4>
                            <p style={cardBody}>
                                Assign tasks, monitor progress, and work
                                together seamlessly with your team members.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div style={aboutCard}>
                            <div style={iconBadge}>📈</div>
                            <h4 style={cardTitle}>Track Progress</h4>
                            <p style={cardBody}>
                                Keep track of pending, ongoing, and completed
                                tasks to ensure projects are delivered on time.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

// ================= THEME STYLES (Clean Light Layout) =================

const aboutSection = {
    background: "#FAF8FF",
    padding: "80px 0",
    boxSizing: "border-box"
};

const titleStyle = {
    color: "#1C1B24",
    fontSize: "2.6rem",
    fontWeight: "700",
    marginBottom: "24px",
    letterSpacing: "-0.02em"
};

const descriptionStyle = {
    maxWidth: "760px",
    margin: "0 auto",
    color: "#7A768F",
    fontSize: "1.05rem",
    lineHeight: "1.8",
    fontWeight: "400"
};

const aboutCard = {
    background: "#FFFFFF",
    border: "1px solid #EAE6F6",
    padding: "36px 28px",
    borderRadius: "20px",
    boxShadow: "0 10px 35px rgba(28, 27, 36, 0.03)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box"
};

const iconBadge = {
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    background: "rgba(104, 74, 226, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    marginBottom: "20px"
};

const cardTitle = {
    color: "#1C1B24",
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "12px",
    letterSpacing: "-0.01em"
};

const cardBody = {
    margin: "0",
    color: "#7A768F",
    fontSize: "0.95rem",
    lineHeight: "1.6"
};

export default About;
