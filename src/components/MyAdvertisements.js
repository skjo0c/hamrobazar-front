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
		const location = this.props.match.params.id;
		const id = localStorage.getItem('id');
		axios.get('http://localhost:3000/api/v1/advertisements?user_id:' + id)
		.then((response)=>{
			this.setState({advertisements: response.data.data });
		})
		.catch(function(error){
			console.log(error);
		});
	}

	render(){
		let advertisements = this.state.advertisements;
		
		return(
			<div>
				<br/><br/><br/><br/>
				{advertisements.map(advertisement =>
					<div key={advertisement.id}> 
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