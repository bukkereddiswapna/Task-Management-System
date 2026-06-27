import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { FaTasks } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    <div style={pageContainer}>
      <div style={mainCard}>
        {/* Left Panel */}
        <div style={leftPanel}>
          <div style={logoWrapper}>
            <FaTasks style={logoIcon} />
            <span style={logoText}>TaskFlow</span>
          </div>

          <h1 style={title}>Welcome Back!</h1>

          <p style={subtitle}>Please enter login details below</p>

          {error && <div style={errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputContainer}>
              <label style={floatingLabel}>Email</label>

              <input
                style={inputStyle}
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={inputContainer}>
              <label style={floatingLabel}>Password</label>

              <input
                style={inputStyle}
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div style={forgotPasswordContainer}>
              <Link to="#" style={forgotPasswordLink}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...signInBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div style={dividerContainer}>
              <div style={dividerLine}></div>
              <span style={dividerText}>Or continue</span>
              <div style={dividerLine}></div>
            </div>

            <button type="button" style={googleBtn}>
              <FcGoogle size={18} />
              Log in with Google
            </button>

            <div style={signupContainer}>
              Don't have an account?{" "}
              <Link to="/register" style={signupLink}>
                Sign Up
              </Link>
            </div>
          </form>
        </div>

        {/* Right Panel */}
        <div style={rightPanelWrapper}>
          <div style={rightPanel}>
            <div style={glassCard}>
              <FaTasks size={42} color="#FFF" opacity="0.9" />
            </div>

            <div style={rightPanelContent}>
              <div style={rightPanelText}>
                Manage your tasks seamlessly
              </div>

              <div style={rightPanelSubText}>
                Experience a clean and efficient way to handle all your daily
                workflows with TaskFlow.
              </div>

              <div style={carouselDots}>
                <div
                  style={{
                    ...dot,
                    background: "#FFF",
                    width: "24px",
                    borderRadius: "10px",
                  }}
                />

                <div style={dot} />
                <div style={dot} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== STYLES =====================

const pageContainer = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #A4A9F9 0%, #767BF0 100%)",
  padding: "16px",
  overflow: "hidden",
  boxSizing: "border-box",
  fontFamily: "'Poppins', 'Inter', sans-serif",
};

const mainCard = {
  display: "flex",
  flexWrap: "wrap",
  width: "760px",
  maxWidth: "100%",
  minHeight: "500px",
  maxHeight: "85vh",
  background: "#FFFFFF",
  borderRadius: "16px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  padding: "8px",
  boxSizing: "border-box",
  overflow: "hidden",
};

const leftPanel = {
  flex: "0.9",
  minWidth: "300px",
  padding: "20px 32px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxSizing: "border-box",
};

const rightPanelWrapper = {
  flex: "0.8",
  minWidth: "220px",
  padding: "8px",
  boxSizing: "border-box",
};

const rightPanel = {
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg,rgb(91, 68, 182) 0%, #8F76F3 100%)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
  boxShadow: "inset 0 0 40px rgba(0,0,0,0.1)",
};

const logoWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "18px",
  color: "#3F3DCE",
};

const logoIcon = {
  fontSize: "22px",
};

const logoText = {
  fontSize: "22px",
  fontWeight: "700",
};

const title = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#000",
  margin: "0 0 6px",
  letterSpacing: "-0.02em",
};

const subtitle = {
  fontSize: "13px",
  color: "#888",
  margin: "0 0 20px",
  fontWeight: "500",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputContainer = {
  position: "relative",
  marginBottom: "18px",
};

const floatingLabel = {
  position: "absolute",
  top: "-9px",
  left: "14px",
  background: "#FFF",
  padding: "0 6px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#000",
  zIndex: 1,
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #000",
  borderRadius: "12px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  color: "#000",
  fontWeight: "500",
  background: "#FFF",
};

const forgotPasswordContainer = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "18px",
  marginTop: "-4px",
};

const forgotPasswordLink = {
  fontSize: "12px",
  color: "#000",
  fontWeight: "600",
  textDecoration: "none",
};

const signInBtn = {
  width: "100%",
  padding: "11px",
  background: "#3F3DCE",
  color: "#FFF",
  border: "none",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "16px",
  transition: "opacity 0.2s",
};

const dividerContainer = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  marginBottom: "16px",
};

const dividerLine = {
  flex: 1,
  borderBottom: "1px solid #DDD",
};

const dividerText = {
  padding: "0 10px",
  color: "#777",
  fontSize: "12px",
};

const googleBtn = {
  width: "100%",
  padding: "10px",
  background: "#FFF",
  color: "#000",
  border: "1px solid #000",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  marginBottom: "16px",
};

const signupContainer = {
  textAlign: "center",
  fontSize: "13px",
  color: "#666",
};

const signupLink = {
  color: "#3F3DCE",
  fontWeight: "600",
  textDecoration: "none",
};

const glassCard = {
  width: "110px",
  height: "110px",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "18px",
  backdropFilter: "blur(12px)",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
};

const rightPanelContent = {
  textAlign: "center",
  color: "#FFF",
  maxWidth: "220px",
};

const rightPanelText = {
  fontSize: "18px",
  lineHeight: "1.3",
  fontWeight: "700",
  marginBottom: "10px",
};

const rightPanelSubText = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.85)",
  lineHeight: "1.5",
  marginBottom: "20px",
};

const carouselDots = {
  display: "flex",
  justifyContent: "center",
  gap: "8px",
};

const dot = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.4)",
};

const errorBox = {
  background: "rgba(239,68,68,0.06)",
  border: "1px solid rgba(239,68,68,0.15)",
  color: "#E53E3E",
  padding: "10px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  marginBottom: "16px",
  fontWeight: "500",
};

export default Login;