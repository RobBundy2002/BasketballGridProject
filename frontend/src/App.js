import './App.css';
import HoopGrid from './components/HoopGrid';
import {StyledTopText} from "./components/styles/StyledTopText";
import {StyledTopBar} from "./components/styles/StyledTopBar";

function App() {
  return (
      <div className="pop"> <StyledTopBar>
          <img alt="Basketball Logo" src={process.env.PUBLIC_URL + '/Untitled.ico'} />
          {/* Content for the top bar */}
      </StyledTopBar>

      <div className="App">
          <div className='top-bar'>
              {/* Use the absolute path with the PUBLIC_URL prefix for the image */}
              {/*<StyledTopBar>*/}
              {/*<img alt="Basketball Logo" src={process.env.PUBLIC_URL + '/basketball logo 1.ico'} />*/}
              {/*/!* Content for the top bar *!/*/}
              {/*</StyledTopBar>*/}
              <StyledTopText>
                  College Hoops Matrix Madness
              </StyledTopText>
          </div>
          <HoopGrid></HoopGrid>
      </div>
      </div>
  );
}

export default App;       