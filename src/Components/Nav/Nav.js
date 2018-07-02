import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../../Assets/Screen Shot 2018-06-27 at 9.21.26 AM.png";
import menuIcon from "./../../Assets/list-menu-final.png";
import sideMenuIcon from "./../../Assets/sidemenuicon.png";
import "./Nav.css";
import "./SideNav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      show_sidebar: false
    };
  }

      show_sidebar(e){
      this.setState({
        show_sidebar:!this.state.show_sidebar
      });
      }

  render() {
    return (
      <div>
    
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
          <Link className="nav-link link-1" to="/popular/people">
            People
          </Link>
            <div className="dropdown-content">
              <a href="#">Popular People</a>
            </div>
          </div>
        </div>
        <div className="nav-right">
       <a href='http://localhost:8888/auth'>Login</a>
          {this.state.loggedIn === false ? null : (
            <Link className="nav-link" to="/popular/people">
              My Profile
            </Link>
          )}
        </div>
            <img className = 'hamburger-menu' onClick={e => this.show_sidebar()} src={menuIcon} alt=""/>
            <div className="mobile-db-logo">
            <img className = 'secondary-logo' src={logo} alt=""/>
        </div>
      </div>
      <div className={this.state.show_sidebar===false?'sidebar':'sidebar sidebar-show'}>
          <div className="side-link"><Link className='main-side-link' to="/popular/movies">
            Movies
          </Link>
          <ul className='side-links'>
            <a href="#">Popular</a>
            <a href="#">Top Rated</a>
            <a href="#">Upcoming</a>
            <a href="#">Now Playing</a>
          </ul>
          </div>
          <div className="side-link"><Link className='main-side-link' to="/popular/movies">
            People
          </Link>
          <ul className='side-links'>
            <a href="#">Popular People</a>
          </ul></div>
          <div className="side-link">Login</div>
      </div>
      </div>
    );
  }
}

export default Nav;
