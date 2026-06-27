import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaFolderOpen, FaPlus, FaTimes, FaCalendarAlt, FaBriefcase, FaTrash } from "react-icons/fa";

function Projects() {
  // ----------------------------------------------------
  // 1. STATE MANAGEMENT
  // ----------------------------------------------------
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    targetDueDate: "" 
  });

  // ----------------------------------------------------
  // 2. LIFECYCLE LIFTS
  // ----------------------------------------------------
  useEffect(() => {
    fetchProjects();
  }, []);

  // ----------------------------------------------------
  // 3. API CONTROLLER ACTIONS
  // ----------------------------------------------------
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const { data } = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      // FIXED: Maps your state key (targetDueDate) to the key your backend destructures (dueDate)
      const payload = {
        title: newProject.title,
        description: newProject.description,
        dueDate: newProject.targetDueDate 
      };

      await axios.post("http://localhost:5000/api/projects", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewProject({ title: "", description: "", targetDueDate: "" });
      setShowModal(false);
      await fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert(error.response?.data?.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(error.response?.data?.message || "Failed to delete project");
    }
  };

  // ----------------------------------------------------
  // 4. VIEW RENDER ENGINE
  // ----------------------------------------------------
  return (
    <div style={page}>
      <Sidebar />

      <div style={content}>
        {/* Main Section Header Row */}
        <div style={headerRow}>
          <div>
            <h1 style={heading}>Projects</h1>
            <p style={subheading}>Track and organize your projects in one place.</p>
          </div>
          
          <button onClick={() => setShowModal(true)} style={addBtn}>
            <FaPlus size={11} />
            Create Project
          </button>
        </div>

        {/* Dynamic Card Dashboard Matrix */}
        {loading ? (
          <p style={emptyText}>Loading projects...</p>
        ) : projects.length > 0 ? (
          <div style={projectGrid}>
            {projects.map((project) => (
              <div key={project._id} style={projectCard}>
                <div style={cardHeader}>
                  <div style={iconBox}>
                    <FaBriefcase size={16} />
                  </div>
                  <h3 style={cardTitle}>{project.title}</h3>
                  <button 
                    onClick={() => handleDeleteProject(project._id)} 
                    style={deleteBtn}
                    title="Delete Project"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
                <p style={cardDesc}>{project.description}</p>
                <div style={cardFooter}>
                  <span style={dueDate}>
                    <FaCalendarAlt size={12} />
                    {/* Synchronized: Fallback chains reading targetDueDate or dueDate fields securely */}
                    {project.targetDueDate || project.dueDate ? (
                      new Date(project.targetDueDate || project.dueDate).toLocaleDateString()
                    ) : (
                      "No due date"
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Application State View */
          <div style={emptyState}>
            <div style={iconWrap}>
              <FaFolderOpen size={28} />
            </div>
            <h2 style={emptyTitle}>No projects found</h2>
            <p style={emptyText}>Get started by creating your very first database-backed project container.</p>
          </div>
        )}

        {/* Create Workspace Modal Engine */}
        {showModal && (
          <div style={overlay}>
            <div style={modal}>
              <div style={modalHeader}>
                <h2 style={modalTitle}>Create New Project</h2>
                <button onClick={() => setShowModal(false)} style={closeBtn}>
                  <FaTimes size={14} />
                </button>
              </div>

              <form onSubmit={handleSaveProject}>
                <label style={fieldLabel}>Project Title *</label>
                <input
                  type="text"
                  placeholder="e.g., E-commerce Redesign"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  style={inputStyle}
                  required
                />

                <label style={fieldLabel}>Description *</label>
                <textarea
                  placeholder="Enter high-level project goals..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  style={{ ...inputStyle, height: "90px", resize: "vertical" }}
                  required
                />

                <label style={fieldLabel}>Target Due Date</label>
                <input
                  type="date"
                  value={newProject.targetDueDate}
                  onChange={(e) => setNewProject({ ...newProject, targetDueDate: e.target.value })}
                  style={inputStyle}
                />

                <div style={modalActions}>
                  <button type="submit" disabled={saving} style={saveBtn}>
                    {saving ? "Creating..." : "Create Project"}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} style={cancelBtn}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. STYLES ARCHITECTURE OBJECT LAYOUTS
// ----------------------------------------------------
const page = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#F8FAFC", 
  fontFamily: "Inter, system-ui, sans-serif",
};

const content = {
  flex: 1,
  padding: "40px 48px",
  backgroundColor: "#F8FAFC", 
  overflowY: "auto",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
};

const heading = {
  margin: 0,
  fontSize: "1.85rem",
  fontWeight: "800",
  letterSpacing: "-0.025em",
  backgroundImage: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)", 
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const subheading = {
  color: "#64748B", 
  fontSize: "0.95rem",
  margin: "8px 0 0 0"
};

const addBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#7C5DFA",
  color: "#FFFFFF",
  border: "none",
  padding: "11px 20px",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "0.9rem",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(124, 93, 250, 0.2)",
};

const projectGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "24px",
};

const projectCard = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
  position: "relative",
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "14px",
};

const iconBox = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  backgroundColor: "rgba(124, 93, 250, 0.08)",
  color: "#7C5DFA",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardTitle = {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: "700",
  color: "#0F172A",
  flex: 1,
};

const deleteBtn = {
  background: "none",
  border: "none",
  color: "#94A3B8",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px",
  borderRadius: "6px",
};

const cardDesc = {
  color: "#64748B",
  fontSize: "0.9rem",
  lineHeight: "1.5",
  margin: "0 0 20px 0",
};

const cardFooter = {
  borderTop: "1px solid #F1F5F9",
  paddingTop: "14px",
};

const dueDate = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "#94A3B8",
  fontSize: "0.85rem",
  fontWeight: "500",
};

const emptyState = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "24px",
  padding: "64px 32px",
  textAlign: "center",
  maxWidth: "460px",
  margin: "40px auto 0",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.02)",
};

const iconWrap = {
  width: "64px",
  height: "64px",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFFFFF",
  margin: "0 auto 20px",
};

const emptyTitle = {
  fontSize: "1.4rem",
  fontWeight: "700",
  color: "#0F172A",
  margin: "0 0 8px 0",
};

const emptyText = {
  color: "#64748B",
  fontSize: "0.95rem",
  margin: 0,
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(15, 23, 42, 0.3)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modal = {
  backgroundColor: "#FFFFFF",
  borderRadius: "24px",
  width: "100%",
  maxWidth: "480px",
  padding: "32px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const modalTitle = {
  margin: 0,
  fontSize: "1.3rem",
  fontWeight: "700",
  color: "#0F172A",
};

const closeBtn = {
  background: "none",
  border: "none",
  color: "#94A3B8",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px",
};

const fieldLabel = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#475569",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
  fontSize: "0.95rem",
  color: "#0F172A",
  backgroundColor: "#FFFFFF",
  marginBottom: "20px",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const modalActions = {
  display: "flex",
  flexDirection: "row-reverse",
  gap: "12px",
  marginTop: "12px",
};

const saveBtn = {
  backgroundColor: "#7C5DFA",
  color: "#FFFFFF",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  fontWeight: "600",
  fontSize: "0.95rem",
  cursor: "pointer",
};

const cancelBtn = {
  backgroundColor: "#F1F5F9",
  color: "#64748B",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  fontWeight: "600",
  fontSize: "0.95rem",
  cursor: "pointer",
};

export default Projects;
