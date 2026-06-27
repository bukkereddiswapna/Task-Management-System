import { FaPen, FaTrash, FaCalendarAlt } from "react-icons/fa";

function TaskCard({ task, onEdit, onDelete }) {
  // Balanced color palette derived from your dashboard's vibrant purple theme
  const priorityColors = {
    High: { bg: "rgba(239, 68, 68, 0.08)", text: "#EF4444", dot: "#EF4444" },
    Medium: { bg: "rgba(245, 158, 11, 0.08)", text: "#F59E0B", dot: "#F59E0B" },
    Low: { bg: "rgba(34, 197, 94, 0.08)", text: "#22C55E", dot: "#22C55E" },
  };

  const statusColors = {
    Pending: { bg: "rgba(100, 116, 139, 0.1)", text: "#64748B" },
    "In Progress": { bg: "rgba(124, 93, 250, 0.12)", text: "#7C5DFA" }, // Matches active purple theme
    Completed: { bg: "rgba(34, 197, 94, 0.12)", text: "#22C55E" },
  };

  const priority = priorityColors[task.priority] || priorityColors.Medium;
  const status = statusColors[task.status] || statusColors.Pending;

  return (
    <div style={card}>
      <div style={topRow}>
        <h3 style={title}>{task.title}</h3>

        <span style={{ ...priorityBadge, background: priority.bg, color: priority.text }}>
          <span style={{ ...dot, background: priority.dot }} />
          {task.priority}
        </span>
      </div>

      <p style={description}>{task.description}</p>

      <div style={metaRow}>
        <span style={{ ...statusBadge, background: status.bg, color: status.text }}>
          {task.status}
        </span>

        <span style={dueDate}>
          <FaCalendarAlt size={12} style={{ color: "#7C5DFA" }} />
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No due date"}
        </span>
      </div>

      <div style={actions}>
        <button onClick={() => onEdit(task)} style={editBtn}>
          <FaPen size={11} />
          Edit
        </button>

        <button onClick={() => onDelete(task._id)} style={deleteBtn}>
          <FaTrash size={11} />
          Delete
        </button>
      </div>
    </div>
  );
}

// UI Styling matching the clean, rounded look of your dashboard widgets
const card = {
  background: "#FFFFFF",
  padding: "24px",
  borderRadius: "20px", // Deep corners matching the dashboard statistics containers
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)", // Very subtle, clean shadow
  border: "1px solid #F1F5F9",
  marginBottom: "20px",
  fontFamily: "Inter, system-ui, sans-serif",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "12px",
};

const title = {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: "600",
  color: "#1E1B4B", // Soft dark navy for high contrast readability
};

const priorityBadge = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: "600",
  flexShrink: 0,
  whiteSpace: "nowrap",
};

const dot = {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
};

const description = {
  color: "#64748B",
  fontSize: "0.9rem",
  lineHeight: "1.6",
  margin: "0 0 20px 0",
};

const metaRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
  borderBottom: "1px solid #F8FAFC",
  paddingBottom: "16px",
};

const statusBadge = {
  padding: "6px 14px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
};

const dueDate = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "#64748B",
  fontSize: "0.85rem",
  fontWeight: "500",
};

const actions = {
  display: "flex",
  gap: "12px",
};

const editBtn = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "10px",
  background: "#7C5DFA", // Exact matching primary theme color from your dashboard
  color: "#FFFFFF",
  border: "none",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "opacity 0.2s ease",
};

const deleteBtn = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "10px",
  background: "rgba(239,68,68,0.06)",
  color: "#EF4444",
  border: "1px solid rgba(239,68,68,0.15)",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "0.85rem",
  cursor: "pointer",
};

export default TaskCard;
