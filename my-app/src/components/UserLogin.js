import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./stylesUserLogin.css";

export default function UserLogin() {
  const [libraryCard, setLibraryCard] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const sessionID = sessionStorage.getItem("sessionID");
    if (sessionID) {
      // If session ID exists, check if it's still valid by sending a request to the server
      axios
        .post("http://localhost:3001/checkSession", { sessionID })
        .then((response) => {
          if (response.data.validSession) {
            setLoggedIn(true);
            // Navigate to the user dashboard
            window.location.href = "/bookListUser";
          } else {
            // Clear the session ID from session storage
            sessionStorage.removeItem("sessionID");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/userLogin", {
        libraryCard: libraryCard,
        password: password,
      })
      .then((response) => {
        if (response.data.loggedIn) {
          // Save the session ID in session storage
          sessionStorage.setItem("sessionID", response.data.sessionID);
          setLoggedIn(true);
          //alert(response.data.sessionID);
          alert("Successfully Logged in");
          // Navigate to the user dashboard
          window.location.href = "/bookListUser";
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="libraryCard">Library Card Number</label>
          <input
            type="text"
            className="form-control"
            id="libraryCard"
            value={libraryCard}
            onChange={(e) => setLibraryCard(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      
      <p className="mt-3">
        Don't have an account? <NavLink to="/userSignup">Contact Manager</NavLink>
      </p>
      
    </div>
  );
}
