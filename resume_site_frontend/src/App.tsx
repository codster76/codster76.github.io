import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => 
    {
      const fetchItems = async () =>
      {
        const res = await fetch('https://hidden-atoll-35609.herokuapp.com/api/items');
        const data = await res.json(); // Need to feed data into something else to use it elsewhere
      }

      fetchItems();
    }, []);

  return (
    <div className="App">
      <p>AFSFFASFAGIAJGIO</p>
    </div>
  );
}

export default App;
