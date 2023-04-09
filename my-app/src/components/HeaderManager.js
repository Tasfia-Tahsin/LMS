import React from "react";
import { Link } from "react-router-dom";
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";



function HeaderManager() {
  const [loggedOut, setLoggedOut] = useState(false);
  
  const handleLogout = (e) => {
     Navigate("/landingPage");
  }
  return (
    <nav>
      <ul>Reports: 
        <li>
          <Link to="/overdue">Overdue Books</Link>
        </li>
        <li>
          <Link to="/borrowedBookListManager">Borrowed Books</Link>
        </li>
        <li>
          <Link to="/trending">Trending</Link>
        </li>
      </ul>
      
      <div class="small-div">
        <Link to="/landingPage">
          <button  class ="my-button">
            Log Out
          </button>
        </Link>
      </div>
     

    </nav>
    
  );
}

export default HeaderManager;
