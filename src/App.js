import './App.css';
import { useState } from 'react';

function App() {
  const searchTerms = [
    'Search Term 1',
    'Search Term 2',
    'Search Term 3',
    'Search Term 4',
    'Search Term 5',
    'Search Term 6',
    'Search Term 7',
    'Search Term 8',
    'Search Term 9',
  ];

  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [selectedSearchTerm, setSelectedSearchTerm] = useState('');

  const handleBoxClick = (term) => {
    setSelectedSearchTerm('');
    setSearchBarVisible(true);
  };

  return (
    <div className="App">
      {/* Search bar outside of the box container */}
      <div className="search-bar-container">
        {isSearchBarVisible && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={selectedSearchTerm}
              onChange={(e) => setSelectedSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>
      
      <div className="box-container">
        {searchTerms.map((term, index) => (
          <button
            key={index}
            className="box-button"
            onClick={() => handleBoxClick(term)}
          >
            {' '}
          </button>
        ))}
      </div>
    </div>
  );
}
export default App;