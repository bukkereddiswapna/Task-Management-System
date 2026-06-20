import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";

function Tasks() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(data);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
  };

  const handleSaveTask = async () => {
    if (!newTask.title || !newTask.description) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (editingTask) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          newTask,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:5000/api/tasks", newTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await fetchTasks();

      setNewTask({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
      });

      setEditingTask(null);
      setShowModal(false);

      localStorage.setItem("dashboardRefresh", Date.now().toString());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchTasks();

      localStorage.setItem("dashboardRefresh", Date.now().toString());
    } catch (error) {
      console.log("ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      alert(error.response?.data?.message || error.message || "Failed to save task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });

    setShowModal(true);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={page}>
      <Sidebar />

      <div style={content}>
        <div style={headerRow}>
          <h1 style={heading}>Tasks</h1>

          <button
            onClick={() => {
              setEditingTask(null);

              setNewTask({
                title: "",
                description: "",
                priority: "Medium",
                status: "Pending",
                dueDate: "",
              });

              setShowModal(true);
            }}
            style={addBtn}
          >
            <FaPlus size={11} />
            Add Task
          </button>
        </div>

        <div style={searchWrap}>
          <FaSearch style={searchIcon} size={14} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />
        </div>

        <div style={taskGrid}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p style={emptyText}>No tasks found.</p>
          )}
        </div>

        {showModal && (
          <div style={overlay}>
            <div style={modal}>
              <div style={modalHeader}>
                <h2 style={modalTitle}>
                  {editingTask ? "Edit Task" : "Add New Task"}
                </h2>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingTask(null);
                  }}
                  style={closeBtn}
                >
                  <FaTimes size={14} />
                </button>
              </div>

              <label style={fieldLabel}>Title</label>
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                style={inputStyle}
              />

              <label style={fieldLabel}>Description</label>
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                style={{ ...inputStyle, height: "90px", resize: "vertical" }}
              />

              <div style={twoCol}>
                <div style={{ flex: 1 }}>
                  <label style={fieldLabel}>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={fieldLabel}>Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <label style={fieldLabel}>Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                style={inputStyle}
              />

              <div style={modalActions}>
                <button onClick={handleSaveTask} style={saveBtn}>
                  {editingTask ? "Update Task" : "Add Task"}
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingTask(null);
                  }}
                  style={cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Layout styling matching the dark theme layout perfectly
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

const searchWrap = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginBottom: "32px",
  backgroundColor: "#FFFFFF", // Crisp white surface container
  borderRadius: "14px",
  border: "1px solid #E2E8F0",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
};

const searchIcon = {
  position: "absolute",
  left: "18px",
  color: "#94A3B8",
};

const searchInput = {
  width: "100%",
  padding: "14px 14px 14px 48px",
  background: "transparent",
  border: "none",
  color: "#0F172A",
  fontSize: "0.95rem",
  outline: "none",
};

const taskGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
  gap: "24px",
};

const emptyText = {
  color: "#64748B",
  fontSize: "1rem",
  gridColumn: "1 / -1",
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
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  backgroundColor: "#FFFFFF", 
  border: "1px solid #E2E8F0",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "480px",
  padding: "28px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const modalTitle = {
  margin: 0,
  fontSize: "1.35rem",
  fontWeight: "700",
  backgroundImage: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const closeBtn = {
  background: "none",
  border: "none",
  color: "#64748B",
  cursor: "pointer",
  padding: "4px",
};

const fieldLabel = {
  display: "block",
  color: "#64748B",
  fontSize: "0.85rem",
  fontWeight: "600",
  marginBottom: "6px",
  marginTop: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  backgroundColor: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderRadius: "10px",
  color: "#0F172A",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
};

const twoCol = {
  display: "flex",
  gap: "16px",
};

const modalActions = {
  display: "flex",
  flexDirection: "row-reverse",
  gap: "12px",
  marginTop: "28px",
  borderTop: "1px solid #E2E8F0",
  paddingTop: "20px",
};

const saveBtn = {
  backgroundColor: "#7C5DFA",
  color: "#FFFFFF",
  border: "none",
  padding: "11px 22px",
  borderRadius: "10px",
  fontWeight: "600",
  fontSize: "0.9rem",
  cursor: "pointer",
};

const cancelBtn = {
  backgroundColor: "transparent",
  color: "#64748B",
  border: "1px solid #E2E8F0",
  padding: "11px 22px",
  borderRadius: "10px",
  fontWeight: "600",
  fontSize: "0.9rem",
  cursor: "pointer",
};

export default Tasks;

