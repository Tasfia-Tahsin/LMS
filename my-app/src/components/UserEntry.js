import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './styles.css';

export default function AddUserFormLayout() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [libraryCard, setLibraryCard] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [libraryCardError, setLibraryCardError] = useState("");
  const [userList, setUserList] = useState([]);

  const addUser = () => {
    axios
      .post("http://localhost:3001/add", {
        id: id,
        password: password,
        libraryCard: libraryCard,
      })
      .then(() => {
        alert("Successfully added to database");
      });

    setUserList([
      ...userList,
      { id: id, password: password, libraryCard: libraryCard }
    ])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let idRegex = /^[a-zA-Z0-9]+$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let libraryCardRegex = /^\d{9}$/;
  
    let isFormValid = true;

    if (!id) {
      setIdError("Please enter an ID");
      isFormValid = false;
    } else if (!idRegex.test(id)) {
      setIdError("Please enter a valid ID with combination of A-Z, a-z and 0-9.");
      isFormValid = false;
    } else {
      setIdError("");
    }

    if (!password) {
      setPasswordError("Please enter a password");
      isFormValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, contain at least one letter and one number.");
      isFormValid = false;
    } else {
      setPasswordError("");
    }

    if (!libraryCard) {
      setLibraryCardError("Please enter a library card number");
      isFormValid = false;
    } else if (!libraryCardRegex.test(libraryCard)) {
      setLibraryCardError("Library card number must be 9 digits");
      isFormValid = false;
    } else {
      setLibraryCardError("");
    }
  
    // Validate form inputs
    if (isFormValid) {
      console.log("Form submitted");
      console.log(e);
      addUser(); // Call the function to submit the data to the database
    } else {
      console.log("Please fill out all fields");
    }
  };

  return (
    <div className="container" style={{ margin: "5%" }}>
      <div class="row g-3">
        <form onSubmit={handleSubmit}>
          <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                    ID :{" "}
                </label>
                <div class="col-sm-10">
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        class="form-control"
                        id="inputEmail3"
                    />
                    <div className="text-danger">{idError}</div>
                </div>
          </div>
          
          <br />

          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Password :
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
                id="inputEmail3"
              />
               <div className="text-danger">{idError}</div>
            </div>
          </div>

          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              libraryCard :{" "}
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                value={libraryCard}
                onChange={(e) => setLibraryCard(e.target.value)}
                class="form-control"
                id="inputEmail3"
              />
              <div className="text-danger">{idError}</div>
            </div>
          </div>
          <div className="button" style={{ textAlign: "center" }}>
            <button type="submit" onClick={handleSubmit } class="btn btn-info">
              Add
            </button>
          </div>
        </form>
        </div>
    </div>
  );
}
