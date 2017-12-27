import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Button, Alert, Grid, Row, Col} from 'react-bootstrap';

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
		var user_detail = null;
		var parse = null;
		var checkadmin = null;
		var user_name = null;
		var user_id = null;
		
	    axios.post('http://localhost:3000/api/v1/authenticate', {email: umail, password: upass})	    
	    .then((response) => {
	      localStorage.setItem('token', response.data.auth_token);
	      axios.defaults.headers['Authorization'] = localStorage.getItem('token');
	      axios.get('http://localhost:3000/api/v1/current_users.json')
	     	.then((response) => {
	     		user_detail = JSON.stringify(response.data)
	     		localStorage.setItem('current_user', user_detail);
	     		parse = JSON.parse(user_detail);
	     		checkadmin = parse.admin;
	     		user_name = parse.firstname;
	     		user_id = parse.id;
	     		console.log(checkadmin);
	     		localStorage.setItem('admin', checkadmin)
	     		localStorage.setItem('user', user_name)
	     		localStorage.setItem('id', user_id)
	     		window.location = '/'
	     	})
	     	.catch(function (error) {
		      console.log(error.response.data);
		    });
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
				<Grid>
					<Row className = "show-grid">
						<div className = "container">
							<Col xs={6} mdPush={5}>
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
							</Col>
						</div>
					</Row>
				</Grid>
			</div>
		)
	}
}