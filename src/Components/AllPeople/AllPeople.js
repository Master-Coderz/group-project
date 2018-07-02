import React, { Component } from "react";
import axios from "axios";
import './AllPeople.css';
import { Link } from 'react-router-dom';



export default class AllPeople extends Component {
  constructor() {
    super();

    this.state = {
      people: []
    };
  }
  componentDidMount = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${
        process.env.REACT_APP_API_KEY
        }&language=en-US&page=1`
      );
      this.setState({ people: res.data.results });
    } catch (err) {
      console.error("componentDidMount failed in AllPeople.js:", err);
    }
  };

  render() {
    const people = this.state.people.map((e, i) => {
      return (
        <div className='all_people_individual' key={e.id}>
          <Link to={`/people/${e.id}`}>
            <img className = 'all_people_img'
              src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
              width="185px"
              height="278px"
              alt=''
              onerror="this.onerror=null;this.src='http://futureuniversity.com/wp-content/themes/envision/lib/images/default-placeholder-700x934.png';"
              />
          </Link>
          <h3 className = 'all_people_name'>{e.name}</h3>

        </div>)

    });

    return (
      <div className="All_People_Root">
        <div className="AllMovies-search">
          <input
            placeholder="Search for a movie or a person..."
            className="AllMovies-search-bar"
          />
        </div>
      <div className='all_people_container'>
        {people}
      </div>
      </div>
    )
  }
}
