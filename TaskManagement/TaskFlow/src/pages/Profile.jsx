import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/authService";
import Sidebar from "../components/Sidebar";

function Profile() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    createdAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
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

      alert("Profile updated successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={loader}>Loading...</div>;

  return (
    <div style={page}>
      <Sidebar />

      <main style={content}>
        <div style={headerCard}>
          <div style={avatar}>
            {user.fullname.charAt(0).toUpperCase()}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={name}>{user.fullname}</h1>

            <p style={email}>{user.email}</p>

            <span style={badge}>
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div style={grid}>
          <div style={card}>
            <h2 style={sectionTitle}>Personal Information</h2>

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

              <button
                type="submit"
                disabled={saving}
                style={button}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          <div style={card}>
            <h2 style={sectionTitle}>Account Details</h2>

            <div style={infoItem}>
              <span style={infoLabel}>Account Status</span>
              <span style={active}>Active</span>
            </div>

            <div style={infoItem}>
              <span style={infoLabel}>User ID</span>
              <span style={infoValue}>
                {localStorage.getItem("user")
                  ? JSON.parse(localStorage.getItem("user"))._id
                  : "-"}
              </span>
            </div>

            <div style={infoItem}>
              <span style={infoLabel}>Joined</span>
              <span style={infoValue}>
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const page = {
  display: "flex",
  minHeight: "100vh",
  background: "#0F172A",
};

const content = {
  flex: 1,
  padding: "40px",
};

const headerCard = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: "32px",
  marginBottom: "32px",
  backdropFilter: "blur(12px)",
};

const avatar = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "36px",
  fontWeight: "700",
  color: "#fff",
};

const name = {
  color: "#fff",
  margin: 0,
  fontSize: "32px",
};

const email = {
  color: "#94A3B8",
  marginTop: "8px",
};

const badge = {
  display: "inline-block",
  marginTop: "12px",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(59,130,246,0.15)",
  color: "#60A5FA",
  fontSize: "14px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
};

const card = {
  background: "#FFFFFF",
  borderRadius: "24px",
  padding: "32px",
};

const sectionTitle = {
  marginTop: 0,
  marginBottom: "28px",
  color: "#0F172A",
};

const field = {
  marginBottom: "20px",
};

const label = {
  display: "block",
  marginBottom: "8px",
  color: "#475569",
  fontWeight: "600",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #CBD5E1",
  fontSize: "15px",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "12px",
};

const infoItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 0",
  borderBottom: "1px solid #E2E8F0",
};

const infoLabel = {
  color: "#64748B",
};

const infoValue = {
  color: "#0F172A",
  fontWeight: "600",
};

const active = {
  color: "#16A34A",
  fontWeight: "700",
};

const loader = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
};

export default Profile;