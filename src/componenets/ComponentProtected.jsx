import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the ComponentProtected component
const ComponentProtected = () => {
  // State for storing fetched data
  const [data, setData] = useState(null);

  // State for handling errors
  const [error, setError] = useState("");

  // Hook to handle navigation
  const navigate = useNavigate();

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("accessToken");

      // Check if the token exists
      if (!token) {
        // If no token is found, redirect the user to the login page
        navigate("auth/login");
        return;
      }

      try {
        // Make a GET request to the protected endpoint with the token
        const response = await axios.get(
          "http://localhost:5000/auth/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the request headers
            },
          }
        );

        // If successful, save the response data to state
        setData(response.data);
      } catch (err) {
        // If an error occurs, check if it's due to unauthorized access (status code 401)
        if (err.response && err.response.status === 401) {
          // Redirect to login if unauthorized
          navigate("auth/login");
        } else {
          // Handle other types of errors and display an error message
          setError(`Error fetching data: ${err.message}`);
          console.log(err); // Log the error for debugging
        }
      }
    };

    // Call the fetchData function
    fetchData();
  }, [navigate]); // Dependency array includes navigate to avoid stale references

  // Display an error message if any
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Protected Data</h2>
      {/* Display fetched data or a loading message */}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

// Export the component as the default export
export default ComponentProtected;
