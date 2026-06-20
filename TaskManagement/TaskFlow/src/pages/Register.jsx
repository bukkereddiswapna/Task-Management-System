import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaTasks } from "react-icons/fa";

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

          <button type="submit" style={button} disabled={loading}>
            {loading ? "Creating account..." : (
              <>
                Create Account <FaArrowRight size={13} />
              </>
            )}
          </button>
        </form>

        <p style={footerText}>
          Already have an account?{" "}
          <Link to="/login" style={footerLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

// ================= THEME STYLES (Synchronized Light Purple Accent Template) =================

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#FAF8FF",
  padding: "40px 20px",
  fontFamily: "'Poppins', 'Inter', sans-serif",
  boxSizing: "border-box",
};

const card = {
  width: "420px",
  maxWidth: "100%",
  padding: "40px",
  borderRadius: "24px",
  background: "#FFFFFF",
  border: "1px solid #EAE6F6",
  boxShadow: "0 20px 50px rgba(104, 74, 226, 0.06)",
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
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
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
  background: "linear-gradient(135deg, #8F76F3 0%, #684AE2 100%)",
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

export default Register;
