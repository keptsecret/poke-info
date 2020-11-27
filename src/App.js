import React, { useEffect, useState } from 'react';
import Card from './Card';
import './App.css';

const contains = function(a, obj) {
  var i = a.length;
  while (i--) {
      if (a[i].id === obj.id) {
          return true;
      }
  }
  return false;
}

function App() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const [clicks, setClicks] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const [newPmon, setNewPmon] = useState({});

  const [pmonList, setPmonList] = useState([]);
  useEffect(() => {
    if (Object.keys(newPmon).length !== 0) {
      if (contains(pmonList, newPmon)) {
        alert("You already have that added");
      } else {
        setPmonList(prev => [...prev, newPmon]);
        setNewPmon({});
      }
    }
  }, [newPmon]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleClick = () => {
    setClicks(prev => prev + 1);
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  }

  const removePmon = (pmonId) => {
    setPmonList(prev => (prev.filter(pmon => pmon.id !== pmonId)));
  }

  const handleSubmit = (event) => {
    //setSearchTerm(event.target.value);
    if (searchTerm.length > 0) {
      fetch(`${baseUrl}${searchTerm}`).then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          alert("Your inquiry could not be found");
          return Promise.reject('Error 404');
        }
      })
      .then((result) => setNewPmon(result))
      .catch(error => console.log('error: ', error));
      setSearchTerm('');
    }
    event.preventDefault();
  }

  return (
    <div className="App">
      <h1>Pok&eacute;mon Info</h1>
      <h3>Find quick information on a pok&eacute;mon by searching for their name (or ID) in the box below</h3>
      <p>Click counter (for fun): {clicks}</p>
      <form onSubmit={handleSubmit}>
        <label>
          <b>Pok&eacute;mon name:</b>&nbsp;
          <input className="searchBox" type='text' value={searchTerm} onChange={handleChange}/>
        </label>
        <input className="submitButt" type='submit' value='Search' />
      </form>
      <div>
        {pmonList.map((pmon) => (
          <Card key={pmon.id} data={pmon} onDelete={removePmon}/>
        ))}
      </div>
    </div>
  );
}

export default App;
