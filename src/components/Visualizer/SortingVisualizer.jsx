import React from 'react';
import '../.././App.css';

import './SortingVisualizer.css';
import Rect from '../Rect/Rect';
import {
	getBubbleProcedure,
	bubbleAnimate,
} from '../../sorting-algorithms/bubbleSort.js';

import {
	getSelectionProcedure,
	selectionAnimate,
} from '../../sorting-algorithms/selectionSort.js';

import { getInsertionProcedure } from '../../sorting-algorithms/insertionSort.js';
import { getBogoProcedure, sortAnimate } from '../../sorting-algorithms/bogoSort';

import AudioPlayer from "./AudioPlayer";


const audioPlayer = AudioPlayer();
const SPEED = 500;
let NUM_OF_BARS = 12;

const COLORS = {
	PRIMARY: 'green',
	VISITED: 'black',
	SWAPPED: 'purple',
	SORTED: 'blue',
	FLAGGED: 'red',
};

class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			arr: []
		};
		audioPlayer.setInstrument("acoustic_grand_piano");
	}

	componentDidMount() {
		this.resetArr();
	}

	resetArr() {
		let arr = [];

		for (let i = 1; i <= NUM_OF_BARS; i++) {
			arr.push(Math.floor(Math.random() * 450 + 50)); // [50, 500]
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
		let procedure = getBubbleProcedure(arr);
		bubbleAnimate(procedure, this.swapRects, SPEED, COLORS);
	}

	selection() {
		let { arr } = this.state;
		let procedure = getSelectionProcedure(arr);
		let min = Math.min.apply(null, arr);
		let max = Math.max.apply(null, arr);
		sortAnimate(procedure, this.swapRects, 250, COLORS, audioPlayer, min, max);
	}

	insertion() {
		let { arr } = this.state;
		let procedure = getInsertionProcedure(arr);
		let min = Math.min.apply(null, arr);
		let max = Math.max.apply(null, arr);
		sortAnimate(procedure, this.swapRects, SPEED, COLORS, audioPlayer, min, max);
	}

	merge() {
		let { arr } = this.state;
		let procedure = getInsertionProcedure(arr);
	}

	bogo () {
		NUM_OF_BARS = 4;
		let arr = [];
		

		for (let i = 1; i <= NUM_OF_BARS; i++) {
			arr.push(Math.floor(Math.random() * 450 + 50)); // [50, 500]
		}

		this.setState({ arr }, function() {
			let { arr } = this.state;
			let min = Math.min.apply(null, arr);
			let max = Math.max.apply(null, arr);
			let procedure = getBogoProcedure(arr);
			sortAnimate(procedure, this.swapRects, SPEED, COLORS, audioPlayer, min, max);
		})
		
		
	}

// temporary function to test sleep, and scales
	handleClick = async () => {
		let time = 0;

		// notes is the number of halfsteps above the key
		let notes = [0, 2, 4, 7, 9, 12];

		//minimum midi key is 21: which is A, and 22 is A#, 23 is B
		let key = 24;

		const sleep = (milliseconds) => {
			return new Promise(resolve => setTimeout(resolve, milliseconds))
		}

		audioPlayer.setKey(key, notes);
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
				<button onClick={() => this.selection()}>selection sort</button>
				<button onClick={() => this.insertion()}>insertion sort</button>
				<button onClick={() => this.bogo()}>bogo sort</button>
				<button onClick={this.handleClick}>Set to Pentatonic, A major</button>
			</div>
		);
	}
}

export default SortingVisualizer;
