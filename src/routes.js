import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage'
import AllMovies from './Components/AllMovies/AllMovies'
import AllPeople from './Components/AllPeople/AllPeople'

export default(
  <Switch>
    <Route exact path='/' component={Homepage}/>
    <Route path='/popular/movies' component={AllMovies}/>
    <Route path='/popular/people' component={AllPeople}/>
  </Switch>
)