import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaRocket } from "react-icons/fa";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0
  });

  const [activities, setActivities] = useState([]);
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    fetchDashboard();
  }, [location.pathname]);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const { data: tasks } = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const total = tasks.length;
      const completed = tasks.filter((task) => task.status === "Completed").length;
      const pending = tasks.filter((task) => task.status === "Pending").length;
      const inProgress = tasks.filter((task) => task.status === "In Progress").length;

      setTaskCounts({ total, completed, pending, inProgress });
      setActivities(tasks.slice(0, 5));

      const upcomingDeadlines = tasks
        .filter((task) => task.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

      setDeadlines(upcomingDeadlines);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };
  const total = taskCounts.total;
  const completedPercent = total > 0 ? Math.round((taskCounts.completed / total) * 100) : 0;
  const pendingPercent = total > 0 ? Math.round((taskCounts.pending / total) * 100) : 0;
  const progressPercent = total > 0 ? Math.round((taskCounts.inProgress / total) * 100) : 0;

  const taskStatus = [
    { label: "Completed", value: `${completedPercent}%`, width: `${completedPercent}%`, color: "#10B981" },
    { label: "Pending", value: `${pendingPercent}%`, width: `${pendingPercent}%`, color: "#F59E0B" },
    { label: "In Progress", value: `${progressPercent}%`, width: `${progressPercent}%`, color: "#8B5CF6" },
  ];
  const statCardsData = [
    { icon: <FaClipboardList />, title: "Total Tasks", value: taskCounts.total },
    { icon: <FaCheckCircle />, title: "Completed", value: taskCounts.completed },
    { icon: <FaHourglassHalf />, title: "Pending", value: taskCounts.pending },
    { icon: <FaRocket />, title: "In Progress", value: taskCounts.inProgress },
  ];

  return (
    <div style={page}>
      <style>{`
  div[style*="linear-gradient"] h1 {
    color: #FFFFFF !important;
  }
  div[style*="linear-gradient"] p, 
  div[style*="linear-gradient"] span,
  div[style*="linear-gradient"] div {
    color: #FFFFFF !important;
    opacity: 1 !important;
  }
`}</style>



      <Sidebar />

      <div style={content}>
        <Header user={user} />

        <div style={statsGrid}>
          {statCardsData.map((item) => (
            <div key={item.title} style={statCard}>
              <div style={statIcon}>
                {item.icon}
              </div>
              <h1 style={statValue}>{item.value}</h1>
              <p style={{ color: "#FFFFFF", opacity: 1 }}>{item.title}</p>
            </div>
          ))}
        </div>

        <div style={twoColGrid}>
          <div style={panel}>
            <h2 style={panelTitle}>🔥 Recent Activity</h2>
            {activities.length > 0 ? (
              activities.map((task) => (
                <div key={task._id} style={listRow}>
                  <strong style={listTitle}>{task.title}</strong>
                  <p style={listSub}>{task.status}</p>
                </div>
              ))
            ) : (
              <p style={emptyText}>No recent tasks.</p>
            )}
          </div>

          <div style={panel}>
            <h2 style={panelTitle}>📅 Upcoming Deadlines</h2>
            {deadlines.length > 0 ? (
              deadlines.map((task) => (
                <div key={task._id} style={listRow}>
                  <strong style={listTitle}>{task.title}</strong>
                  <p style={listSub}>{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p style={emptyText}>No upcoming deadlines.</p>
            )}
          </div>
        </div>

        <div style={{ ...panel, marginTop: "24px" }}>
          <h2 style={panelTitle}>📊 Task Status Overview</h2>
          {taskStatus.map((item) => (
            <div key={item.label} style={{ marginBottom: "20px" }}>
              <div style={barRow}>
                <span style={barLabel}>{item.label}</span>
                <span style={barValue}>{item.value}</span>
              </div>
              <div style={barTrack}>
                <div style={{ width: item.width, height: "100%", background: item.color, borderRadius: "10px", transition: "width 0.4s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

const colors = {
  bgBase: "#F8FAFC",
  bgSurface: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
  panelBg: "#FFFFFF",
  border: "#E2E8F0",
  textPrimary: "#0F172A",
  textSecondary: "#64748B"
};

const page = {
  display: "flex",
  minHeight: "100vh",
  background: colors.bgBase,
  fontFamily: "'Inter', sans-serif"
};

const content = {
  flex: 1,
  padding: "40px 48px",
  overflowY: "auto",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "24px",
};

const statCard = {
  background: colors.bgSurface,
  border: "none",
  padding: "24px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px -5px rgba(104, 74, 226, 0.15)",
};

const statIcon = {
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  marginBottom: "12px",
  background: "rgba(255, 255, 255, 0.2)",
  color: "#FFFFFF",
};

const statValue = {
  margin: "0 0 4px",
  color: "#FFFFFF",
  fontSize: "2rem",
  fontWeight: "700",
  letterSpacing: "-0.02em",
};

const statLabel = {
  margin: 0,
  fontSize: "0.95rem",
  fontWeight: "600",
};

const twoColGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
  marginTop: "24px",
};

const panel = {
  background: colors.panelBg,
  border: `1px solid ${colors.border}`,
  padding: "28px",
  borderRadius: "20px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
};

const panelTitle = {
  margin: "0 0 20px",
  color: colors.textPrimary,
  fontSize: "1.2rem",
  fontWeight: "700",
  letterSpacing: "-0.01em",
};

const listRow = {
  padding: "14px 0",
  borderBottom: `1px solid ${colors.border}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const listTitle = {
  color: colors.textPrimary,
  fontSize: "0.95rem",
  fontWeight: "600"
};

const listSub = {
  margin: 0,
  color: colors.textSecondary,
  fontSize: "0.88rem",
  fontWeight: "500",
};

const emptyText = {
  color: colors.textSecondary,
  fontSize: "0.92rem",
  textAlign: "center",
  padding: "16px 0",
};

const barRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const barLabel = {
  color: colors.textPrimary,
  fontSize: "0.92rem",
  fontWeight: "600",
};

const barValue = {
  color: colors.textSecondary,
  fontSize: "0.92rem",
  fontWeight: "600",
};

const barTrack = {
  width: "100%",
  height: "8px",
  backgroundColor: "#F1F5F9",
  borderRadius: "10px",
  overflow: "hidden",
};

export default Dashboard;
