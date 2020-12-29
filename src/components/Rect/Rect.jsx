import React from 'react';
import '../.././App.css';

import './Rect.css';

class Rect extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div
				className='sort-bar'
				id={`rect-${this.props.myKey}`}
				style={{
					height: `${this.props.value}px`,
					left: `${52 * this.props.myKey + 1}px`,
					background: 'green',
					bottom: 0,
					transition: 'all 0.5s',
				}}
			>
				<p>{this.props.value}</p>
			</div>
		);
	}
}

export default Rect;
