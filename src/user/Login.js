import React, { Component } from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Button, Well} from 'react-bootstrap';

import '../Main.css'

export default class Login extends Component{
	constructor(){
		super();
		this.state = {
			umail: '',
			upass: ''
		}
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


	}

	render(){
		return(
			<div className = "LoginPage"> 
				<form onSubmit = {this.logUser}>
					<h3 className="log-name">Login Page</h3>
					<input type = "text" value={this.state.umail} onChange = {this.handleumailChange} placeholder = "Email"/>
					<br/><br/>
					<input type = "text" value={this.state.upass} onChange = {this.handleupassChange} placeholder = "Password"/>
					<br/><br/>
					<Button className = "log-btn">Login</Button>
				</form>
			</div>
		)
	}
}