import React, { Component } from 'react';
import Navbar from './Components/Nav/Nav'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        {routes}
      </div>
    );
  }
}

export default App;
