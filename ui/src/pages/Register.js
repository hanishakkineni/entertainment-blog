import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist/index.js";
import "../styles/auth.css";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    const usernameRegex = /^[a-z0-9_]+$/;
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username =
        "Username can only contain lowercase letters and numbers";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Age validation
    const age = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(age) || age < 13 || age > 120) {
      newErrors.age = "Please enter a valid age between 13 and 120";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[0-9])(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number and one uppercase letter";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {  
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/login", {
          state: { registrationSuccess: true },
        });
      } else {
        setErrors({
          submit: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setErrors({
        submit: "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
        <img src={logo} alt="Logo" className="logo" />
      <div className="register-card">
        <div style={{ height: "30px" }}></div>
        <h2 className="register-title">Create your Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {errors.submit && <div className="error-alert">{errors.submit}</div>}

          <CustomInput
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />

          <CustomInput
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <CustomInput
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
          />

          <CustomInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <CustomInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <CustomButton
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </CustomButton>

          <p className="login-link">
            Already have an account?{" "}
            <CustomButton
              onClick={() => navigate("/login")}
              className="link-button"
            >
              Sign in
            </CustomButton>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
