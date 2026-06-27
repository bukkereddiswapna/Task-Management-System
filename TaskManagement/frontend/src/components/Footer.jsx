import { FaTasks } from "react-icons/fa";

function Footer() {
    return (
        <footer style={footerStyle}>
            <div className="container">

                <div className="text-center mb-5">
                    <h3 style={brandStyle}>
                        {/* FIXED: Changed icon color hex code from purple back to pure crisp white */}
                        <FaTasks style={{ marginRight: "10px", color: "#FFFFFF" }} />
                        TaskFlow
                    </h3>

                    <p style={descriptionStyle}>
                        TaskFlow is a modern task management platform developed
                        by our team as a college project. It helps users create,
                        organize, assign, and track tasks efficiently while
                        improving collaboration and productivity.
                    </p>
                </div>

                <hr style={dividerStyle} />

                <div className="text-center" style={{ paddingTop: "12px" }}>
                    <p style={teamTextStyle}>
                        Developed with ❤️ by Team TaskFlow
                    </p>

                    <p style={copyrightTextStyle}>
                        © 2026 TaskFlow | College Project
                    </p>
                </div>

            </div>
        </footer>
    );
}

const footerStyle = {
    background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
    borderTop: "1px solid #EAE6F6",
    padding: "60px 0 30px 0",
    boxSizing: "border-box"
};

const brandStyle = {
    color: "white",
    fontSize: "1.6rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    letterSpacing: "-0.02em"
};

const descriptionStyle = {
    maxWidth: "640px",
    margin: "0 auto",
    color: "#ffffff",
    fontSize: "0.95rem",
    lineHeight: "1.8",
    fontWeight: "400"
};

const dividerStyle = {
    border: "none",
    borderTop: "1px solid #ffffff",
    margin: "0"
};

const teamTextStyle = {
    margin: "0 0 6px 0",
    color: "#ffffff",
    fontSize: "0.95rem",
    fontWeight: "600"
};

const copyrightTextStyle = {
    margin: "0",
    color: "#ffffff",
    fontSize: "0.88rem",
    fontWeight: "500"
};

export default Footer;
