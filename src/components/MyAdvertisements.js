import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import '../Main.css'

export default class MyAdvertisements extends Component{

	constructor(props){
		super(props);
		this.state = {
			advertisements: []
		};
	}

	componentWillMount(){
		var user_ad = null;
		const location = this.props.match.params.id;
		const id = localStorage.getItem('id');
		axios.defaults.headers['Authorization'] = localStorage.getItem('token');
		axios.get('http://localhost:3000/api/v1/user_advertisements.json')
		.then((response)=>{
			this.setState({advertisements: response.data})
		})
		.catch(function(error){
			console.log(error);
		});
	}

	render(){
		let advertisements = this.state.advertisements;
		
		return(
			<div className = "adList">
				{advertisements.map(advertisement =>
					<div key={advertisement.id}> 
						<img className ="index_ad_photos" src = {`http://localhost:3000${advertisement.picture_data}`} />
						<h1>
							<Link className='adName' to = {`./advertisements/${advertisement.id}`}>
								{advertisement.name}
							</Link>
						</h1>
						 
					</div>
				)}
			</div>
		)
	}
}