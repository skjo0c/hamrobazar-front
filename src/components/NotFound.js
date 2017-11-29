import React, {Component} from 'react';
import yamcha from '../yamcha.png';
import '../Main.css'

export default class NotFound extends Component{
	render(){
		return(
			<div className = "NotFound">
				<div className = "yamcha">
					<img src = {yamcha} alt = 'yamcha'/>
					<div className = "yamchaText">
						<h1> SOMETHING WENT WRONG. </h1>
					</div>
				</div>
			</div>
		);
	}
}