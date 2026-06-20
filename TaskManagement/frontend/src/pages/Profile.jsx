import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/authService";
import axios from "axios"; // Added to fetch task metrics dynamically
import Sidebar from "../components/Sidebar";

function Profile() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    createdAt: "",
  });

  // Productivity metrics state hooks
  const [metrics, setMetrics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchTaskMetrics();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser({
        fullname: data.fullname || "",
        email: data.email || "",
        createdAt: data.createdAt || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Pulls live data to dynamically populate your profile metrics layout card
  const fetchTaskMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data: tasks } = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const total = tasks.length;
      const completed = tasks.filter((t) => t.status === "Completed").length;
      const pending = tasks.filter((t) => t.status === "Pending").length;

      setMetrics({ totalTasks: total, completedTasks: completed, pendingTasks: pending });
    } catch (error) {
      console.log("Failed to fetch task statistics metrics:", error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await updateProfile({
        fullname: user.fullname,
        email: user.email,
      });

      setUser((prev) => ({
        ...prev,
        ...updated,
      }));

      // Updates global user identity mapping to sync header card avatars instantly
      localStorage.setItem("user", JSON.stringify({
        ...JSON.parse(localStorage.getItem("user")),
        fullname: user.fullname,
        email: user.email
      }));

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={loader}>Loading Workspace Engine...</div>;

  const initialLetter = user.fullname ? user.fullname.charAt(0).toUpperCase() : "U";
  const completionPercentage = metrics.totalTasks > 0 ? Math.round((metrics.completedTasks / metrics.totalTasks) * 100) : 0;

  return (
    <div style={page}>
      <Sidebar />

      <main style={content}>
        {/* Modern Clean Header Panel Block Container */}
        <div style={headerCard}>
          <div style={avatar}>{initialLetter}</div>

          <div style={{ flex: 1 }}>
            <h1 style={name}>{user.fullname || "User Workspace"}</h1>
            <p style={email}>{user.email}</p>
            <span style={badge}>
              Workspace Member since {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* 3-Column Performance Metric Cards Grid Layout */}
        <div style={metricsGrid}>
          <div style={metricCard}>
            <span style={metricIcon}>🏆</span>
            <div>
              <h3 style={metricValue}>{metrics.completedTasks}</h3>
              <p style={metricLabel}>Tasks Completed</p>
            </div>
          </div>
          <div style={metricCard}>
            <span style={metricIcon}>⚡</span>
            <div>
              <h3 style={metricValue}>{completionPercentage}%</h3>
              <p style={metricLabel}>Efficiency Rating</p>
            </div>
          </div>
          <div style={metricCard}>
            <span style={metricIcon}>⏳</span>
            <div>
              <h3 style={metricValue}>{metrics.pendingTasks}</h3>
              <p style={metricLabel}>Pending Action Items</p>
            </div>
          </div>
        </div>

        <div style={grid}>
          {/* Main Action Form Configuration Card Block */}
          <div style={card}>
            <h2 style={sectionTitle}>Personal Details</h2>

            <form onSubmit={handleSubmit}>
              <div style={field}>
                <label style={label}>Full Name</label>
                <input
                  style={input}
                  type="text"
                  name="fullname"
                  value={user.fullname}
                  onChange={handleChange}
                />
              </div>

              <div style={field}>
                <label style={label}>Email Address</label>
                <input
                  style={input}
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" disabled={saving} style={button}>
                {saving ? "Saving Production Changes..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Metadata Analytics System Overview Card Block */}
          <div style={card}>
            <h2 style={sectionTitle}>System Summary</h2>

            <div style={infoItem}>
              <span style={infoLabel}>Status</span>
              <span style={active}>Active Manager</span>
            </div>

            <div style={infoItem}>
              <span style={infoLabel}>Developer ID</span>
              <span style={infoValue}>
                {localStorage.getItem("user")
                  ? JSON.parse(localStorage.getItem("user"))._id?.slice(-8).toUpperCase()
                  : "-"}
              </span>
            </div>

            <div style={infoItem}>
              <span style={infoLabel}>Total Registered</span>
              <span style={infoValue}>{metrics.totalTasks} Tasks</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Complete Light Mode Redesign Style Tokens Sheet
const page = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#F8FAFC", // Off-white/slate canvas backdrop matching Tasks page layout
  fontFamily: "Inter, system-ui, sans-serif",
};

const content = {
  flex: 1,
  padding: "40px 48px",
  overflowY: "auto",
};

const headerCard = {
  display: "flex",
  alignItems: "center",
  gap: "28px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "24px",
  padding: "32px",
  marginBottom: "24px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 10px 15px -3px rgba(0, 0, 0, 0.03)",
};

const avatar = {
  width: "90px",
  height: "90px",
  borderRadius: "20px", // Rounded block avatar to match clean button radiuses
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)", // Pure design purple theme gradient match
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "36px",
  fontWeight: "800",
  color: "#FFFFFF",
  boxShadow: "0 8px 16px rgba(104, 74, 226, 0.2)",
};

const name = {
  color: "#0F172A",
  margin: 0,
  fontSize: "1.65rem",
  fontWeight: "800",
  letterSpacing: "-0.025em",
};

const email = {
  color: "#64748B",
  margin: "6px 0 0 0",
  fontSize: "0.95rem",
};

const badge = {
  display: "inline-block",
  marginTop: "14px",
  padding: "6px 14px",
  borderRadius: "10px",
  backgroundColor: "rgba(104, 74, 226, 0.06)", // Soft purple accent badge framing tint
  color: "#684AE2",
  fontSize: "0.85rem",
  fontWeight: "600",
};

const metricsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "24px",
};

const metricCard = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "20px",
  padding: "20px 24px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.01)",
};

const metricIcon = {
  fontSize: "1.75rem",
  backgroundColor: "#F8FAFC",
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
};

const metricValue = {
  margin: 0,
  fontSize: "1.5rem",
  fontWeight: "800",
  color: "#0F172A",
};

const metricLabel = {
  margin: 0,
  fontSize: "0.85rem",
  color: "#64748B",
  fontWeight: "500",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
};

const card = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.02)",
};

const sectionTitle = {
  marginTop: 0,
  marginBottom: "24px",
  color: "#0F172A",
  fontSize: "1.2rem",
  fontWeight: "700",
};

const field = {
  marginBottom: "20px",
};

const label = {
  display: "block",
  marginBottom: "8px",
  color: "#64748B",
  fontWeight: "600",
  fontSize: "0.85rem",
};

const input = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #E2E8F0",
  backgroundColor: "#F8FAFC", // Off-white field style backdrop match
  fontSize: "0.9rem",
  color: "#0F172A",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease",
};

const button = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)", // High-fidelity purple theme link button
  color: "#FFFFFF",
  fontWeight: "600",
  fontSize: "0.95rem",
  cursor: "pointer",
  marginTop: "12px",
  boxShadow: "0 4px 12px rgba(104, 74, 226, 0.15)",
};

const infoItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 0",
  borderBottom: "1px solid #F1F5F9",
};

const infoLabel = {
  color: "#64748B",
  fontSize: "0.9rem",
  fontWeight: "500",
};

const infoValue = {
  color: "#0F172A",
  fontWeight: "600",
  fontSize: "0.9rem",
};

const active = {
  color: "#16A34A",
  fontWeight: "700",
  fontSize: "0.85rem",
  backgroundColor: "rgba(22, 163, 74, 0.08)",
  padding: "4px 10px",
  borderRadius: "8px",
};

const loader = {
  minHeight: "100vh",
  backgroundColor: "#F8FAFC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  fontWeight: "600",
  color: "#64748B",
};

export default Profile;
