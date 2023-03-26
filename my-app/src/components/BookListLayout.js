import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles2.css';

export default function BookListLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const [bookList, setBookList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/bookList").then((response) => {
      setBookList(response.data);
    });
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookList
    .filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstBook, indexOfLastBook);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bookList.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const deleteBook = (name) => {
    axios
      .delete(`http://localhost:3001/delete/${name}`)
      .then((response) => {
        // update the bookList state after deleting the book
        setBookList(bookList.filter((book) => book.name !== name));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();

  return (
    <div>
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
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Genre</th>
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
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  {/* <NavLink to={`/${book.id}'`}><button type="button" className="btn btn-success">Update</button></NavLink> */}

                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      navigate(`/updateBook/${book.id}`);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteBook(book.name);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
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
        <div style={{ margin: "5%" }}>
        <NavLink to="/">
          <button type="submit" class="btn btn-info" >
            Add more
          </button>
        </NavLink>
        </div>

      </div>
      </div>
  );
}