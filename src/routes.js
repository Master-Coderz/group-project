import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage'
import TopRatedMovies from './Components/TopRatedMovies/TopRatedMovies'
import PopularMovies from './Components/PopularMovies/PopularMovies'
import UpcomingMovies from './Components/UpcomingMovies/UpcomingMovies'
import NowPlayingMovies from './Components/NowPlayingMovies/NowPlayingMovies'
import AllPeople from './Components/AllPeople/AllPeople'
import Movie from './Components/Movie/Movie'
import People from './Components/People/People'
import Account from './Components/Account/Account'

export default(
  <Switch>
    <Route exact path='/' component={Homepage}/>
    <Route path='/top_rated/movies' component={TopRatedMovies}/>
    <Route path='/popular/movies' component={PopularMovies}/>
    <Route path='/upcoming/movies' component={UpcomingMovies}/>
    <Route path='/now_playing/movies' component={NowPlayingMovies}/>
    <Route path='/popular/people' component={AllPeople}/>
    <Route path='/movies/:id' component={Movie}/>
    <Route path='/people/:id' component={People}/>
    <Route path='/account' component={Account}/>
  </Switch>
)