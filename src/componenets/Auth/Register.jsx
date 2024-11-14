import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file for styling

// Define the Register component
const Register = () => {
  // State for storing form input data
  const [formData, setFormData] = useState({
    name: "", // User's name
    email: "", // User's email
    password: "", // User's password
  });

  // State variables for feedback messages
  const [message, setMessage] = useState(""); // Success or error message
  const [passwordError, setPasswordError] = useState(""); // Password validation error message

  // useNavigate hook for navigation
  const navigate = useNavigate();

  // Function to validate the password with specific criteria
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password); // Checks if the password meets the requirements
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate password before making the API request
    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters, include a letter, a number, and a special character."
      );
      return; // Exit the function if validation fails
    }

    try {
      // Make a POST request to the server to register the user
      const response = await axios.post(
        "http://localhost:5000/auth/sign-up",
        formData,
        { withCredentials: true }
      );

      // Display the success message from the server
      setMessage(response.data.message);

      // Store the access token in localStorage if registration is successful
      const { accessToken } = response.data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      alert("User registered successfully");

      // Redirect to the Dashboard
      navigate("/Dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="register-form">
        {/* Input field for name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        {/* Input field for email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        {/* Input field for password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            setPasswordError(""); // Clear password error on change
          }}
          required
        />

        {/* Display password validation error if any */}
        {passwordError && <p className="error">{passwordError}</p>}

        {/* Submit button */}
        <button type="submit">Register</button>
      </form>

      {/* Display server message if any */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
