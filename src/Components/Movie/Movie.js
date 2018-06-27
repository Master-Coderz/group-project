import React, {Component} from 'react'
import axios from 'axios'
export default class Movie extends Component {


componentDidMount = async() => {
  try {
    let res = await axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    console.log(res)
  } catch (err) {
    console.error('componentDidMount failed in Movie.js:', err)
  }
}

  render() {
    return(
      <div>
        <h1>I am Movie Page</h1>
      </div>
    )
  }
}