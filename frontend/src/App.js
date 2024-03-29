import './App.css';
import HoopGrid from './components/HoopGrid';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
      <div className="App">
          <BrowserRouter>
            <Navbar />
            <div className='pages'>
              <Routes>
                  <Route 
                    path="/"
                    element={<HoopGrid></HoopGrid>}
                  />
              </Routes>
            </div>
        </BrowserRouter>
      </div>
  );
}

export default App;       