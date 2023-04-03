import { Link } from 'react-router-dom';
import './stylesLandingPage.css';

export default function LandingPage() {
  return (
    <div className="container">
      <h2>Welcome to Our Library Management System</h2>
      <div className="buttons-container">
        <Link to="/managerLogin" className="btn user-btn">Manager Login</Link>
        <Link to="/userLogin" className="btn manager-btn">User Login</Link>
      </div>
    </div>
  );
}
