import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Button, Alert} from 'react-bootstrap';

import '../Main.css'

export default class Login extends Component{
	constructor(){
		super();
		this.state = {
			umail: '',
			upass: '',
			alertVisible: false
		}
		this.logUser = this.logUser.bind(this);
		this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
	}

	handleAlertDismiss(event){
		this.setState({alertVisible: false})
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
		var self = this;
		
	    axios.post('http://localhost:3000/api/v1/authenticate', {email: umail, password: upass})	    
	    .then((response) => {
	      localStorage.setItem('token', response.data.auth_token);
	      axios.get('http://localhost:3000/api/v1/current_users')
	     	.then((response) => {
	     		console.log(response.data.current_users)
	     		localStorage.setItem('admin', response.data.current_users);
	     	})
	     	.catch(function (error) {
		      console.log(error.response.data);
		    });
	      window.location = '/'
	    })
	    .catch(function (error) {
	      console.log(error.response.data);
	      self.setState({alertVisible: true});
	    });
	}

	render(){
		if(this.state.alertVisible){
			return(
				<div>
					<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} className= "error_message">
					 	<h4>Username and Password didn't match</h4>
					</Alert>


					<div className = "LoginPage"> 
						<form onSubmit = {this.logUser}>
							<h3 className="log-name">Login Page</h3>
							<input className = "log-form" type = "text" value={this.state.umail} onChange = {this.handleumailChange.bind(this)} placeholder = "Email"/>
							<br/><br/>
							<input className = "log-form" type = "password" value={this.state.upass} onChange = {this.handleupassChange.bind(this)} placeholder = "Password"/>
							<br/><br/>
							<Button className = "log-form log-btn" type = "submit" bsStyle = "primary" bsSize = "large" block> Log In </Button>
						</form>
					</div>
				</div>
			)
		}
		return(
			<div>
				<div className = "LoginPage"> 
					<form onSubmit = {this.logUser}>
						<h3 className="log-name">Login Page</h3>
						<input className = "log-form" type = "email" value={this.state.umail} onChange = {this.handleumailChange.bind(this)} placeholder = "Email"/>
						<br/><br/>
						<input className = "log-form" type = "password" value={this.state.upass} onChange = {this.handleupassChange.bind(this)} placeholder = "Password"/>
						<br/><br/>
						<Button className = "log-form log-btn" type = "submit" bsStyle = "primary" bsSize = "large" block> Log In </Button>
						<br/><br/>
						<p>Not a user?</p><Link to = "/signup"><Button type = "submit" bsStyle = "primary"> Sign Up</Button>
						<br/><br/></Link>
					</form>
				</div>
			</div>
		)
	}
}