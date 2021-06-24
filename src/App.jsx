import { useState, useEffect } from 'react';
import { Button, Typography, Box, Card, TextField } from '@material-ui/core';

import './App.css';
import { api } from './data'
 

function App() {
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    api.get("/cards")
      .then(({ data }) => setCards(data))
  },[])

  const addCard = async (event) => {
    event.preventDefault()
    
    // send a POST request to add the card to the backend
    try {
      const { data } = await api.post("/cards", {
        title,
        description
      })

      setTitle("")
      setDescription("")

      // update the component state with the new card
      // make a clone of cards from state
      const cardsClone = [...cards]
      // add the new card
      cardsClone.push({
        id: data.id,
        title: data.title,
        description: data.description
      })
      // set it as the new state
      setCards(cardsClone)
    } catch (err) {
      console.log("oops, something went wrong:", err)
    }
  }

  const handleTextChange = (event, setter) => {
    setter(event.target.value)
  }

  return (
    <Box>
      <Typography>trello clone</Typography>
      {cards.map(({ title, description, id }) => (
        <Box key={id}>
          <Card>
            <Typography>title: {title}</Typography>
            <Typography>description: {description}</Typography>
          </Card>
        </Box>
      ))}
      {/* todo: add a form to add a new card
      - title input
      - description input
      - submit button */}
      <form onSubmit={addCard}>
        <TextField onChange={(e) => handleTextChange(e, setTitle)} value={title} id="title" label="Title" />
        <TextField onChange={(e) => handleTextChange(e, setDescription)} value={description} id="description" label="Description" />
        <Button type="submit">Add card</Button>
      </form>
    </Box>
  )
}

export default App;
