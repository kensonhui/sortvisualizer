import React from 'react';
import '../.././App.css';

import './SortingVisualizer.css';
import Rect from '../Rect/Rect';
import RectInvis from '../Rect/RectInvis';
import {
	getBubbleProcedure,
	bubbleAnimate,
} from '../../sorting-algorithms/bubbleSort.js';

import {
	getSelectionProcedure,
	selectionAnimate,
} from '../../sorting-algorithms/selectionSort.js';

import { getInsertionProcedure } from '../../sorting-algorithms/insertionSort.js';
import { getBogoProcedure } from '../../sorting-algorithms/bogoSort';

import {
	partition,
	getQuickProcedure,
	quickAnimate,
	procedureQuick
} from '../../sorting-algorithms/quickSort.js';

import {
	mergeSort,
	mergeAnimate,
	procedureMerge
} from '../../sorting-algorithms/mergeSort.js';

const SPEED = 500;
let NUM_OF_BARS = 12;
var orig = [];
let stop = false;
let counter = 0;

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
			arr: [],
		};
	}

	componentDidMount() {
		this.resetArr();
	}

	resetArr() {
		let arr = [];
		orig = [];
		for (let i = 1; i <= NUM_OF_BARS; i++) {
			let poo = Math.floor(Math.random() * 450 + 50);
			arr.push(poo); // [50, 500]
			orig.push(poo);
		}
		console.log(arr);
		this.setState({ arr });
	}
	
	reset() {
		console.log(orig);
		let arr = orig;
	//	stop = true;
		console.log(orig);
		this.setState({arr});
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

	addRects(index1, index2) {
		let idA = `rect-${index1}`;
		let idB = `rectInvis-${index2}`;
		let posAH = `${601}px`;
		let posBH = `${-601}px`;
		let posAW = `${52 * index1 + 1}px`;
		let posBW = `${52 * index2 + 1}px`;

		if (counter % 2 == 0){
			posAH = `${601}px`;
			posBH = `${-601}px`;
		} else {
			posAH = `${0}px`;
			posBH = `${0}px`;
		}
		
		console.log(document.getElementById(idA));

		let barA = document.getElementById(idA);
		let barB = document.getElementById(idB);

		barA.style.left = posBW;
		barB.style.left = posAW;
		barA.style.bottom = posBH;
		barB.style.bottom = posAH;
		
		barA.id = idB;
		barB.id = idA;
		counter++;
	}
	bubble() {
		
		let { arr } = this.state;
		console.log(orig);
		let procedure = getBubbleProcedure(arr);
		console.log(orig);
		bubbleAnimate(procedure, this.swapRects, SPEED, COLORS, stop);
		
	}

	selection() {
		let { arr } = this.state;
		let procedure = getSelectionProcedure(arr);
		selectionAnimate(procedure, this.swapRects, SPEED, COLORS);
	}

	insertion() {
		let { arr } = this.state;
		let procedure = getInsertionProcedure(arr);
		selectionAnimate(procedure, this.swapRects, SPEED, COLORS);
	}

	merge() {
		let { arr } = this.state;
		let procedure = mergeSort(arr);
		console.log(procedureMerge);
		mergeAnimate(procedureMerge, this.addRects, SPEED, COLORS);
//	this.addRects(0, 0);
	
	}

	bogo () {
		NUM_OF_BARS = 4;
		let arr = [];

		for (let i = 1; i <= NUM_OF_BARS; i++) {
			arr.push(Math.floor(Math.random() * 450 + 50)); // [50, 500]
		}

		this.setState({ arr }, function() {
			let { arr } = this.state;
			let procedure = getBogoProcedure(arr);
			selectionAnimate(procedure, this.swapRects, SPEED, COLORS);
		})
		
		
	}

	quick() {
		let { arr } = this.state;
		let procedure = getQuickProcedure(arr, 0,arr.length,[]);
		console.log(procedure);
		quickAnimate(procedureQuick, this.swapRects, SPEED, COLORS);
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
			<div>
				<div className='sort-container'>
				{arr.map((v, i) => (
					<Rect value={v} key={newGUID()} myKey={i}></Rect>
				))}
				
				<button onClick={() => this.resetArr()}>randomize</button>
				<button onClick={() => this.reset()}>Reset</button>
				<button onClick={() => this.bubble()}>bubble sort</button>
				<button onClick={() => this.selection()}>selection sort</button>
				<button onClick={() => this.insertion()}>insertion sort</button>
				<button onClick={() => this.bogo()}>bogo sort</button>
				<button onClick={() => this.quick()}>quick sort</button>
				<button onClick={() => this.merge()}>merge sort</button>
				</div>
				<div className='sort-container2'>
				{arr.map((v, i) => (
					<RectInvis value={v} key={newGUID()} myKey={i}></RectInvis>
				))}
				</div>
			</div>
		);
	}
}

export default SortingVisualizer;
