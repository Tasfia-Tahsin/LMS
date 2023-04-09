import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from "./Header"
import './styles2.css';

export default function BookListLayoutUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const [bookList, setBookList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionID = sessionStorage.getItem("sessionID");
  const [book, setBook] = useState({});
  const [borrowList, setBorrowList] = useState([]);

  const { idKey } = useParams();
  //const  dateString= 
  //const currentDate = new Date();


const cDate = new Date();
const year = cDate.getFullYear();
const month = (cDate.getMonth() + 1).toString().padStart(2, '0');
const day = cDate.getDate().toString().padStart(2, '0');
const curDate = `${year}${month}${day}`;
const currentDate = parseInt(curDate, 10);
console.log(currentDate); // Output: 20230406

  useEffect(() => {
    
    if(sessionID){
      axios
        .get("http://localhost:3001/auth/check")
        .then((response) => {
          setIsLoggedIn(response.data.isLoggedIn);
        })
        .catch((error) => {
          console.error(error);
        });
    
      axios.get("http://localhost:3001/bookList").then((response) => {
        setBookList(response.data);
      });
   }
   else{
    alert("Login first.")
    navigate("/userLogin");
   }
  }, []);
  

  async function checkAvailability(id) {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get(`http://localhost:3001/api/checkAvailability/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.available) {
        alert("Book Borrowed Successfully !");
        //navigate(`/borrowBook/${id}`);
        

        try {
          const response = await axios.put(`http://localhost:3001/borrow/${id}`, {
            libraryCard: sessionID,
            date: currentDate, 
          });
          setBook(response.data);
          //alert( "ok");
        } catch (error) {
          console.error(error);
        }

        axios
      .post(`http://localhost:3001/addToBorrow/${id}`, {
        libraryCard: sessionID,
        date: currentDate ,
      })
       .then(() => {
         alert(`You have borrowed the book on the date: ${currentDate}`);
       });

      setBorrowList([
        ...borrowList,
        {libraryCard: sessionID,borrowDate: currentDate}
      ])

      } else {
        alert("Not available for borrowing!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  async function handleLogin(username, password) {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      localStorage.setItem('sessionID', response.data.sessionID);
      console.log(response.data.sessionID);
      navigate('/');
      
    } catch (error) {
      console.error(error);
    }
  }

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
                  <button
                    onClick={() => {
                      
                        // const data = checkAvailability(book.id)
                        // console.log(data)
                       checkAvailability(book.id)
                        // .then(isAvailable => {
                        //     if (isAvailable) {
                        //     navigate(`/borrowBook/${book.id}`);
                        //     } else {
                        //     alert("Not available for borrowing!");
                        //     }
                        // });
                    }}
                    className="btn btn-danger"
                  >
                    Borroww
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