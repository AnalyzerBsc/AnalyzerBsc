import React, { useState } from 'react';
import './search.css'

const Search = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [frameNumber, setFrameNumber] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/search/${plateNumber}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setFrameNumber(null);
      } else {
        setError(null);
        setFrameNumber(data.frameNumber);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching data');
      setFrameNumber(null);
    }
  };

  return (
    <div>
      <h2>Number Plate Search</h2>
      <input
        type="text"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {frameNumber && (
        <div>
          <h3>Result:</h3>
          <p>Frame Number: {frameNumber}</p>
          <img src={`http://localhost:3001/frames/${frameNumber}`} alt={`${frameNumber}`} />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Search;
