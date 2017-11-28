import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import View from './components/View';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Jumbotron} from 'react-bootstrap'

import './Main.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      advertisements: []
    };
  }

  componentWillMount(){
    axios.get('http://localhost:3000/api/v1/advertisements.json')
    .then((response) => {
      this.setState({advertisements: response.data.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let advertisements = this.state.advertisements
      return (
        <Jumbotron>
          <div>
          <br/><br/><br/>
            {advertisements.map(advertisement =>
              <div key={advertisement.id}> 
                <h1>
                  <Link className='adName' to = {`./Advertisement/${advertisement.id}`}>
                    {advertisement.name}
                  </Link>
                </h1>
                <h4>{advertisement.price}</h4>
              </div>
              )}
          </div>
        </Jumbotron>
      );
  }
}

export default App;