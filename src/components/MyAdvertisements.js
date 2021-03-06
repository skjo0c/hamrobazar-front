import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

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
		// var user_ad = null;
		// const location = this.props.match.params.id;
		// const id = localStorage.getItem('id');
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
			<div className = "myAdvertisements">
				{advertisements.map(advertisement =>
					<div className = "my_each_advertisements" key={advertisement.id}> 
						<img className ="index_ad_photos" src = {`http://localhost:3000${advertisement.picture_data}`} />
						<h1>
							<Link className='adName' to = {`./advertisements/${advertisement.id}`}>
								{advertisement.name}
							</Link>
						</h1>
						<Button onClick={this.edit_item} id = {advertisement.id} bsStyle = "success" bsSize = "small" > Edit </Button>
						<Button onClick={this.delete_item} id = {advertisement.id} bsStyle = "danger" bsSize = "small" > Delete </Button>
					</div>
				)}
			</div>
		)
	}

	delete_item(event){
		console.log(event.target.id)
		let id = event.target.id
		var confirmation = window.confirm("Are you sure you want to delete?")
		if(confirmation == true){
			axios.defaults.headers['Authorization'] = localStorage.getItem('token');
			axios.delete('http://localhost:3000/api/v1/advertisements/'+id)
			.then((response)=>{
				window.location ='/'
			})
			.catch(function(error){
				console.log(error);
			});
		}
		else{
			window.location = '/myadvertisements'
		}
	}

	edit_item(event){
		console.log(event.target.id)
		//here need to open up a BOOTSTRAP MODAL
		let id = event.target.id
		// axios.patch('http://localhost:3000/api/v1/advertisements/'+id)
		// .then((response)=>{
		// 	window.location ='/'
		// })
		// .catch(function(error){
		// 	console.log(error);
		// });
	}
}