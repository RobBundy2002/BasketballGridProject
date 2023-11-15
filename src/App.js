import './App.css';
import HoopGrid from './components/HoopGrid';
import {StyledTopText} from "./components/styles/StyledTopText";
function App() {
  return (
    <div className="App">
      <div className='top-bar'>
        {/* Content for the top bar */}
        <StyledTopText>
            College Hoops Matrix Madness
        </StyledTopText>
        </div>
      <HoopGrid></HoopGrid>
    </div>
  );
}

export default App;       