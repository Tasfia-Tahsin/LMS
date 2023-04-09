import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//import Header from "../components/Header";
import Header from "./Header"
import './styles2.css';

export default function BorrowedBookList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const [bookList, setBookList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sessionID = sessionStorage.getItem("sessionID");
  
  useEffect(() => {
    const idUser = sessionStorage.getItem("sessionID");
   
    if (idUser) {// alert(idUser);
      axios.get(`http://localhost:3001/userNotification/${idUser}`).then((response) => {
        alert("dhukse");
        setBookList(response.data);
      });
    }else{
      alert("Login First");
      navigate(`/userLogin`);
    }
  }, []);

  

    const returnBook = (id) => {
    axios
      .delete(`http://localhost:3001/ret/${id}`)
      .then((response) => {
        // update the bookList state after deleting the book
        setBookList(bookList.filter((book) => book.id !== id));
        navigate(`/borrowedBookList`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookList
    .filter((book) =>
      book.idUser.toLowerCase().includes(searchTerm.toLowerCase())||
      book.idBook.toLowerCase().includes(searchTerm.toLowerCase())||
      book.date.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstBook, indexOfLastBook);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bookList.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }


  
  
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <h2 style={{ textAlign: "center" }}>Book List</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by book name, author or genre "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      

      <table className="table" style={{ margin: "5%" }}>
        <thead>
          <tr>
            <th scope="col">#SL</th>
            <th scope="col">Library Card Number</th>
            <th scope="col">Book Id</th>
            <th scope="col">Borrowing Date</th>
            <th scope="col-2" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => {
            return (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>{book.idUser}</td>
                <td>{book.idBook}</td>
                <td>{book.date}</td>
                <td>
                  <button
                    onClick={() => {
                      returnBook(book.id);
                      
                    }}
                    className="btn btn-danger"
                  >
                    Return
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div class="container" style={{ marginBottom: "10%" }}>

      <div className="d-flex justify-content-center"style={{ margin: "4%" }}>
          <nav> 
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <button
                    onClick={() => setCurrentPage(number)}
                    className="btn btn-outline-dark"
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      </div>
  );
}