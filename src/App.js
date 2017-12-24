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
            {categorys.map(category =>
              <div key={category.id}> 
                <h4>
                  <Link className='catName' to = {`./category/${category.id}`}>
                    {category.title}
                  </Link>
                </h4>
              </div>
              )}
          </div>

          <div className = 'adList'>
          
            {advertisements.map(advertisement =>
              <div className = "each_index_ad" key={advertisement.id}> 
                <img className ="index_ad_photos" src = {`http://localhost:3000${advertisement.picture_data}`} />
                <h1>
                  <Link className='adName' to = {`./advertisements/${advertisement.id}`}>
                    {advertisement.name}
                  </Link>                  
                </h1>
                <h4>Price: {advertisement.price}</h4>                
              </div>
              )}
          </div>
        </div>
      );
  }
}

export default App;