import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./stylesUserLogin.css";

export default function ManagerLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/managerLogin", {
        id,
        password,
      })
      .then((response) => {
        if (response.data.loggedIn) {
          // Navigate to the user dashboard
          window.location.href = "/bookList";
        } else {
          alert("Invalid Id card Number or Password! ");
          setErrorMessage(response.data.message);
        }
      });
  };

  return (
    <div className="container">
      <h2>Manager Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="id">ID Card Number</label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
    </div>
  );
}
