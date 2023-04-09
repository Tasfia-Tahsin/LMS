/*

WASTE


*/


import axios from "axios";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function BorrowBookFormLayout() {
  const [libraryCard, setLibraryCard] = useState("");
  const [password, setPassword] = useState("");
  const [borrowDate, setBorrowDate] = useState(new Date()); // Set the borrow date to the current date
  const [book, setBook] = useState({});
  const [libraryCardError, setLibraryCardError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [bookList, setBookList] = useState([]);
  const [borrowList, setBorrowList] = useState([]);
  
  const { idKey } = useParams();
const currentDate = new Date(); // Get the current date
  const borrowBook = async () => {
    
    try {
      const response = await axios.put(`http://localhost:3001/borrow/${idKey}`, {
        libraryCard: libraryCard,
        password: password,
        borrowDate: currentDate ,
        
      });
      setBook(response.data);
      alert("Book borrowed successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const addToBorrow = () => {
    axios
      .post(`http://localhost:3001/addToBorrow/${idKey}`, {
        libraryCard: libraryCard,
        password: password,
        borrowDate: currentDate ,
      })
       .then(() => {
         alert("Successfully added to BORROW!");
       });

      setBorrowList([
        ...borrowList,
        {libraryCard: libraryCard,password: password,borrowDate: currentDate}
      ])
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let libraryCardRegex = /^[0-9]{9}$/;
    let passwordRegex = /^[A-Za-z0-9@$!%*#?&]{8,}$/;

    let isFormValid = true;

    if (!libraryCard) {
      setLibraryCardError("Please enter a library card number");
      isFormValid = false;
    }/* else if (!libraryCardRegex.test(libraryCard)) {
      setLibraryCardError("Please enter a valid library card number with 9 digits.");
      isFormValid = false;
    }*/ else {
      setLibraryCardError("");
    }
  
    if (!password) {
      setPasswordError("Please enter a password");
      isFormValid = false;
    }/* else if (!passwordRegex.test(password)) {
      setPasswordError("Please enter a valid password with at least 8 characters.");
      isFormValid = false;
    }*/ else {
      setPasswordError("");
    }

    // Validate form inputs
    if (isFormValid) {
      alert("Form submitted");
      console.log(libraryCard);
      console.log(password);
      console.log(borrowDate);
      borrowBook();
      addToBorrow();
    } else {
      console.log("Please fill out all fields");
    }
  };

  return (
    <div className="container" style={{ margin: "5%" }}>
      <div class="row g-3">
        <form onSubmit={handleSubmit}>
          <div class="row mb-3">
            <label for="libraryCard" class="col-sm-2 col-form-label">
              Library Card :{" "}
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                value={libraryCard}
                onChange={(e) => setLibraryCard(e.target.value)}
                class="form-control"
                id="libraryCard"
              />
              <div className="text-danger">{libraryCardError}</div>
            </div>
          </div>
          
          <div class="row mb-3">
            <label for="password" class="col-sm-2 col-form-label">
              Password :
            </label>
            <div class="col-sm-10">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
                id="password"
              />
              <div className="text-danger">{libraryCardError}</div>
            </div>
          </div>
          <div className="button" style={{ textAlign: "center" }}>
            <button type="submit" onClick={handleSubmit } class="btn btn-info">
              Borrow
            </button>
          </div>
          </form>

          </div>
</div>
)}
          
