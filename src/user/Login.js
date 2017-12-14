import React, { Component } from 'react';
import axios from 'axios';
// import {Link, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// import {Button, Well} from 'react-bootstrap';

import '../Main.css'

export default class Login extends Component{
	constructor(){
		super();
		this.state = {
			umail: '',
			upass: ''
		}
		this.logUser = this.logUser.bind(this);
	}

	handleumailChange(event){
		this.setState({umail: event.target.value})
	}

	handleupassChange(event){
		this.setState({upass: event.target.value})
	}

	logUser(event){
		event.preventDefault();
		let umail = this.state.umail;
		let upass = this.state.upass;

		
	    axios.post('http://localhost:3000/api/v1/authenticate', {email: umail, password: upass})	    
	    .then((response) => {
	      localStorage.setItem('token', response.data.auth_token);
	      window.location = '/'
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	}

	render(){
		return(
			<div className = "LoginPage"> 
				<form onSubmit = {this.logUser}>
					<h3 className="log-name">Login Page</h3>
					<input type = "text" value={this.state.umail} onChange = {this.handleumailChange.bind(this)} placeholder = "Email"/>
					<br/><br/>
					<input type = "password" value={this.state.upass} onChange = {this.handleupassChange.bind(this)} placeholder = "Password"/>
					<br/><br/>
					<input type="submit" value="Log In" />
					
				</form>
			</div>
		)
	}
}