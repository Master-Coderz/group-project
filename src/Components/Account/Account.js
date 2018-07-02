import React, { Component } from "react";
import axios from 'axios'

export default class Account extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: []
    };
  }

  componentDidMount(){
    axios.get('/api/getUser')
    .then((res) => {
      this.setState({
        userInfo: res.data
      })
    } )
  }
  render() {
    console.log(this.state.userInfo)

    const userInfo = this.state.userInfo.map((e, i) => {
      return(
        <div key={e.id}>
        <h1>{e.firstname}</h1>
        <h1>{e.lastname}</h1>
        <img src={e.profilepic}/>

        </div>
      )
    } )
   return (
     <div>
    {userInfo}
     </div>
   )
  }
}
