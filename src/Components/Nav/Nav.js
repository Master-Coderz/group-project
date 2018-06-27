import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../../Assets/Screen Shot 2018-06-27 at 9.21.26 AM.png";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <div className="nav-root">
        <div className="nav-left">
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
          <Link className="nav-link" to="/popular/movies">
            Movies
          </Link>
          <Link className="nav-link" to="/popular/people">
            People
          </Link>
        </div>
        <div className="nav-right">
          <Link className="nav-link" to="/popular/people">
            Login
          </Link>
          <Link className="nav-link" to="/popular/people">
            Sign Up
          </Link>
        </div>

      </div>
    );
  }
}

export default Nav;
