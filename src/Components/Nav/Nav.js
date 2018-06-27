import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../../Assets/Screen Shot 2018-06-27 at 9.21.26 AM.png";
import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <div className="nav-root">
        <div className="nav-left">
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
          <div className = 'dropdown'>
          <Link className="nav-link link-1" to="/popular/movies">
            Movies
          </Link>
          <div className="dropdown-content">
            <a href="#">Popular</a>
            <a href="#">Top Rated</a>
            <a href="#">Upcoming</a>
            <a href="#">Now Playing</a>
          </div>
          </div>
          <div className="dropdown">
          <Link className="nav-link" id='link-1' to="/popular/people">
            People
          </Link>
            <div class="dropdown-content">
              <a href="#">Popular People</a>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <Link className="nav-link" to="/popular/people">
            Login
          </Link>
          {this.state.loggedIn === false ? null : (
            <Link className="nav-link" to="/popular/people">
              My Profile
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Nav;
