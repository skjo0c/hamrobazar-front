import React, { Component } from 'react';
import axios from 'axios';
import '../Main.css'

export default class createAd extends Component{

	constructor(){
		super();
		this.state = {
			name: '',
			price: '',
			description: ''
		}
		this.createAdvertisement = this.createAdvertisement.bind(this);
	}

	handlenameChange(event){
		this.setState({name: event.target.value})
	}

	handlepriceChange(event){
		this.setState({price: event.target.value})
	}

	handledescriptionChange(event){
		this.setState({description: event.target.value})
	}

	createAdvertisement(event){
		event.preventDefault();
		let name = this.state.name;
		let price = this.state.price;
		let description = this.state.description;

	    axios.post('http://localhost:3000/api/v1/create', {name: name, price: price, description: description})
	    .then((response) => {
	      window.location = '/'
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	}

	render(){
		return(
			<div className="createAd-form">
				<form onSubmit = {this.createAdvertisement} className="form">
					<h3 className="log-name">Create Advertisement</h3>
					<input type = "text" value={this.state.name} onChange = {this.handlenameChange.bind(this)} placeholder = "Name"/>
					<br/><br/>
					<input type = "number" value={this.state.price} onChange = {this.handlepriceChange.bind(this)} placeholder = "Price"/>
					<br/><br/>
					<textarea value={this.state.description} onChange = {this.handledescriptionChange.bind(this)} placeholder = "Description"/>
					<br/><br/>
					<input type="submit" value="Log In" />
					
				</form>
			</div>
		)
	}
}