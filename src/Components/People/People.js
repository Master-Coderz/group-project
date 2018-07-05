import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import "./People.css";

export default class People extends Component {
  constructor() {
    super();

    this.state = {
      person: {},
      featuredMovies: []
    };
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/person/${
        this.props.match.params.id
        }?api_key=${
        process.env.REACT_APP_API_KEY
        }&language=en-US&append_to_response=movie_credits`
      );
      this.setState({ person: res.data });
      this.setState({ featuredMovies: res.data.movie_credits.cast });
    } catch (err) {
      console.error("componentDidMount failed in People.js:", err);
    }
  };

  render() {
    console.log(this.state.person)
    const featuredMovies = this.state.featuredMovies
      .sort((a, b) => {
        return b.popularity - a.popularity;
      })
      .filter((e, i) => i < 8)
      .map(e => {
        return (
          <div className='featured_movie_container' key={e.id}>
            <Link to={`/movies/${e.id}`}><img
              src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              width="90%"
              height="90%"
              alt=""
            /></Link>
            <p className='featured_title'>{e.title}</p>
          </div>
        );
      });
    console.log(this.state.featuredMovies.length)
    return (
      <div className='person_root'>
        <div className="person_bio_container">
          <div className="person_img_container">
            <img
              className="person_img"
              src={`https://image.tmdb.org/t/p/w500/${
                this.state.person.profile_path
                }`}
              alt=""
            />
          </div>
          <div className="bio">
            <div className="person_title">
              <h2>{this.state.person.name}</h2>
              <span className="social_links">
                <span className="social social_facebook" />
                <span className="social social_twitter" />
                <span className="social social_instagram" />
              </span>
            </div>
            <div className="overview">
              <p className="overview_header">Biography</p>
              <p className='person_biography'>{this.state.person.biography}</p>
            </div>
          </div>
        </div>
        <div className="bottom_container">
          <div className="info_column">
            <div className="info_column_content">
              <p className="personal_info_header">Personal Info</p>
              <p className="personal_info_p"><p>Gender</p><p className="personal_fact">{this.state.person.gender === 2 ? 'Male' : 'Female'}</p></p>
              <p className="personal_info_p"><p>Place Of Birth</p><p className="personal_fact">{this.state.person.place_of_birth}</p></p>
              <p className="personal_info_p"><p>Official Site</p><p className="personal_fact">{this.state.person.homepage ? this.state.person.homepage : '--'}</p></p>
              <p className="personal_info_p"><p>Known Credits</p><p className="personal_fact">{this.state.featuredMovies.length ? this.state.featuredMovies.length : '--'}</p></p>
              <p className="personal_info_p">{this.state.person.known_for}</p>
              <p className="personal_info_p">{this.state.person.known_for}</p>
            </div>
          </div>
          <div className="featured_movies_container">
            {featuredMovies}
          </div>
        </div>
      </div>
      // <div className="person_root">
      // <section className="images_container">
      //   <section className="images">
      //     <img
      //       className="person_img"
      //       src={`https://image.tmdb.org/t/p/w500/${
      //         this.state.person.profile_path
      //       }`}
      //       alt=""
      //     />
      //     <section className="bio">
      // <div className="person_title">
      //   <h2>{this.state.person.name}</h2>
      //   <span className="social_links">
      //     <span className="social social_facebook" />
      //     <span className="social social_twitter" />
      //     <span className="social social_instagram" />
      //   </span>
      // </div>

      //       <h3>Biography</h3>
      //       <p>{this.state.person.biography}</p>
      //     </section>
      //   </section>
      //   </section>
      //   <section className="middle">
      //   <div className="person_info">
      //   <div className="person_info_content">
      // <p className="personal_info_header">Personal Info</p>
      //     <p className="personal_info_p"><p>Gender</p>{this.state.person.gender===2?'Male':'Female'}</p>
      //     <p className="personal_info_p"><p>Place Of Birth</p>{this.state.person.place_of_birth}</p>
      //     <p className="personal_info_p"><p>Official Site</p>{this.state.person.homepage?this.state.person.homepage:'--'}</p>
      //     <p className="personal_info_p"><p>Known Credits</p>{this.state.person.homepage?this.state.person.homepage:'--'}</p>
      //     <p className="personal_info_p">{this.state.person.known_for}</p>
      //     <p className="personal_info_p">{this.state.person.known_for}</p>
      // </div>
      //   </div>
      //   <div className="featured_movies_container">
      //   <h1>Known For</h1>
      //   <div className="featured_movies">
      //   {featuredMovies}
      //   </div>
      //   </div>
      //   </section>
      // </div>
    );
  }
}
