import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../../Assets/Screen Shot 2018-06-27 at 9.21.26 AM.png";
import menuIcon from "./../../Assets/list-menu-final.png";
import "./Nav.css";
import "./SideNav.css"

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

            <img className = 'hamburger-menu'src={menuIcon} alt=""/>
            <div className="mobile-db-logo">
            <img className = 'secondary-logo' src={logo} alt=""/>
            </div>
  <div className="wrapper">
    {/* Sidebar */}
    <nav id="sidebar">
        <div className="sidebar-header">
            <h3>Bootstrap Sidebar</h3>
        <a href='http://localhost:8888/auth'>Login</a>
          <Link className="nav-link" to="/popular/people">
            Sign Up
          </Link>
        </div>

        <ul className="list-unstyled components">
            <p>Dummy Heading</p>
            <li className="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Home 1</a>
                    </li>
                    <li>
                        <a href="#">Home 2</a>
                    </li>
                    <li>
                        <a href="#">Home 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="#">Page 1</a>
                    </li>
                    <li>
                        <a href="#">Page 2</a>
                    </li>
                    <li>
                        <a href="#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>

</div>
      </div>
    );
  }
}

export default Nav;
