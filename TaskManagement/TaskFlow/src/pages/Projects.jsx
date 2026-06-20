import Sidebar from "../components/Sidebar";
import { FaFolderOpen, FaTools } from "react-icons/fa";

function Projects() {
  return (
    <div style={page}>
      <Sidebar />

      <div style={content}>
        <h1 style={heading}>Projects</h1>
        <p style={subheading}>Track and organize your projects in one place.</p>

        <div style={emptyState}>
          <div style={iconWrap}>
            <FaFolderOpen size={28} />
          </div>

          <h2 style={emptyTitle}>Projects are coming soon</h2>

          <p style={emptyText}>
            The Projects feature is being built out. For now, you can
            organize your work using Tasks from the sidebar.
          </p>

          <div style={badge}>
            <FaTools size={12} />
            In development
          </div>
        </div>
      </div>
    </div>
  );
}

// Light theme workspace canvas configuration
const page = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#F8FAFC", // Clean light-mode layout canvas
  fontFamily: "Inter, system-ui, sans-serif",
};

const content = {
  flex: 1,
  padding: "40px 48px",
  backgroundColor: "#F8FAFC", // Matches page canvas container directly
  overflowY: "auto",
};

const heading = {
  margin: 0,
  fontSize: "1.85rem",
  fontWeight: "800",
  letterSpacing: "-0.025em",
  backgroundImage: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)", // Matching purple text gradient
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subheading = {
  marginTop: "8px",
  color: "#64748B", // Clean secondary text readability
  fontSize: "0.95rem",
  marginBottom: "40px",
};

const emptyState = {
  backgroundColor: "#FFFFFF", // Elevated pure white tile panel component
  border: "1px solid #E2E8F0", // Clean outer layout frame stroke
  borderRadius: "24px",
  padding: "64px 32px",
  textAlign: "center",
  maxWidth: "460px",
  margin: "40px auto 0",
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.03), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
};

const iconWrap = {
  width: "64px",
  height: "64px",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)", // Matching accent theme tone gradient
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  boxShadow: "0 8px 16px rgba(104, 74, 226, 0.15)",
};

const emptyTitle = {
  color: "#0F172A", // Dark charcoal visibility tone
  fontSize: "1.3rem",
  fontWeight: "700",
  margin: "0 0 12px",
};

const emptyText = {
  color: "#64748B",
  fontSize: "0.9rem",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const badge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "rgba(245, 158, 11, 0.08)", // Softer orange fill highlight
  color: "#D97706", // Lighter legible text tone for bright screens
  padding: "8px 18px",
  borderRadius: "12px",
  fontSize: "0.8rem",
  fontWeight: "700",
};

export default Projects;
