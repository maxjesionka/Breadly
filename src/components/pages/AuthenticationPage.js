import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthenticationPage.module.css";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function registerUser(credentials) {
  return fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

// ... (import statements remain unchanged)

const AuthenticationPage = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  let tokenResponse = null;

  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    const existingUsername = localStorage.getItem("username");

    if (existingToken && existingUsername) {
      setToken(existingToken);
      setUserName(existingUsername);
      setIsLoggedIn(true);
    }
  }, [setToken]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoginError("");
      tokenResponse = await loginUser({
        username,
        password,
      });

      if (tokenResponse.token) {
        setToken(tokenResponse.token);
        setUserName(username);
        setIsLoggedIn(true);
        setSuccessMessage("Successfully logged in!");
        localStorage.setItem("token", tokenResponse.token);
        localStorage.setItem("username", username);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setLoginError("Invalid username or password");
        console.error("Login failed:", tokenResponse.error);
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error("Login failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoginError("");
      tokenResponse = await registerUser({
        username,
        password,
      });

      if (tokenResponse.token) {
        // Registration successful, automatically log in the user
        setSuccessMessage("Successfully registered and logged in!");
        handleLoginSubmit(e);
      } else {
        setLoginError("Registration failed");
        console.error("Registration failed:", tokenResponse.error);
      }
    } catch (error) {
      setLoginError("An error occurred during registration");
      console.error("Registration failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <div>
      <div className={classes.formAuth}>
        {isLoggedIn ? (
          <div>
            <p>Welcome, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>Log in</h2>
            <form onSubmit={handleLoginSubmit} className={classes.form}>
              <label>
                <p>Username</p>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
              <label>
                <p>Password</p>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div>
                <button type="submit">Login</button>
              </div>
            </form>

            {loading && <p>Loading...</p>}
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </div>
        )}
      </div>
      {!isLoggedIn && (
        <div className={classes.formAuth}>
          <h2>Create new account</h2>
          <form onSubmit={handleRegistrationSubmit} className={classes.form}>
            <label>
              <p>New Username</p>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              <p>New Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

AuthenticationPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default AuthenticationPage;
