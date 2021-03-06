import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import '../Main.css';

export default class Category_ads extends Component{

	constructor(props){
		super(props);
		this.state = {
		  advertisements: [],
		  categorys: []
		};
	}

	componentWillMount(){

		const location = this.props.match.params.id;
		
		axios.get('http://localhost:3000/api/v1/advertisements?category_id=' + location)
		.then((response)=>{
			this.setState({advertisements: response.data.data });
		})
		.catch(function(error){
			console.log(error);
		});

		axios.get('http://localhost:3000/api/v1/categorys.json')
		.then((response) => {
		  this.setState({categorys: response.data.data});
		})
		.catch(function (error) {
		  console.log(error);
		});
	}

    componentWillReceiveProps(props) {
        const location = props.match.params.id;
        axios.get('http://localhost:3000/api/v1/advertisements?category_id=' + location)
        .then((response)=>{
            this.setState({advertisements: response.data.data });
        })
        .catch(function(error){
            console.log(error);
        });

        axios.get('http://localhost:3000/api/v1/categorys.json')
        .then((response) => {
          this.setState({categorys: response.data.data});
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
	render(){
		let advertisements = this.state.advertisements;
		let categorys = this.state.categorys;
		return(			    
		<Grid>
	          <Row className = "show-grid">
	            <div className = "container">

	              	<Col xs={12} md={4}>

			          <div className = "catList">
			            {categorys.map(category =>
			              <div key={category.id}> 
			                <h4>
			                  <Link className='catName' to = {`./${category.id}`}>
			                    {category.title}
			                  </Link>
			                </h4>
			              </div>
			              )}
			          </div>

			        </Col>

			        <Col xs = {12} md = {8}>
						<div className = 'adList'>

							{advertisements.map(advertisement =>
								<div className = "each_index_ad" key={advertisement.id}> 
									<img className ="index_ad_photos" src = {`http://localhost:3000${advertisement.picture_data}`} />
									<h1>
										<Link className='adName' to = {`./advertisements/${advertisement.id}`}>
											{advertisement.name}
										</Link>
									</h1>
									<h4>{advertisement.price}</h4>
								</div>
							)}
						</div>
					</Col>

			    </div>
			</Row>
		</Grid>
		)
	}
}