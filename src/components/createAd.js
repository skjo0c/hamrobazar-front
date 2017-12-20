import React, { Component } from 'react';
import axios from 'axios';
import '../Main.css'
import {Button} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Dropzone from 'react-dropzone';


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
	      	imagePreviewUrl: '',
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

    onDrop(picture_data){
    	this.setState({picture_data})
    }

	createAdvertisement(event){
		event.preventDefault();
		let name = this.state.name;
		let price = this.state.price;
		let description = this.state.description;
		let picture_data = this.state.picture_data;
		let category = this.state.category;
		let category_id = category.map(function(request){return request.value}) 
		axios.defaults.headers['Authorization'] = localStorage.getItem('token');
	    axios.post('http://localhost:3000/api/v1/advertisements', {name: name, price: price, description: description, picture_data: picture_data, category_id: category_id})
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
				<form onSubmit = {this.createAdvertisement} encType='multipart/form-data'>
					<h3 className="log-name">Create Advertisement</h3>
					<input type = "text" className= "create-form" value={this.state.name} onChange = {this.handlenameChange.bind(this)} placeholder = "Name"/>
					<br/><br/>
					<input type = "number" className= "create-form" value={this.state.price} onChange = {this.handlepriceChange.bind(this)} placeholder = "Price"/>
					<br/><br/>
					<textarea className= "form-description" value={this.state.description} onChange = {this.handledescriptionChange.bind(this)} placeholder = "Description"/>
					<br/><br/>
					<Dropzone 
					  onDrop={this.onDrop.bind(this)} 
					  multiple 
					  accept="image/*" 
					  // style={styles.dropzone}
					> 	<p>Drop your files or click here to upload</p>
					</Dropzone>
					<ul>{this.state.picture_data.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}</ul>
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