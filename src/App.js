import './App.css';
import Sorter from './sorter.jsx';
import NavBar from './components/Navbar';
import SortingVisualizer from './components/Visualizer/SortingVisualizer';

function App() {
	return (
		<div className='App'>
			<NavBar />
			<Sorter />
			<SortingVisualizer />
		</div>
	);
}

export default App;
