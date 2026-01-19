import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await api({
        action: "login",
        email: email.trim().toLowerCase(),
        password: password.trim()
      });

      if (res.success) {
        // Save admin session for this visit only
        sessionStorage.setItem("isAdmin", "true");
        sessionStorage.setItem("adminTimestamp", Date.now().toString());
        
        // Clear any previous form data
        setEmail("");
        setPassword("");
        
        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-bg"></div>
      
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <span>🔐</span>
          </div>
          <h1 className="admin-login-title">Admin Access</h1>
          <p className="admin-login-subtitle">
            Secure administrative panel for hotel management
          </p>
        </div>

        <form className="admin-login-form" onSubmit={handleLogin}>
          {/* Error Message */}
          {error && (
            <div className="admin-error-message">
              <span className="admin-error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="admin-form-group">
            <label className="admin-form-label">
              <span>📧</span>
              Email Address
            </label>
            <input
              type="email"
              className="admin-form-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          {/* Password Field */}
          <div className="admin-form-group">
            <label className="admin-form-label">
              <span>🔑</span>
              Password
            </label>
            <div className="admin-password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="admin-form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={togglePasswordVisibility}
                tabIndex="-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`admin-login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {!isLoading && (
              <>
                <span className="login-icon">🚪</span>
                Sign In to Dashboard
              </>
            )}
          </button>

          {/* Security Notice */}
          <div className="admin-security-notice">
            <p className="admin-security-text">
              <span className="admin-security-icon">🔒</span>
              This is a restricted access area. Unauthorized access is prohibited.
            </p>
          </div>
        </form>

        {/* Back to Home Link */}
        <div className="admin-back-home">
          <Link to="/" className="admin-back-link">
            <span className="admin-back-icon">←</span>
            Back to Hotel Website
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="admin-login-footer">
        <p className="admin-footer-text">
          Evaani Hotel Management System • Secure Access Only
        </p>
      </div>
    </div>
  );
}