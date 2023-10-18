
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="left-panel">
        <p>Basketball Grid Project</p>
      </div>
      <div className="box-container">
        {Array(9).fill().map((_, index) => (
          <button key={index} className="box-button">
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
