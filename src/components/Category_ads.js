import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import '../Main.css';

export default class Category_ads extends Component{

	constructor(props){
		super(props);
		this.state = {
		  advertisements: [],
		  categorys: []
		};
	}

	componentWillMount(){

		const location = this.props.match.params.id;
		
		axios.get('http://localhost:3000/api/v1/advertisements?category_id=' + location)
		.then((response)=>{
			this.setState({advertisement: response.data.data });
		})
		.catch(function(error){
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

	render(){
		let advertisements = this.state.advertisements;
		let categorys = this.state.categorys;
		return(
			<div>			    
			      return (
			        <div className = "container">

			          <div className = "catList">
			            {categorys.map(category =>
			              <div key={category.id}> 
			                <h4>
			                  <Link className='catName' to = {`./${category.id}`}>
			                    {category.title}
			                  </Link>
			                </h4>
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
			</div>
		)
	}
}