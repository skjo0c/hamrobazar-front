import React, { Component } from 'react';
// import axios from 'axios';


export default class AllAdvertisements extends Component {
	render(){
		var advertisements = this.props.advertisements.map((item) => {
			return(
				<div key = {item.id}>
					<Advertisements advertisement = {advertisement} />
				</div>
			)
		});

		return(
			<div> {advertisement} </div>
		)
	}
}