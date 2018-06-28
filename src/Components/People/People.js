import React, { Component } from 'react'
import axios from 'axios'


export default class People extends Component {
  constructor() {
    super()

    this.state = {
      person: {}
    }
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=movie_credits`)
      this.setState({ person: res.data })
    } catch (err) {
      console.error('componentDidMount failed in People.js:', err)
    }
  }

  render() {
    return (
      <div>
        ff
        <img src={`https://image.tmdb.org/t/p/w500/${
          this.state.person.profile_path
          }`} alt=''/>
      </div>
    )
  }
}