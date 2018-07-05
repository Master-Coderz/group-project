import React, { Component } from "react";
import axios from 'axios';
import './Account.css';
import Search from './../Search';

export default class Account extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: [],
      watchlist: []
    };
  }

  componentDidMount() {
    axios.get('/api/getUser')
      .then((res) => {
        this.setState({
          userInfo: res.data
        })
      })
    this.getWatchlist()
  }

  getWatchlist() {
    axios.get('/api/getWatchlist')
      .then((res) => {
        this.setState({
          watchlist: res.data
        })
      })
  }



  render() {
    console.log(this.state.watchlist, this.state.userInfo)

    const userWatchlist = this.state.watchlist.map((e, i) => {
      return (
        <div className='user_watchlist_element' key={e.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt='' />
          <h1>{e.movie_title}</h1>
        </div>
      )
    })
    const userInfo = this.state.userInfo.map((e, i) => {
      return (
        <div className='account_user_info' key={e.id}>
          <img className='account_profile_img' src={e.profilepic} />
          <div className="about">
            <div className="account_name">
              <h1>{e.firstname}</h1>
            </div>
            <div className="avg_movie_score">
              <span>Movies Rated</span>
            </div>

          </div>

        </div>
      )
    })

    // const userWatchlist = this.state.watchlist.map((e, i ) => {
    //   return(
    //     <div key={e.id}>
    //     <img src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}/>
    //     </div>
    //   )
    // })
    const firstname = this.state.userInfo.firstname
    return (
      <div className="account_root">
        <Search />
        <div className="account_inner_content">
          <div className="account_inner_content_bg">
            {userInfo}
          </div>
        </div>
        <div className="account_bar">
          <div className="account_bar_content">
            <span className="ratings">User Ratings</span>
            <span className="user_watchlist_link">My Watchlist</span>
          </div>
        </div>
        <div className='bottom_content'>
          <div className="user_watchlist">
            <p>Movies To Watch</p>
            <div className="user_watchlist_content_container">
              <div className="user_watchlist_content">{userWatchlist}</div>
            </div>
          </div>
          <h1></h1>
        </div>
        <div className="footer">
          <div className="footer_content_container">
            <div className="footer_content"><span className='fc_span'>THE BASICS</span> <ul>
              <li>About TMDB</li>
              <li>Contact Us</li>
              <li>Support Forums</li>
              <li>API</li>
            </ul></div>
            <div className="footer_content"><span className='fc_span'>GET INVOLVED</span>  <ul>
              <li>Contribution Bible</li>
              <li>Third-Party Applications</li>
              <li>Add A New Movie</li>
              <li>Add A New TV Show</li></ul></div>
            <div className="footer_content"><span className='fc_span'>THE COMMUNITY</span>  <ul>
              <li>Guidelines</li>
              <li>Leaderboards</li>
              <li>Forums</li>
              <li>Twitter</li></ul></div>
          </div>
        </div>
      </div>
    )
  }
}
