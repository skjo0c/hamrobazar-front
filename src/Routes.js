import React, {Component} from 'react';
import App from './App';
import About from './components/About';
import Items from './components/Items';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {NavLink} from 'react-router-dom';
import {Navbar, Grid, Jumbotron, NavItem} from 'react-bootstrap'
import './Main.css';


export default class Routes extends Component{
	render(){
		return(
			<Router>
				<div>
			        <Navbar inverse fixedTop>
			          <Grid>
			            <Navbar.Header>
			              <Navbar.Brand>
			                <a href="/">HamroBazar</a>
			              </Navbar.Brand>
			              <Navbar.Toggle />
			            </Navbar.Header>

			            <NavLink className = "nav-item" to = "/components/Items"> Items </NavLink>
			            <NavLink className = "nav-item" to = "/components/About"> About </NavLink>

			          </Grid>
			        </Navbar>



				    <Route exact path = '/' component={App} />
					<Route exact path = '/components/Items' component={Items} />
					<Route exact path = '/components/About' component={About} />
				</div>

			</Router>
		);
	}
}