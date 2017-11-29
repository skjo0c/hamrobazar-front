import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../Main.css'

export default class About extends Component{
	render(){
		return(
			
			<div className = "About">
				<h1> 
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</h1>


				<br/><br/><br/><br/><br/><br/>
				<Link to = '/'>Back</Link>
			</div>
		);
	}
}