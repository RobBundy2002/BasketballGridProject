import './App.css';
import HoopGrid from './components/HoopGrid';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';

function App() {
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    const generateDateList = () => {
      const startDate = new Date('2024-01-01');
      const today = new Date();

      const dates = [];
      let currentDate = startDate;

      while (currentDate <= today) {
        const dateObject = {
          day: currentDate.getDate(),
          month: currentDate.getMonth() + 1, // Months are zero-based
          year: currentDate.getFullYear(),
        };

        dates.push(dateObject);

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDateList(dates);
    };

    generateDateList();
  }, []);

  return (
      <div className="App">
          <BrowserRouter>
            <Navbar />
            <div className='pages'>
              <Routes>
                {dateList.map((date, index) => (
                  <Route 
                    key={index}
                    path={`/${date.year}/${date.month}/${date.day}`}
                    element={<HoopGrid date={date}></HoopGrid>}
                  />
                ))}
              </Routes>
            </div>
        </BrowserRouter>
      </div>
  );
}

export default App;       