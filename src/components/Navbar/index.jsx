import React, { Component } from 'react';

class NavBar extends Component {
	state = {};
	render() {
		return (
			<nav className='navbar navbar-light bg-light'>
				<div className='container-fluid'>
					<a className='navbar-brand' href='#'>
						Sort Visualizer
					</a>
				</div>
				<span className='badge badge-pill badge-secondary'></span>
			</nav>
		);
	}
}

export default NavBar;
