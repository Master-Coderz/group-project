import React, { Component } from "react";
import axios from "axios";
import './Search.css'

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
      return (e.media_type !== 'tv' && e.original_language === 'en')
    }).map((e, i) => {
      return (
        <div className='search_link_container' key={e.id}>
          <img className='search_icon' src="./../../Assets/search.png" alt="" />
          <a className='search_link' href={`/#/movies/${e.id}`}>{e.title}</a>
          <hr />
        </div>)
    })

    console.log(searchResults)
    return (
      <div className="AllMovies-search">
        <span className="search_icon"></span>
        <input
          className="search_input"
          placeholder="Search for a movie..."
          onChange={e => this.handleSearch('searchInput', e.target.value)}
          value={this.state.searchInput}
        />
        {this.state.searchInput.length > 0 ? <div className={searchResults.length > 0 ? "movies_search_results" : "movies_search_results_hidden"}>
          {searchResults}
        </div> : null}
      </div >
    );
  }
}


