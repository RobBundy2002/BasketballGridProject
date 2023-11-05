import './App.css';
import HoopGrid from './components/HoopGrid';

function App() {
  return (
    <div className="App">
      <div  className='top-bar'>
        {/* Content for the top bar */}
        <div className='top-text'>
          Patrick, Grant, and Rob - The Side Project
        </div>
      </div>
      <HoopGrid></HoopGrid>
    </div>
  );
}

export default App;       