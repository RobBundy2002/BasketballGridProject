
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [clickedBoxIndex, setClickedBoxIndex] = useState(null);
  const [selectedSearchTerm, setSelectedSearchTerm] = useState('');
  const [matchedTermImage, setMatchedTermImage] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchTerms = ["Malcolm Brogdon"];
 

  const numberList = [
    2000, 2005, 2006, 333, 2010, 2011, 399, 2016, 44, 2026, 12, 9, 8, 2032, 2029, 349, 2, 2046,
    252, 2050, 239, 91, 2057, 2065, 2066, 68, 103, 104, 189, 71, 225, 2803, 2083, 2084, 2086, 2934,
    2239, 2463, 13, 25, 2856, 2097, 2099, 2110, 2115, 2117, 232, 2127, 2429, 236, 2130, 2132, 228,
    325, 324, 2142, 38, 36, 171, 2154, 172, 156, 159, 2166, 2168, 305, 48, 2169, 2172, 2174, 3101,
    2181, 2182, 150, 2184, 151, 2193, 2197, 2198, 2199, 331, 2210, 339, 2217, 161, 57, 50, 2226,
    526, 2229, 52, 2230, 278, 231, 2241, 2244, 45, 46, 61, 290, 2247, 2249, 59, 2250, 2755, 2253,
    2739, 2261, 42, 108, 62, 2272, 2275, 107, 248, 2277, 47, 85, 70, 304, 356, 2287, 2916, 84, 282,
    314, 2294, 66, 2296, 294, 55, 256, 2305, 140, 2306, 338, 2309, 96, 99, 2325, 322, 2320, 2329,
    2335, 288, 2031, 309, 2348, 97, 2352, 2350, 2351, 311, 2363, 2368, 269, 276, 120, 2379, 2377,
    235, 2382, 2771, 2390, 193, 130, 127, 2393, 270, 135, 344, 2400, 142, 2623, 2405, 149, 147, 2413,
    2415, 116, 93, 152, 2885, 2426, 158, 2440, 160, 167, 166, 2443, 315, 2447, 2450, 2453, 153, 2448,
    2428, 155, 2449, 2454, 249, 111, 2464, 2458, 2459, 2460, 94, 77, 2466, 87, 2473, 195, 194, 201,
    197, 295, 145, 2437, 198, 2483, 204, 279, 213, 219, 2492, 221, 2501, 2502, 2504, 2506, 163, 2507,
    2509, 2870, 2514, 2515, 227, 242, 257, 2520, 2523, 164, 2545, 2565, 2567, 16, 2529, 2603, 139,
    2608, 2612, 2534, 2535, 301, 21, 2539, 23, 2541, 2547, 2550, 2561, 6, 2579, 2569, 2908, 233,
    2571, 58, 2546, 2582, 79, 2572, 253, 179, 2597, 2598, 2599, 2900, 24, 2617, 56, 2619, 183, 2628,
    2627, 218, 2633, 2634, 2635, 251, 245, 357, 2640, 326, 2641, 2643, 2649, 119, 2653, 2655, 202, 5,
    302, 300, 27, 28, 2540, 2116, 26, 41, 41, 82, 2433, 2378, 113, 2349, 2427, 2430, 350, 2439, 30,
    250, 2630, 292, 2638, 2636, 254, 328, 3084, 2670, 2678, 2674, 238, 261, 222, 258, 259, 2681, 154,
    264, 265, 2692, 277, 2717, 2710, 98, 2711, 2724, 2729, 2737, 275, 2747, 2750, 2751, 2752, 43, 2754
  ];

  useEffect(() => {
    // Function to get a random image filename
    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * numberList.length);
      return numberList.splice(randomIndex, 1)[0];
    };

    // Select three random images from the list
    const randomImageFilenames = [];
    for (let i = 0; i < 3; i++) {
      const randomNumber = getRandomImage();
      randomImageFilenames.push(`/logos/${randomNumber}.png`);
    }

    // Set the selected images
    setSelectedImages(randomImageFilenames);
  }, []);

  const handleBoxClick = (index) => {
    if (![0, 1, 2, 3, 4, 8, 12].includes(index)) {
      setClickedBoxIndex(index);
      setSelectedSearchTerm('');
      setIsSearchBarVisible(true);
    }
  };
  
  const handleBoxMouseEnter = (index) => {
    if (index !== clickedBoxIndex && ![0, 1, 2, 3, 4, 8, 12].includes(index)) {
      setClickedBoxIndex(null);
    }
  };
  
  const handleBoxMouseLeave = () => {
    if (clickedBoxIndex !== null && ![0, 1, 2, 3, 4, 8, 12].includes(clickedBoxIndex)) {
      setClickedBoxIndex(null);
    }
  };
  
  const handleOutsideClick = (e) => {
    if (!e.target.closest('.grid-box') && !e.target.closest('.search-bar')) {
      setIsSearchBarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const termMatch = searchTerms.find((term) => term.toLowerCase() === selectedSearchTerm.toLowerCase());

    
    if (termMatch) {

      setMatchedTermImage('/logos/Brogdon_Malcolm.jpg'); 
    } else {
      setMatchedTermImage(null);
    }
  }, [selectedSearchTerm]);

  return (
    <div className="App">
      <div className="grid">
        <div className="top-bar">
          {/* Content for the top bar */}
        </div>
        <div className="grid-container">
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={index}
              className={`grid-box 
                ${index === 0 ? 'image-boxes' : ''} 
                ${index === 4 ? 'image-boxes' : ''} 
                ${index === 1 || index === 2 || index === 3 ? 'image-boxes' : ''}
                ${index === 8 || index === 12 ? 'image-boxes' : ''}
                ${clickedBoxIndex === index ? 'clicked-box' : ''}`
              }
              onClick={() => handleBoxClick(index)}
              onMouseEnter={() => handleBoxMouseEnter(index)}
              onMouseLeave={handleBoxMouseLeave}
            >
              {index === 1 ? (
                <p>12+ Points Per Game</p>  
                ) : index === 2 ? (
                <p>8+ Rebounds Per Game</p>  
              ) : index === 3 ? (
                <p>1+ Blocks Per Game</p>   
              ) : index === 4 ? (
                <img
                  src={selectedImages[0]}
                  alt={`Box ${index + 1}`}
                  className="team-image"
                />
              ) : index === 5 && matchedTermImage ? (
                <img
                  src={matchedTermImage}
                  className="guess-image"
                />
              ) : index === 8 ? (
                <img
                  src={selectedImages[1]}
                  alt={`Box ${index + 1}`}
                  className="team-image"
                />
              ) : index === 12 ? (
                <img
                  src={selectedImages[2]}
                  alt={`Box ${index + 1}`}
                  className="team-image"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="box-container">
        {searchTerms.map((term, index) => (
          <button key={index} className="box-button">
            {term}
          </button>
        ))}
      </div>
      <div className="search-bar-container">
        {isSearchBarVisible && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={selectedSearchTerm}
              onChange={(e) => {
                const searchTerm = e.target.value;
                setSelectedSearchTerm(searchTerm);
                const results = searchTerms.filter((term) =>
                  term.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSearchResults(results);
              }}
              onFocus={() => setIsDropdownVisible(true)}
              onBlur={() => setIsDropdownVisible(false)}
            />
            {/* Dropdown for search suggestions */}
            {isDropdownVisible && searchResults.length > 0 && (
              <div className="dropdown">
                {searchResults.map((result, index) => (
                  <div key={index} className="dropdown-item" onClick={() => setSelectedSearchTerm(result)}>
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );  
        }
        export default App;