import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBookFormLayout from "./components/AddBookFormLayout";
import BookListLayout from "./components/BookListLayout";
import BookListLayoutUser from "./components/BookListLayoutUser";
import UserListLayout from "./components/UserListLayout";
import UpdateBookFormLayout from "./components/UpdateBookFormLayout";
import BorrowBookFormLayout from "./components/BorrowBookFormLayout";
import UserLogin from "./components/UserLogin";
import ManagerLogin from "./components/ManagerLogin";
import LandingPage from "./components/LandingPage";
import AddUserFormLayout from "./components/UserEntry";
import UserNotification from "./components/UserNotification";
import BorrowedBookList from "./components/BorrowedBookList";
import BorrowedBookListManager from "./components/BorrowedBookListManager";
import Trending from "./components/Trending";
import React, { useState, useEffect } from "react";
import "./App.css";
import Overdue from "./components/Overdue";
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
          <Route path="/bookListUser" element={<BookListLayoutUser />} />
          <Route path="/userList" element={<UserListLayout />} />
          <Route path="/updateBook/:idKey" element={<UpdateBookFormLayout />} />
          <Route path="/borrowBook/:idKey" element={<BorrowBookFormLayout />} />
          <Route path="/add" element={<AddUserFormLayout />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/userLogin" element={<UserLogin/>} />
          <Route path="/overdue" element={<Overdue/>} />
          <Route path="/managerLogin" element={<ManagerLogin/>} />
          <Route path="/borrowedBookList" element={<BorrowedBookList/>} />
          <Route path="/userNotification" element={<UserNotification/>} />
          <Route path="/trending" element={<Trending/>} />
          <Route path="/borrowedBookListManager" element={<BorrowedBookListManager/>} />
          BorrowedBookListManager
        </Routes>
    </Router>
    
  )
}

export default App;