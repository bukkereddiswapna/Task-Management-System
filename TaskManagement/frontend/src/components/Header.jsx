import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Header({ user }) {
  const navigate = useNavigate();

  return (
    <div style={headerRow}>
      <div>
        <h1 style={heading}>Welcome back, {user?.fullname || "User"} 👋</h1>
        <p style={subheading}>{user?.email}</p>
      </div>

      <button onClick={() => navigate("/tasks")} style={addBtn}>
        <FaPlus size={12} />
        Add Task
      </button>
    </div>
  );
}

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const heading = {
  margin: 0,
  color: "#1C1B24", // Exact matching title charcoal
  fontSize: "1.45rem", // Slightly tighter to match compact cards
  fontWeight: "700",
  letterSpacing: "-0.02em",
};

const subheading = {
  margin: "4px 0 0 0",
  color: "#7A768F", // Muted purple-gray subtext
  fontSize: "0.88rem",
  fontWeight: "500",
};

const addBtn = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  background: "#684AE2", // Clean solid core brand color
  color: "#FFFFFF",
  border: "none",
  padding: "10px 18px", // Compact button structural layout
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "0.85rem",
  boxShadow: "0 6px 16px rgba(104, 74, 226, 0.15)", // Subtle brand glow shadow
  transition: "background 0.2s ease",
};

export default Header;
