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
	      	picture_data: [],
	      	tags: [],
	      	category: [],
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

	handleImage(event){
		let picture_data = new FormData();
		this.setState({picture_data: event.target.files[0]});
	}

	createAdvertisement(event){
		event.preventDefault();
		let name = this.state.name;
		let price = this.state.price;
		let description = this.state.description;
		let picture_data = this.state.picture_data;
		const formData = new FormData();
		let category = this.state.category;
		let category_id = category.map(function(request){return formData.append('category_id[]', request.value);});
		formData.append('file',picture_data);
		formData.append('name', name);
		formData.append('price', price);
		formData.append('description', description);
		axios.defaults.headers['Authorization'] = localStorage.getItem('token');
		const config = {
				headers: { 'content-type': 'multipart/form-data' }
		}
	    axios.post('http://localhost:3000/api/v1/advertisements',formData, config)
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
				<form encType="multipart/form-data" onSubmit = {this.createAdvertisement}>
					<h3 className="log-name">Create Advertisement</h3>
					<input type = "text" className= "create-form" value={this.state.name} onChange = {this.handlenameChange.bind(this)} placeholder = "Name"/>
					<br/><br/>
					<input type = "number" className= "create-form" value={this.state.price} onChange = {this.handlepriceChange.bind(this)} placeholder = "Price"/>
					<br/><br/>
					<textarea className= "form-description" value={this.state.description} onChange = {this.handledescriptionChange.bind(this)} placeholder = "Description"/>
					<br/><br/>
					<input type = "file" onChange={this.handleImage.bind(this)} multiple />
					<br/><br/>
			        <Select.Async
			        	className = "category_select"
			            name="form-field-name"
			            multi={true}
			            value={this.state.category}
			            loadOptions={getOptions}
			            onChange={e => this.setState({category: e})}
			        />

					<Button className = "log-form create-btn" type = "submit" bsStyle = "primary"> Create Advertisement </Button>
				</form>
			</div>
		)
	}
}