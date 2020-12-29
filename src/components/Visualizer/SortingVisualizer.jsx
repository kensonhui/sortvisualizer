import React from 'react';
import '../.././App.css';

import './SortingVisualizer.css';
import Rect from '../Rect/Rect';
import { getBubbleSortProcedures } from '../../sorting-algorithms/bubbleSortTest.js';

const SPEED = 500;
const NUM_OF_BARS = 12;

class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			arr: [],
		};
	}

	componentDidMount() {
		this.resetArr();
	}

	resetArr() {
		let arr = [];

		for (let i = 1; i <= NUM_OF_BARS; i++) {
			arr.push(Math.floor(Math.random() * 500 + 50)); // [50, 500]
		}

		this.setState({ arr });
	}

	swapRects(index1, index2) {
		let posA = `${52 * index1 + 1}px`;
		let posB = `${52 * index2 + 1}px`;

		let idA = `rect-${index1}`;
		let idB = `rect-${index2}`;

		let barA = document.getElementById(idA);
		let barB = document.getElementById(idB);

		barA.style.left = posB;
		barB.style.left = posA;
		barA.id = idB;
		barB.id = idA;
	}

	bubble() {
		let { arr } = this.state;
		let procedures = getBubbleSortProcedures(arr);
		const sleep = (milliseconds) => {
			return new Promise((resolve) => setTimeout(resolve, milliseconds));
		};

		let time = SPEED;
		for (let i = 0; i < procedures.length; i++) {
			let a = procedures[i].index1;
			let b = procedures[i].index2;

			if (procedures[i].operation === 'swap') {
				setTimeout(() => {
					document.getElementById(`rect-${a}`).style.backgroundColor = 'purple';
					document.getElementById(`rect-${b}`).style.backgroundColor = 'purple';
				}, time);

				time += SPEED;
				setTimeout(() => {
					this.swapRects(a, b);
					sleep(SPEED);
				}, time);

				time += SPEED;
				setTimeout(() => {
					document.getElementById(`rect-${a}`).style.backgroundColor = 'green';
					document.getElementById(`rect-${b}`).style.backgroundColor = 'green';
				}, time);
			} else {
				setTimeout(() => {
					document.getElementById(`rect-${a}`).style.backgroundColor = 'black';
					document.getElementById(`rect-${b}`).style.backgroundColor = 'black';
				}, time);

				time += SPEED;
				setTimeout(() => {
					document.getElementById(`rect-${a}`).style.backgroundColor = 'green';
					document.getElementById(`rect-${b}`).style.backgroundColor = 'green';
				}, time);
			}
		}
	}

	render() {
		let { arr } = this.state;

		// https://stackoverflow.com/a/22856022
		function newGUID() {
			var sGuid = '';
			for (var i = 0; i < 32; i++) {
				sGuid += Math.floor(Math.random() * 0xf).toString(0xf);
			}
			return sGuid;
		}

		return (
			<div className='sort-container'>
				{arr.map((v, i) => (
					<Rect value={v} key={newGUID()} myKey={i}></Rect>
				))}
				<button onClick={() => this.resetArr()}>randomize</button>
				<button onClick={() => this.bubble()}>bubble sort</button>
			</div>
		);
	}
}

export default SortingVisualizer;
