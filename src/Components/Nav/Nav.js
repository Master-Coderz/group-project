import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../../Assets/Screen Shot 2018-06-27 at 9.21.26 AM.png";
import menuIcon from "./../../Assets/list-menu-final.png";
import sideMenuIcon from "./../../Assets/sidemenuicon.png";
import axios from 'axios'
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

  componentDidMount() {
    this.checkUser()
  }

  show_sidebar(e) {
    this.setState({
      show_sidebar: !this.state.show_sidebar
    });
  }

  checkUser() {
    axios.get('/auth/me')
      .then((res) => {
        if (res.data) {
          this.setState({ loggedIn: true })
        }
        else {
          this.setState({ loggedIn: false })
        }
      })
  }

  render() {
    return (
      <div>

        <div className="nav-root">
          <div className="nav-left">
            <Link to="/">
              <img className="logo" src={logo} alt="" />
            </Link>
            <div className='dropdown'>
              <Link className="nav-link link-1" to="/top_rated/movies">
                Movies
          </Link>
              <div className="dropdown-content">
                <a href="#/popular/movies">Popular</a>
                <a href="#/top_rated/movies">Top Rated</a>
                <a href="#/upcoming/movies">Upcoming</a>
                <a href="#/now_playing/movies">Now Playing</a>
              </div>
            </div>
            <div className="dropdown">
              <Link className="nav-link link-1" to="/popular/people">
                People
              </Link>
              <div className="dropdown-content">
                <a href="#/popular/people">Popular People</a>
              </div>
            </div>
          </div>
          <div className="nav-right">
            {/* <Link className="nav-link" to="/popular/people">
            Login
          </Link> */}
            {this.state.loggedIn === true ? <a className='nav-link' href="http://localhost:8888/auth/logout">Logout</a> : <a className='nav-link' href="http://localhost:8888/auth">Login</a>}
            {this.state.loggedIn === false ? null : (
              <Link className="nav-link" to="/account">
                My Profile
              </Link>
            )}
          </div>
          <img className='hamburger-menu' onClick={e => this.show_sidebar()} src={menuIcon} alt="" />
          <div className="mobile-db-logo">
            <Link to = "/">
              <img className='secondary-logo' src={logo} alt="" />
            </Link>
          </div>
        </div>
        <div className={this.state.show_sidebar === false ? 'sidebar' : 'sidebar sidebar-show'}>
          <div className="side-link"><Link className='main-side-link' to="/popular/movies">
            Movies
          </Link>
            <ul className='side-links'>
              <a href="#/popular/movies">Popular</a>
              <a href="#/top_rated/movies">Top Rated</a>
              <a href="#/upcoming/movies">Upcoming</a>
              <a href="#/now_playing/movies">Now Playing</a>
            </ul>
          </div>
          <div className="side-link"><Link className='main-side-link' to="/popular/movies">
            People
          </Link>
            <ul className='side-links'>
              <a href="#/popular/people">Popular People</a>
            </ul></div>
          <div className="side-link">Login</div>
          {this.state.loggedIn === true ? <div className="account_nav_link side-link">Account</div> : null}
        </div>
      </div>
    );
  }
}

export default Nav;
