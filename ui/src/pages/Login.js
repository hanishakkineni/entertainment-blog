import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom/dist/index.js";
import "../styles/auth.css";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import logo from "../assets/logo.png"; 
import Toast from "../components/ToastNotification";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if user is already logged in
    fetch("http://localhost:3001/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setShowToast(true);
    }
  }, [location.state]);

    const handleToastClose = () => {
      setShowToast(false);
      navigate(location.pathname, { replace: true, state: {} });
    };

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include"
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/profile");
    } else {
      setErrors({
        submit:
          data.message ||
          "Login failed. Please check your credentials and try again.",
      });
    }
  } catch (error) {
    setErrors({
      submit: "Login failed. Please check your credentials and try again.",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logoPic" />
      {showToast && (
        <Toast message="User created successfully" onClose={handleToastClose} />
      )}
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.submit && <div className="error-alert">{errors.submit}</div>}

          <CustomInput
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <CustomInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <CustomButton
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </CustomButton>

          <p className="register-link">
            Don't have an account?{" "}
            <CustomButton
              onClick={() => navigate("/register")}
              className="link-button"
            >
              Sign up
            </CustomButton>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
