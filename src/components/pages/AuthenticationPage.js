import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthenticationPage.module.css";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

async function loginUser(credentials) {
  const params = new URLSearchParams();
  params.append("username", credentials.username);
  params.append("password", credentials.password);

  return fetch("http://localhost:8000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  }).then((data) => data.json());
}

async function registerUser(credentials) {
  return fetch("http://localhost:8000/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      console.log("Server Response:", data);
      return data.json();
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      throw error;
    });
}

const AuthenticationPage = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState('')
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
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
      const decodedToken = jwtDecode(existingToken);
      setUserId(decodedToken.user_id);
      localStorage.setItem("currentUserId", decodedToken.user_id);
      console.log("User ID:", userId);
    }
  }, [setToken, userId]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoginError("");
      tokenResponse = await loginUser({
        username: username,
        password: password,
      });

      if (tokenResponse.acces_token) {
        setToken(tokenResponse.acces_token);
        setUserName(username);
        setIsLoggedIn(true);
        setSuccessMessage("Successfully logged in!");
        localStorage.setItem("token", tokenResponse.acces_token);
        localStorage.setItem("username", username);
        const decodedToken = jwtDecode(tokenResponse.acces_token);
        localStorage.setItem("currentUserId", decodedToken.user_id);
        if ( tokenResponse.isAdmin || username === "mj16@gmail.com"  ) { 
          // console.log('admin is here');
          localStorage.setItem("isAdmin", "true");
        }
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setLoginError("Invalid username or password");
        console.error("Login failed:", tokenResponse.detail);
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
      const userResponse = await registerUser({
        email: username,
        password: password,
        name: name,
        surname: surname,
        phone_number: telephone,
      });

      // Check if registration was successful based on server response
      if (userResponse && userResponse.id) {
        // Registration successful
        setSuccessMessage("Successfully registered and logged in!");
        handleLoginSubmit(e);
      } else {
        // Registration failed
        setLoginError("Registration failed");
        console.error("Registration failed:", userResponse);
      }
    } catch (error) {
      setLoginError("An error occurred during registration");
      console.error("Registration failed:", error.message);
    } finally {
      setLoading(false);
    }
  };
  // Delete all user tokens
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('currentUserId')
  };

  return (
    <div>
      <div className={classes.formAuth}>
        {isLoggedIn ? (
          <div>
            <p>Witaj, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>Zaloguj się</h2>
            <form onSubmit={handleLoginSubmit} className={classes.form}>
              <label>
                <p>Nazwa użytkownika</p>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
              <label>
                <p>Hasło</p>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div>
                <button type="submit">Zaloguj się</button>
              </div>
            </form>

            {loading && <p>Ładowanie...</p>}
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </div>
        )}
      </div>
      {!isLoggedIn && (
        <div className={classes.formAuth}>
          <h2>Stwórz nowego użytkownika</h2>
          <form onSubmit={handleRegistrationSubmit} className={classes.form}>
            <label>
              <p>Email</p>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              <p>Hasło</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              <p>Imię</p>
              <input type="text" onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              <p>Nazwisko</p>
              <input type="text" onChange={(e) => setSurname(e.target.value)} />
            </label>
            <label>
              <p>Telefon</p>
              <input
                type="tel"
                onChange={(e) => setTelephone(e.target.value)}
              />
            </label>
            <div>
              <button type="submit">Zarejestruj się</button>
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