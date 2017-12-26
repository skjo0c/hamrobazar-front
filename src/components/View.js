import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Panel} from 'react-bootstrap'

import '../Main.css'

export default class View extends Component{

	constructor(props){
		super(props);
		this.state = {
			advertisement: {categories: []}
			// categorys: []
		};
	}

	componentWillMount(){
		const location = this.props.match.params.id;
		axios.get('http://localhost:3000/api/v1/advertisements/' + location)
		.then((response)=>{
			this.setState({advertisement: response.data.data });
		})
		.catch(function(error){
			console.log(error);
		});
		// axios.get('http://localhost:3000/api/v1/categorys?advertisement_id=' + location)
		// .then((response) => {
		// 	this.setState({categorys: response.data.data})
		// })
		// .catch(function(error){
		// 	console.log(error);
		// });
	}

	render(){
		let advertisement = this.state.advertisement
		// let categorys = this.state.categorys
		let firstname = `${advertisement.firstname}`
		let contact = `${advertisement.contact}`
		let categorys = advertisement.categories
		let picture_data = `http://localhost:3000${advertisement.picture_data}`;
		return(
			<div className = "details">
				<Panel header = {advertisement.name}>
					<div className = "detail_part">
						<h4>Sold by : {firstname}</h4>
						<h4>Price: {advertisement.price}</h4>
						<h4>Description: {advertisement.description}</h4>
						<h4> Contact : {contact} </h4>
						<h4> Category: {categorys.map(category =>
								category + "|"
							)}
						</h4>
					</div>
					<div className = "detail_pic">
						<img className = "detail_picture" src = {picture_data} />
					</div>	
				</Panel>

				<Link to = '/'>Back</Link>
			</div>
			
		)
	}
}

