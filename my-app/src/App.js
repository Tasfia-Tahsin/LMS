import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookFormLayout from "./components/AddBookFormLayout";
import BookListLayout from "./components/BookListLayout";
import UserListLayout from "./components/UserListLayout";
import UpdateBookFormLayout from "./components/UpdateBookFormLayout";
import AddUserFormLayout from "./components/UserEntry";
import React, { useState, useEffect } from "react";
import "./App.css";
function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);


  return (
    <Router>
          <h1>{message}</h1>
        <Routes>
         
          {/* //User Pages */}
          <Route path="/" element={<AddBookFormLayout />} />
          <Route path="/bookList" element={<BookListLayout />} />
          <Route path="/userList" element={<UserListLayout />} />
          <Route path="/updateBook/:idKey" element={<UpdateBookFormLayout />} />
          <Route path="/add" element={<AddUserFormLayout />} />
        </Routes>
    </Router>
    
  )
}

export default App;