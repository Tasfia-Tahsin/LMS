import React from "react";
import { Link } from "react-router-dom";
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";



function Header() {
  const [loggedOut, setLoggedOut] = useState(false);
  
  const handleLogout = (e) => {
     Navigate("/userLogin");
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/userNotification">My Notifications</Link>
        </li>
        <li>
          <Link to="/borrowedBookListManager">My Borrowings</Link>
        </li>
      
      </ul>
      
      <div class="small-div">
        <Link to="/userLogin">
          <button  class ="my-button">
            Log Out
          </button>
        </Link>
      </div>
     

    </nav>
    
  );
}

export default Header;
