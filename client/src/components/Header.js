import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Emaily
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
