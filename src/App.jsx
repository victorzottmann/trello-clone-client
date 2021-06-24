import { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import axios from 'axios'

import './App.css';
 
const apiUrl = process.env.REACT_APP_API_URL

function App() {
  useEffect(() => {
    axios.get(`${apiUrl}/cards`)
      .then(({ data }) => setCards(data))
  },[])

  const [cards, setCards] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <Typography>trello clone</Typography>
        <Button>This is a button</Button>
        {cards.map(({ title, description, id }) => (
          <Box key={id}>
            <Typography>title: {title}</Typography>
            <Typography>description: {description}</Typography>
          </Box>
        ))}
      </header>
    </div>
  );
}

export default App;
