import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './Main.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      advertisements: []
    };
  }

  componentWillMount(){
    
    function getAdvertisements(){
      return axios.get('http://localhost:3000/api/v1/advertisements.json');
    }

    function getCategories(){
      return axios.get('http://localhost:3000/api/v1/categories.json');
    }

    axios.all([getAdvertisements(), getCategories()])
    .then(axios.spread(function(advertisementResponse, categoriesResponse){
      this.setState({advertisements: advertisementResponse.data.data})
      this.setState({categories: categoriesResponse.data.data})
    }))
    // axios.get('http://localhost:3000/api/v1/advertisements.json')
    // .then((response) => {
    //   this.setState({advertisements: response.data.data});
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  render() {
    let advertisements = this.state.advertisements
      return (
        <div className = "container">

          <div className = "catList">
            
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className = 'adList'>
          
            {advertisements.map(advertisement =>
              <div key={advertisement.id}> 
                <h1>
                  <Link className='adName' to = {`./advertisements/${advertisement.id}`}>
                    {advertisement.name}
                  </Link>
                </h1>
                <h4>{advertisement.price}</h4>
              </div>
              )}
          </div>
        </div>
      );
  }
}

export default App;