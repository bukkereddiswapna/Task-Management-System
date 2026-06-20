import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaTasks,
  FaFolderOpen,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { path: "/tasks", label: "Tasks", icon: <FaTasks /> },
    { path: "/projects", label: "Projects", icon: <FaFolderOpen /> },
    { path: "/profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <div style={sidebar}>
      <div style={brand}>
        <span style={brandIcon}>TM</span>
        <span style={brandName}>TaskMaster</span>
      </div>

      <div style={menuWrap}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...linkStyle,
                background: active ? "rgba(104, 74, 226, 0.08)" : "transparent",
                color: active ? "#684AE2" : "#7A768F",
              }}
            >
              <span style={{ color: active ? "#684AE2" : "#9B98B0", display: "flex" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>

      <button onClick={logout} style={logoutBtn}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

const sidebar = {
  width: "260px",
  minHeight: "100vh",
  background: "#FFFFFF",
  borderRight: "1px solid #EAE6F6",
  padding: "32px 20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
};

const brand = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "0 8px",
  marginBottom: "40px",
};

const brandIcon = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: "14px",
  flexShrink: 0,
};

const brandName = {
  color: "#1C1B24",
  fontSize: "1.3rem",
  fontWeight: "700",
  letterSpacing: "-0.02em",
};

const menuWrap = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  flex: 1,
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "14px 18px",
  borderRadius: "12px",
  fontSize: "1rem", // Increased from 0.9rem
  fontWeight: "600",
  textDecoration: "none", // Removed item underlines cleanly
  transition: "background 0.2s, color 0.2s",
};

const logoutBtn = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  background: "#FFF5F5",
  border: "none",
  color: "#E53E3E",
  padding: "14px 18px",
  borderRadius: "12px",
  fontSize: "1rem", // Increased from 0.9rem
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "12px",
  transition: "background 0.2s",
};

export default Sidebar;
