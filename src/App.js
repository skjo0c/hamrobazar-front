import React, { Component } from 'react';
import './Main.css';
import axios from 'axios';

class App extends Component {
  render() {
	axios.get('http://localhost:3000/advertisements')
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
    return (
      <div className="App">
        <br/> <br/>
          <h1> Home </h1>
      </div>
    );
  }
}

export default App;
