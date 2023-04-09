import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderManager from './HeaderManager';

function Trending() {
  const [mostFrequentBookId, setMostFrequentBookId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/mostFrequentBookId')
    
      .then((response) => {alert("ok")
        setMostFrequentBookId(response.data.mostFrequentBookId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
        <HeaderManager/> 
      {mostFrequentBookId === null ? (
        <p>Loading...</p>
      ) : (
        <p>The most frequent book id is {mostFrequentBookId}</p>
      )}
    </div>
  );
}

export default Trending;
