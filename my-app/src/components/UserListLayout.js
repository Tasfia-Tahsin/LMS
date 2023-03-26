import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles2.css';

export default function UserListLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(6);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList
    .filter((user) =>
      user.libraryCard.toLowerCase().includes(searchTerm.toLowerCase())||
      user.password.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    axios.get("http://localhost:3001/userList").then((response) => {
      setUserList(response.data);
    });
  }, []);
 
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userList.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const navigate = useNavigate();

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>User List</h2>
      
      <table className="table" style={{ margin: "5%" }}>
        <thead>
          <tr>
            <th scope="col">#SL</th>
            <th scope="col">id</th>
            <th scope="col">libraryCard</th>
            <th scope="col">password</th>
           
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => {
            return (
                <tr key={user.idUser}>
                <th scope="row">{user.idUser}</th>
                <td>{user.id}</td>
                <td>{user.libraryCard}</td>
                <td>{user.password}</td>
                
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
        <NavLink to="/add">
          <button type="submit" class="btn btn-info" >
            Add more
          </button>
        </NavLink>
        </div>

      </div>
      </div>
  );
}