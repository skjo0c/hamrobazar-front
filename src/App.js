import React, { Component } from 'react';
import './Main.css';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      advertisements: []
    };
  }

  componentWillMount(){
    axios.get('http://localhost:3000/api/v1/advertisements.json')
    .then((response) => {
      this.setState({advertisements: response});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let advertisements = this.state.advertisements
      return (
        <div>
          {advertisements.map(advertisement => <h1>{advertisement.name}</h1>)}
        </div>
      );
  }
}

export default App;
