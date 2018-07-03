import React, { Component } from "react";
import axios from "axios";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      searchResults: []
    };
  }

  handleSearch(key, val) {
    this.setState({ [key]: val })
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${this.state.searchInput}&page=1&include_adult=false`).then(res => {
      console.log(res)
      this.setState({ searchResults: res.data.results })
    })
  }

  render() {

    let searchResults = this.state.searchResults.filter((e, i) => {
      return (e.media_type !== 'tv')
    }).map((e, i) => {
      return(
      <div key={e.id}>
        <a href={`/#/movies/${e.id}`}>{e.title}</a>
      </div>)
    })

    console.log(searchResults)
    return (
      <div>
        <div className="AllMovies-search">
          <input
            placeholder="Search for a movie or a person..."
            className="AllMovies-search-bar"
            onChange={e => this.handleSearch('searchInput', e.target.value)}
            value={this.state.searchInput}
          />
        </div>
        <div className='search-results'>
          {searchResults}
        </div>
      </div >
    );
  }
}


