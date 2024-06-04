import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/welcome">
          <center>
            <h1 className="title">CineBuddy</h1>
          </center>
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
