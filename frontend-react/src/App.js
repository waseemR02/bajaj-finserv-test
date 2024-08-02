import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 


function App() {
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);
  const [validJson, setValidJson] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    document.title = "RA2111030010276";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let inputData;
      try {
        inputData = JSON.parse(data);
        setValidJson(true);
      } catch (error) {
        setResponse('Invalid JSON');
        setValidJson(false);
        return;
      }
      const res = await axios.post('https://waseemr02.pythonanywhere.com/bfhl', inputData);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFilters(value);
  };

  const removeFilter = (filter) => {
    setFilters(filters => filters.filter(f => f !== filter));
  };

  return (
<div className="App">
  <form onSubmit={handleSubmit} className="form">
    <input type="text" value={data} onChange={e => setData(e.target.value)} className="input" />
    <button type="submit" className="submit-button">Submit</button>
  </form>
  {validJson && (
    <div className="filter-container">
      <select multiple={true} onChange={handleFilterChange} className="filter-select">
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest alphabet">Highest alphabet</option>
      </select>
      <div className="filter-box">
        {filters.map(filter => (
          <div className="filter-item" key={filter}>
            {filter}
            <button onClick={() => removeFilter(filter)} className="remove-button">Remove</button>
          </div>
        ))}
      </div>
    </div>
  )}
  {response && (
    <div className="response-card">
      {filters.includes('Alphabets') && <p className="response-item"><strong>Alphabets:</strong> {response.alphabets.join(', ')}</p>}
      {filters.includes('Numbers') && <p className="response-item"><strong>Numbers:</strong> {response.numbers.join(', ')}</p>}
      {filters.includes('Highest alphabet') && <p className="response-item"><strong>Highest alphabet:</strong> {response.highest_alphabet.join(', ')}</p>}
    </div>
  )}
</div>
  );
}

export default App;