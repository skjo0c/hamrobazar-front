import React, { Component } from 'react';
import axios from 'axios';
// import {Link, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Button, Grid, Row, Col} from 'react-bootstrap';

import '../Main.css'

export default class SignUp extends Component{
	constructor(){
		super();
		this.state = {
			fname: '',
			lname: '',
			umail: '',
			upass: '',
			ucpass: '',
			umobile: '',
			profile_pic: [],
			imagePreviewUrl: ''
		}
		this.createUser = this.createUser.bind(this);
	}

	handlefnameChange(event){
		this.setState({fname: event.target.value})
	}

	handlelnameChange(event){
		this.setState({lname: event.target.value})
	}

	handleumailChange(event){
		this.setState({umail: event.target.value})
	}

	handleupassChange(event){
		this.setState({upass: event.target.value})
	}

	handleucpassChange(event){
		this.setState({ucpass: event.target.value})
	}

	handleumobileChange(event){
		this.setState({umobile: event.target.value})
	}

	handlepp(event){
		let profile_pic = new FormData();
 		this.setState({profile_pic: event.target.files[0]});
	}

	createUser(event){

		event.preventDefault();
		let fname = this.state.fname;
		let lname = this.state.lname;
		let umail = this.state.umail;
		let upass = this.state.upass;
		let ucpass = this.state.ucpass;
		let umobile = this.state.umobile;
		let profile_pic = this.state.profile_pic;
		let formData = new FormData();
		formData.append('firstname', fname)
		formData.append('lastname', lname)
		formData.append('email', umail)
		formData.append('password', upass)
		formData.append('password_confirmation', ucpass)
		formData.append('mobile', umobile)
		formData.append('file', profile_pic)
		
		axios.defaults.headers['Authorization'] = localStorage.getItem('token');
		const config = {
			headers: {'content-type' : 'multipart/form-data'}
		}
	    axios.post('http://localhost:3000/api/v1/authenticate', formData, config)	    
	    .then((response) => {
	    	localStorage.setItem('token', response.data.auth_token);
	      axios.defaults.headers['Authorization'] = localStorage.getItem('token');
	    	window.location('/login')
	    })
	    .catch(function (error) {
	      console.log(error.response.data);
	    });
	}

	render(){
		let {imagePreviewUrl} = this.state;
		let $imagePreview = null;

	   if (imagePreviewUrl) {
	      $imagePreview = (<img src={imagePreviewUrl} />);
	    } else {
	      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
	    }

		return(
			<div>
				<Grid>
					<Row className = "show-grid">
						<div className = "container">
							<Col xs={6} mdPush={5}>
								<div className = "SignUpPage"> 
									<form onSubmit = {this.createUser}>
										<h3 className="log-name">SignUp Page</h3>
										<input className = "log-form" type = "text" value={this.state.fname} onChange = {this.handlefnameChange.bind(this)} placeholder = "First Name"/>
										<br/><br/>
										<input className = "log-form" type = "text" value={this.state.lname} onChange = {this.handlelnameChange.bind(this)} placeholder = "Last Name"/>
										<br/><br/>
										<input className = "log-form" type = "email" value={this.state.umail} onChange = {this.handleumailChange.bind(this)} placeholder = "Email"/>
										<br/><br/>
										<input className = "log-form" type = "password" value={this.state.upass} onChange = {this.handleupassChange.bind(this)} placeholder = "Password"/>
										<br/><br/>
										<input className = "log-form" type = "password" value={this.state.ucpass} onChange = {this.handleucpassChange.bind(this)} placeholder = "Confirmation Password"/>
										<br/><br/>
										<input className = "log-form" type = "number" value={this.state.umobile} onChange = {this.handleumobileChange.bind(this)} placeholder = "Mobile Number"/>
										<br/><br/>
										<input type = "file" onChange={this.handlepp.bind(this)} />
										<br/><br/>
										<Button className = "log-form signup-btn" type = "submit" bsStyle = "primary" bsSize = "large" block> Sign Up</Button>						
									</form>
								</div>
							</Col>
						</div>
					</Row>
				</Grid>
			</div>
		)
	}
}