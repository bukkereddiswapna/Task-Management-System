import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaTasks,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register({
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed");
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

        <h2 style={heading}>Create your account</h2>

        <p style={subheading}>Start organizing your work today</p>

        <form onSubmit={handleSubmit}>
          <label style={fieldLabel}>Full Name</label>

          <div style={inputWrap}>
            <FaUser style={inputIcon} size={14} />

            <input
              style={input}
              type="text"
              name="fullname"
              placeholder="Jane Doe"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

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
              style={input}
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <label style={fieldLabel}>Confirm Password</label>

          <div style={inputWrap}>
            <FaLock style={inputIcon} size={14} />

            <input
              style={input}
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                Create Account <FaArrowRight size={13} />
              </>
            )}
          </button>
        </form>

        <p style={footerText}>
          Already have an account?{" "}
          <Link to="/login" style={footerLink}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

// ================= STYLES =================

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #A4A9F9 0%, #767BF0 100%)",
  padding: "20px",
  overflow: "hidden",
  fontFamily: "'Poppins', 'Inter', sans-serif",
  boxSizing: "border-box",
};

const card = {
  width: "380px",
  maxWidth: "100%",
  padding: "28px",
  borderRadius: "24px",
  background: "#FFFFFF",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
  boxSizing: "border-box",
};

const brand = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "18px",
};

const brandIcon = {
  width: "34px",
  height: "34px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const brandName = {
  color: "#1C1B24",
  fontSize: "1.1rem",
  fontWeight: "700",
  letterSpacing: "-0.01em",
};

const heading = {
  color: "#1C1B24",
  fontSize: "1.45rem",
  fontWeight: "700",
  margin: "0 0 4px",
  letterSpacing: "-0.02em",
};

const subheading = {
  color: "#7A768F",
  fontSize: "0.88rem",
  margin: "0 0 18px",
  fontWeight: "500",
};

const fieldLabel = {
  display: "block",
  color: "#1C1B24",
  fontSize: "0.78rem",
  fontWeight: "600",
  marginBottom: "6px",
  marginTop: "14px",
};

const inputWrap = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const inputIcon = {
  position: "absolute",
  left: "14px",
  color: "#A0A0A5",
};

const input = {
  width: "100%",
  padding: "12px 14px 12px 42px",
  borderRadius: "12px",
  border: "1px solid #EAE6F6",
  background: "#FAF8FF",
  color: "#1C1B24",
  fontSize: "0.9rem",
  boxSizing: "border-box",
  outline: "none",
  fontWeight: "500",
};

const button = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "12px",
  fontSize: "0.92rem",
  fontWeight: "600",
  marginTop: "22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  boxShadow: "0 6px 20px rgba(104, 74, 226, 0.25)",
};

const footerText = {
  textAlign: "center",
  color: "#7A768F",
  fontSize: "0.85rem",
  marginTop: "18px",
};

const footerLink = {
  color: "#684AE2",
  fontWeight: "600",
  textDecoration: "none",
};

export default Register;