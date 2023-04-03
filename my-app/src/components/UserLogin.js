import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./stylesUserLogin.css";

export default function UserLogin() {
  const [libraryCard, setLibraryCard] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/userLogin", {
        libraryCard: libraryCard,
        password: password,
      })
      .then((response) => {
        if (response.data.loggedIn) {
          // Navigate to the user dashboard
          window.location.href = "/bookListUser";
        } else {
          setErrorMessage(response.data.message);
        }
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
