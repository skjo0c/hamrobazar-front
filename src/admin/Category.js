import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import '../Main.css';
import axios from 'axios';

export default class Category extends Component{

	constructor(){
		super();
		this.state={
			title: ''
		}
		this.createCat = this.createCat.bind(this)
	}

	handletitleChange(event){
		this.setState({title: event.target.value})
	}

	createCat(event){
		event.preventDefault();
		let title = this.state.title;

		axios.post('http://localhost:3000/api/v1/categories', {title: title})
		.then((response) => {
			window.location = "/admin"
		})
		.catch(function(error){
			console.log(error)
		})

	}

	render(){
		return(
			<div className = "Category">
				<b>Hello Admin</b>
				<br/><br/>
				<Form inline onSubmit={this.createCat}>
					<FormGroup controlId="formInlineCategory">
					{' '}
					<FormControl type="text" placeholder="Category Name" value = {this.state.title} onChange = {this.handletitleChange.bind(this)} />
					</FormGroup>
					{' '}
					<Button type="submit">
						Add Category
					</Button>
				</Form>

				<div className = "Catgories">
					
				</div>
			</div>
		)
	}
}