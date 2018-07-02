import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class People extends Component {
  constructor() {
    super()

    this.state = {
      person: {},
      featuredMovies: []
    }
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=movie_credits`)
      this.setState({ person: res.data })
      this.setState({ featuredMovies: res.data.movie_credits.cast })
    } catch (err) {
      console.error('componentDidMount failed in People.js:', err)
    }
  }




  render() {

    const featuredMovies = this.state.featuredMovies.sort((a, b) => {
      return b.popularity - a.popularity
    }).filter((e, i) => i < 8)
      .map(e => {
        return (
          <div key={e.id}>
          <Link to={`/movies/${e.id}`}>
            <h1>{e.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500/${
              e.poster_path
              }`} width='200px' alt=''

              />
          </Link>
          </div>
        );
      });

    return (
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${
          this.state.person.profile_path
          }`} alt='' />
        {featuredMovies}
      </div>
    )
  }
}