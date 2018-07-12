import React, { Component } from "react";
import axios from "axios";
import './SearchPeople.css'

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
    axios.get(`https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${this.state.searchInput}&page=1&include_adult=false`).then(res => {
      console.log(res)
      this.setState({ searchResults: res.data.results })
    })
  }

  render() {

    let searchResults = this.state.searchResults.map((e, i) => {
      return (
        <div className='search_link_container' key={e.id}>
          <a className='search_link' href={`/#/people/${e.id}`}>{e.name}</a>
        </div>)
    })

    console.log(searchResults)
    return (
      <div className="AllMovies-search">
      <span className="search_icon"></span>
        <input
          className="search_input"
          placeholder="Search for a person..."
          onChange={e => this.handleSearch('searchInput', e.target.value)}
          value={this.state.searchInput}
        />
        {this.state.searchInput.length>0?<div className={searchResults.length>0?"movies_search_results":"movies_search_results_hidden"}>
          {searchResults}
        </div>:null}
      </div >
    );
  }
}


