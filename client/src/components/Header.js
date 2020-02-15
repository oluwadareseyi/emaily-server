import React from "react";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import { connect } from "react-redux";

const Header = props => {
  console.log(props.auth);

  const renderContent = () => {
    switch (props.auth) {
      case null:
        return "still deciding";

      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li style={{ margin: "0 10px", fontWeight: "bold" }}>
              Credits: {props.auth.credits}
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={props.auth ? "/surveys" : "/"} className="brand-logo left">
          Emaily
        </Link>
        <ul id="nav-mobile" className="right">
          {/* <li>
            <a href="/auth/google">Login With Google</a>
          </li> */}

          {renderContent()}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(Header);
