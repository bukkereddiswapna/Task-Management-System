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

                <div className="row text-center" style={rowLayout}>

                    <div className="col-md-4 mb-4" style={columnWidth}>
                        <div style={aboutCard}>
                            <div style={iconBadge}>🚀</div>
                            <h4 style={cardTitle}>Increase Productivity</h4>
                            <p style={cardBody}>
                                Stay focused and manage tasks efficiently
                                with an easy-to-use interface.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4" style={columnWidth}>
                        <div style={aboutCard}>
                            <div style={iconBadge}>👥</div>
                            <h4 style={cardTitle}>Team Collaboration</h4>
                            <p style={cardBody}>
                                Assign tasks, monitor progress, and work
                                together seamlessly with your team members.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4" style={columnWidth}>
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

const aboutSection = {
    background: "#F8FAFC", 
    padding: "80px 0",
    boxSizing: "border-box"
};

const titleStyle = {
    fontSize: "2.6rem",
    fontWeight: "800",
    marginTop:"-100px",
    marginBottom: "24px",
    letterSpacing: "-0.02em",
    display: "inline-block",
    backgroundImage: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
};

const descriptionStyle = {
    maxWidth: "760px",
    margin: "0 auto",
    color: "#64748B",
    fontSize: "1.05rem",
    lineHeight: "1.8",
    fontWeight: "400"
};

const rowLayout = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0px"
};

const columnWidth = {
    flex: "0 0 33.333%",
    maxWidth: "33.333%",
    boxSizing: "border-box"
};

const aboutCard = {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0", 
    padding: "36px 28px",
    borderRadius: "24px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 10px 15px -3px rgba(0, 0, 0, 0.03)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box"
};

const iconBadge = {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "rgba(104, 74, 226, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    marginBottom: "20px"
};

const cardTitle = {
    color: "#0F172A",
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "12px",
    letterSpacing: "-0.01em"
};

const cardBody = {
    margin: "0",
    color: "#64748B",
    fontSize: "0.95rem",
    lineHeight: "1.6"
};

export default About;
