import React, { useEffect, useState } from 'react';
import Card from './Card.js';
import './App.css';

function App() {
  const [clicks, setClicks] = useState(0);
  const [pmon, setPmon] = useState({});
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    fetch(`${baseUrl}1`).then(res => res.json()).then((result) => setPmon(result));
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClick = () => {
    setClicks(prev => prev + 1);
  }

  if (!pmon) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <p>Click count: {clicks}</p>
      <Card data={pmon}/>
    </div>
  );
}

export default App;
