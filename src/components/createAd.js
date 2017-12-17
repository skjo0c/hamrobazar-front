import React, { Component } from 'react';
import axios from 'axios';
import '../Main.css'
import {Button} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class createAd extends Component{

	constructor(){
		super();
		this.state = {
			name: '',
			price: '',
			description: '',
	      	selected_value: "one",
	      	tags: [],
	      	async_test: [],
	      	options: [
	          { value: 'one', label: 'One' },
	          { value: 'two', label: 'Two' }
	      	]
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

		axios.defaults.headers['Authorization'] = localStorage.getItem('admin');
	    axios.post('http://localhost:3000/api/v1/advertisements', {name: name, price: price, description: description})
	    .then((response) => {
	      window.location = '/'
	    })
	    .catch(function (error) {
	      console.log(error.response)
	    });
	}

	render(){

    const getOptions = (input) => {
    axios.defaults.headers['Authorization'] = localStorage.getItem('token');
      return axios.get('http://localhost:3000/api/v1/categorys.json')
        .then(function (response) {
          let options = response.data.data.map( category => ({ value: category.id, label: category.title }));
          return { options };
        })
        .catch(function (error) {
          console.log(error);
        });
    }
		return(
			<div className="createAd-form">
				<form onSubmit = {this.createAdvertisement}>
					<h3 className="log-name">Create Advertisement</h3>
					<input type = "text" className= "create-form" value={this.state.name} onChange = {this.handlenameChange.bind(this)} placeholder = "Name"/>
					<br/><br/>
					<input type = "number" className= "create-form" value={this.state.price} onChange = {this.handlepriceChange.bind(this)} placeholder = "Price"/>
					<br/><br/>
					<textarea className= "form-description" value={this.state.description} onChange = {this.handledescriptionChange.bind(this)} placeholder = "Description"/>
					<br/><br/>
			        <Select.Async
			        	className = "category_select"
			            name="form-field-name"
			            multi={true}
			            value={this.state.async_test}
			            loadOptions={getOptions}
			            onChange={e => this.setState({async_test: e})}
			        />

					<Button className = "log-form create-btn" type = "submit" bsStyle = "primary"> Create Advertisement </Button>
				</form>
			</div>
		)
	}
}