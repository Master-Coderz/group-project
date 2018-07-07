import React, { Component } from "react";
import axios from "axios";
import { Button, SideNav, SideNavItem } from 'react-materialize'
import './Homepage.css';
import { Link } from 'react-router-dom'
export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      upcomingMovies: [],
      popularMovies: [{id: 1}],
      inTheaters: [{id: 1}],
      similarMovies: [],
      watchlist: []
    };
  }

  componentDidMount() {
    this.getUpcoming();
    this.getPopular();
    this.getInTheaters();
    this.getWatchlist()
    axios.get('/auth/me').then((res) => {
    })
  }



  getUpcoming() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then(res => {
        this.setState({
          upcomingMovies: res.data.results
        });
      });
  }

  getPopular() {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    ).then((res) => {
      this.setState({
        popularMovies: res.data.results
      });
    });
  }

  getInTheaters() {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    ).then((res) => {
      this.setState({
        inTheaters: res.data.results
      });
    });
  }

  getSimilar() {
    axios.get(`https://api.themoviedb.org/3/movie/${550}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      .then(res => {
        this.setState({
          similarMovies: res.data
        })
      })
  }


  addToWatchlistTheaters(id, title, poster_path){
   
    axios.post(`/api/addToWatchlist/${id}`, {title, poster_path}).then((res) => {
      this.getWatchlist()
    } )
  };


  addToWatchlistPopular(id, title, poster_path){


    axios.post(`/api/addToWatchlist/${id}`, {title, poster_path}).then((res) => {
      this.getWatchlist()
    } )
  };

  getWatchlist() {
    axios.get('/api/getWatchlist')
      .then((res) => {
        this.setState({
          watchlist: res.data
        })
      })
  }


  render() {
    console.log(this.state.inTheaters[0].id)

    let inTheaters = this.state.inTheaters.map((e, i) => {
      return (

        <div className="tile">
          <div className="tile__media">
          <a href={`/#/movies/${e.id}`}>

            <img className="tile__img" src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt="" />
          </a>         
       </div>
          <div className="tile__details">
            <button onClick={() => this.addToWatchlistTheaters(e.id, e.title, e.poster_path)} className='add_to_watchlist_btn'></button>
            <Link to={`/movies/${e.id}`}>
              <div className="tile__title">
                {e.title}
              </div>
            </Link>
          </div>
        </div>
      )
    })

    let popularMovies = this.state.popularMovies.map((e, i) => {
      return (

        <div className="tile">
          <div className="tile__media">
          <a href={`/#/movies/${e.id}`}>

            <img className="tile__img" src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt="" />
          </a>
          </div>
          <div className="tile__details">
            <button onClick={() => this.addToWatchlistPopular(e.id, e.title, e.poster_path)} className='add_to_watchlist_btn'></button>
            <Link to={`/movies/${e.id}`}>
              <div className="tile__title">
                {e.title}
              </div>
            </Link>
          </div>
        </div>
      )
    })
    const userWatchlist = this.state.watchlist.map((e, i) => {
      return (


        <SideNavItem href={null} key={e.id}>
          <div>
            <Link to={`/movies/${e.movie_id}`} >
              <img className='watchlist-img' src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt='' />
            </Link>
          </div>
        </SideNavItem>

      )
    })
    return (

      <div className='homepage-root'>
        {/* <div className='contain'>
          <h2 className='movies_type'>Upcoming Movies</h2>
          <div className='row'>
            <div className='row__inner'>
              {upcomingMovies}
            </div>
          </div>
        </div > */}

      

            <div className='contain'>
          <h2 className='movies_type'>Now In Theaters</h2>
          <div className='row'>
            <div className='row__inner'>
              {inTheaters}
            </div>
          </div>
        </div >

          <div className='contain'>
          <h2 className='movies_type'>Popular Movies</h2>
          <div className='row'>
            <div className='row__inner'>
              {popularMovies}
            </div>
          </div>
        </div >

        <SideNav
          className='sidenav'
          trigger={<Button >SIDE NAV DEMO</Button>}
          options={{ closeOnClick: true, edge: 'right' }}>

          {userWatchlist}
        </SideNav>
        <div className='footer_img' />

      </div>
    )
  }
}

