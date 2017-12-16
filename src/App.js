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
      advertisements: [],
      categorys: []
    };
  }

  componentWillMount(){
    
    // function getAdvertisements(){
    //   return axios.get('http://localhost:3000/api/v1/advertisements.json');
    // }

    // function getCategorys(){
    //   return axios.get('http://localhost:3000/api/v1/categorys.json');
    // }

    // axios.all([getAdvertisements(), getCategorys()])
    // .then(axios.spread(function(advertisementResponse, categorysResponse){
    //   this.setState({advertisements: advertisementResponse.data.data})
    //   this.setState({categorys: categorysResponse.data.data})
    // }))
    // .catch(function (error) {
    //   console.log(error);
    // });
    axios.get('http://localhost:3000/api/v1/advertisements.json')
    .then((response) => {
      this.setState({advertisements: response.data.data});
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://localhost:3000/api/v1/categorys.json')
    .then((response) => {
      this.setState({categorys: response.data.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let advertisements = this.state.advertisements
    let categorys = this.state.categorys
      return (
        <div className = "container">

          <div className = "catList">
            {categorys.map(advertisement =>
              <div key={categorys.id}> 
                <h1>
                  <Link className='adName' to = {`./categorys/${categorys.id}`}>
                    {categorys.name}
                  </Link>
                </h1>
                <h4>{categorys.price}</h4>
              </div>
              )}
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