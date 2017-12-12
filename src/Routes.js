import React, {Component} from 'react';
import Login from './user/Login';
import App from './App';
import View from './components/View';
import NotFound from './components/NotFound';
import About from './components/About';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {NavLink} from 'react-router-dom';
import {Navbar, Grid, Button} from 'react-bootstrap'
import './Main.css';


export default class Routes extends Component{

	render(){

		return(
			<Router>
				<div className = "nav-container">
			        <Navbar inverse fixedTop>
			          <Grid>
			            <Navbar.Header>
			              <Navbar.Brand>
			                <NavLink className= "nav-item" to="/">HamroBazar</NavLink>
			              </Navbar.Brand>
			              <Navbar.Toggle />
			            </Navbar.Header>

			            <NavLink className = "nav-item" to = "/components/About"> About </NavLink>

			            <Button className = "pull-right addButton" bsStyle = "success" onClick = {this.checkStorage}>
			            	Add New Ad
			            </Button>

			          </Grid>
			        </Navbar>

			        <Switch>
			        	<Route exact path = '/login' component = {Login} />
					    <Route exact path = '/' component={App} />
					    <Route exact path = '/advertisements/:id' component = {View}/>
						<Route exact path = '/components/About' component={About} />
						<Route component = {NotFound}/>
					</Switch>
				</div>

			</Router>
		);
	}

	checkStorage(){
		// console.log(localStorage.getItem('name'))
		if(localStorage.getItem('name') === "" || localStorage.getItem('name') === null){
			console.log("empty")
		}
		else{
			console.log(localStorage.getItem('name'))
		}
	}
}