import React, { Component } from "react";
import axios from 'axios'

export default class Account extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: [],
      watchlist: []
    };
  }

  componentDidMount(){
    axios.get('/api/getUser')
    .then((res) => {
      this.setState({
        userInfo: res.data
      })
    } )
    this.getWatchlist()
  }

  getWatchlist(){
    axios.get('/api/getWatchlist')
    .then((res) => {
      this.setState({
        watchlist: res.data
      })
    } )
  }



  render() {
    console.log(this.state.watchlist)
    const userWatchlist = this.state.watchlist.map((e, i) => {
      return(
        <div key={e.id}>
        <img src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}/>
        <h1>{e.movie_title}</h1>
        </div>
      )
    } )
    const userInfo = this.state.userInfo.map((e, i) => {
      return(
        <div key={e.id}>
        <span>{e.firstname}</span>
        <h1>{e.lastname}</h1>
        <img src={e.profilepic}/>

        </div>
      )
    } )

    // const userWatchlist = this.state.watchlist.map((e, i ) => {
    //   return(
    //     <div key={e.id}>
    //     <img src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}/>
    //     </div>
    //   )
    // })
   return (
     <div>
    {userInfo}
    <div>Watchlist</div>
    {userWatchlist}
    <h1></h1>
     </div>
   )
  }
}
