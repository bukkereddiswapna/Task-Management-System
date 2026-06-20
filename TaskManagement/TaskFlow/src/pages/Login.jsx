import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaTasks } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const data = await login(formData);

      if (!data?.token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={brand}>
          <span style={brandIcon}>
            <FaTasks size={14} color="#FFFFFF" />
          </span>
          <span style={brandName}>TaskFlow</span>
        </div>

        <h2 style={heading}>Welcome back</h2>
        <p style={subheading}>Sign in to continue to your workspace</p>

        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={fieldLabel}>Email Address</label>
          <div style={inputWrap}>
            <FaEnvelope style={inputIcon} size={14} />
            <input
              style={input}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label style={fieldLabel}>Password</label>
          <div style={inputWrap}>
            <FaLock style={inputIcon} size={14} />
            <input
              style={{ ...input, paddingRight: "44px" }}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          <span style={eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            </span>
          </div>

          <button style={button} type="submit" disabled={loading}>
            {loading ? "Signing in..." : (
              <>
                Sign In <FaArrowRight size={13} />
              </>
            )}
          </button>
        </form>

        <p style={footerText}>
          Don't have an account?{" "}
          <Link to="/register" style={footerLink}>Create one</Link>
        </p>
      </div>
    </div>
  );
}

// ================= THEME STYLES (Light & Clean Purple UI Accent) =================

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#FAF8FF", // Dashboard tinted canvas background
  padding: "20px",
  fontFamily: "'Poppins', 'Inter', sans-serif",
};

const card = {
  width: "420px",
  maxWidth: "100%",
  padding: "40px",
  borderRadius: "24px",
  background: "#FFFFFF", // Premium solid white panel surface
  border: "1px solid #EAE6F6",
  boxShadow: "0 20px 50px rgba(104, 74, 226, 0.06)", // Soft glow aura shadow
};

const brand = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "24px",
};

const brandIcon = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)", // Matching brand gradient
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const brandName = {
  color: "#1C1B24",
  fontSize: "1.2rem",
  fontWeight: "700",
  letterSpacing: "-0.01em",
};

const heading = {
  color: "#1C1B24",
  fontSize: "1.6rem",
  fontWeight: "700",
  margin: "0 0 6px",
  letterSpacing: "-0.02em",
};

const subheading = {
  color: "#7A768F",
  fontSize: "0.92rem",
  margin: "0 0 24px",
  fontWeight: "500",
};

const errorBox = {
  background: "rgba(239, 68, 68, 0.06)",
  border: "1px solid rgba(239, 68, 68, 0.15)",
  color: "#E53E3E",
  padding: "12px 14px",
  borderRadius: "12px",
  fontSize: "0.88rem",
  marginBottom: "18px",
  fontWeight: "500",
};

const fieldLabel = {
  display: "block",
  color: "#1C1B24",
  fontSize: "0.8rem",
  fontWeight: "600",
  marginBottom: "8px",
  marginTop: "18px",
};

const inputWrap = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const inputIcon = {
  position: "absolute",
  left: "16px",
  color: "#A0A0A5",
};

const eyeIcon = {
  position: "absolute",
  right: "16px",
  color: "#A0A0A5",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const input = {
  width: "100%",
  padding: "14px 14px 14px 44px",
  borderRadius: "12px",
  border: "1px solid #EAE6F6",
  background: "#FAF8FF",
  color: "#1C1B24",
  fontSize: "0.92rem",
  boxSizing: "border-box",
  outline: "none",
  fontWeight: "500",
  transition: "border-color 0.2s ease",
};

const button = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)", // Perfect gradient synchronization
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "0.95rem",
  marginTop: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  boxShadow: "0 6px 20px rgba(104, 74, 226, 0.25)",
};

const footerText = {
  textAlign: "center",
  color: "#7A768F",
  fontSize: "0.9rem",
  marginTop: "24px",
};

const footerLink = {
  color: "#684AE2",
  fontWeight: "600",
  textDecoration: "none",
};

export default Login;
