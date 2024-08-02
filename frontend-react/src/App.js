import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let inputData;
      try {
        inputData = JSON.parse(data);
      } catch (error) {
        setResponse('Invalid JSON');
        return;
      }
      const res = await axios.post('https://waseemr02.pythonanywhere.com/bfhl', inputData);
      setResponse(res.data);
      console.log(res)
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <input type="text" value={data} onChange={e => setData(e.target.value)} className="input" />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {response && <pre className="response">{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default App;