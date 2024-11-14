import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file for styling

// Define the Login component
const Login = () => {
  // State variables for email, password, and feedback message
  const [email, setEmail] = useState(""); // Stores the email input
  const [password, setPassword] = useState(""); // Stores the password input
  const [message, setMessage] = useState(""); // Stores the message to display to the user

  // useNavigate is a React Router hook for navigating programmatically
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      // Make a POST request to the backend to authenticate the user
      const response = await axios.post(
        "http://localhost:5000/auth/sign-in", // Endpoint for user login
        { email, password }, // Send email and password in the request body
        { withCredentials: true } // Include cookies for authentication
      );

      // Store the server's response message in the state
      setMessage(response.data.message);

      // Extract the access token from the response
      const { accessToken } = response.data;

      // Save the access token to localStorage for future authenticated requests
      localStorage.setItem("accessToken", accessToken);

      // Display a success message
      alert("Login successful");

      // Navigate to the Dashboard page upon successful login
      navigate("/Dashboard");
    } catch (err) {
      // Handle errors and display the error message to the user
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Form for user login */}
      <form onSubmit={handleSubmit} className="login-form">
        {/* Input field for email */}
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          required // Make the field required
        />

        {/* Input field for password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          required // Make the field required
        />

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      {/* Display the message (success or error) if it exists */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
