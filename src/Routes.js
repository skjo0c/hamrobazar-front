import React, {Component} from 'react';
import Login from './user/Login';
import SignUp from './user/Signup';
import App from './App';
import View from './components/View';
import createAd from './components/createAd';
import NotFound from './components/NotFound';
import About from './components/About';
import Category from './admin/Category'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {NavLink, Link} from 'react-router-dom';
import {Navbar, Grid, Button} from 'react-bootstrap'
import './Main.css';


export default class Routes extends Component{

	render(){

		let create_button = null;
		let log_button = null;
		let category_button = null;
		let admin_route = null

		if(localStorage.getItem('token') === "" || localStorage.getItem('token') === null){
			console.log('here is no token')
			log_button = <Link to = '/login'>
							<Button className = "pull-right logButton" bsStyle = "success">
				            	Log In
				            </Button>
			 		 	</Link>

		}
		else{
			console.log('here is token')
			create_button = <Link to = '/createAd'>
								<Button className = "pull-right addButton" bsStyle = "success">
					            	Add New Ad
					            </Button>			     
			 				</Link>
			log_button = <Link to = '/'>
							<Button className = "pull-right logButton" bsStyle = "danger" onClick = {this.removeToken}>
				            	Log Out
				            </Button>				 
			 			</Link>
		}

		if(localStorage.getItem('admin') === 'true'){
			category_button = <NavLink className = "nav-item" to = "/admin"> Category </NavLink>
			admin_route = <Route exact path = '/admin' component = {Category} />
		}

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
			            {category_button}
			            
			            {create_button}

			            {log_button}

			          </Grid>
			        </Navbar>

			        <Switch>
			        	<Route exact path = '/login' component = {Login} />
			        	<Route exact path = '/signup' component = {SignUp} />
					    <Route exact path = '/' component={App} />
					    <Route exact path = '/advertisements/:id' component = {View}/>
						<Route exact path = '/components/About' component={About} />
						<Route exact path = '/createAd' component = {createAd} />
						{admin_route}
						<Route component = {NotFound}/>
					</Switch>
				</div>

			</Router>
		);
	}

	removeToken(){
		localStorage.removeItem('token');
		localStorage.removeItem('current_user');
		localStorage.removeItem('admin');
		window.location = "/"
	}
}