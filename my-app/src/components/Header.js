import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">My Notifications</Link>
        </li>
        <li>
          <Link to="/borrowedBookList">My Borrowings</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Header;
