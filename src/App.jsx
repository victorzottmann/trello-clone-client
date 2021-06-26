import { useState, useEffect } from 'react'
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  FormHelperText,
  IconButton,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Delete } from '@material-ui/icons'

import './App.css'
import { api } from './data'
import { validateInput } from './utils/validators'

function App() {
  const [cards, setCards] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [titleValid, setTitleValid] = useState(true)
  const [descriptionValid, setDescriptionValid] = useState(true)

  useEffect(() => {
    api
      .get('/cards')
      .then(({ data }) => setCards(data))
      .catch((err) => setErrorMessage(`Something went wrong: ${err.message}`))
      .finally(setLoading(false))
  }, [])

  useEffect(() => {
    setTitleValid(validateInput(title))
  }, [title])

  useEffect(() => {
    setDescriptionValid(validateInput(description))
  }, [description])

  const addCard = async (event) => {
    event.preventDefault()
    setLoading(true)

    // send a POST request to add the card to the backend
    try {
      const { data } = await api.post('/cards', {
        title,
        description,
      })

      setTitle('')
      setDescription('')

      // update the component state with the new card
      // make a clone of cards from state
      const cardsClone = [...cards]

      // add the new card
      cardsClone.push({
        id: data.id,
        title: data.title,
        description: data.description,
      })

      // set it as the new state
      setCards(cardsClone)
    } catch (err) {
      console.log('oops, something went wrong:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteCard = async (id, index) => {
    // set loading state
    setLoading(true)

    try {
      // send DELETE request to delete path on backend
      // pass in the ID
      await api.delete(`/cards/${id}`)
      // remove the card from the react state
      const remainingCards = [...cards]
      remainingCards.splice(index, 1)
      setCards(remainingCards)
      //
    } catch ({ message }) {
      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
    // unset loading state
  }

  return (
    <Box>
      <Typography component="h1" variant="h4">
        trello clone
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {loading && <CircularProgress />}

      {cards.map(({ title, description, id }, index) => (
        <Box key={id}>
          <Card variant="outlined">
            <CardContent>
              <Typography>title: {title}</Typography>
              <Typography>description: {description}</Typography>
              <IconButton onClick={() => deleteCard(id, index)}>
                <Delete />
              </IconButton>
            </CardContent>
          </Card>
        </Box>
      ))}

      <form onSubmit={addCard}>
        <TextField
          error={!titleValid}
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          id="title"
          label="Title"
        />
        <TextField
          error={!descriptionValid}
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          id="description"
          label="Description"
        />
        <Button disabled={!titleValid || !descriptionValid} type="submit">
          Add card
        </Button>
        <FormHelperText error={!titleValid || !descriptionValid}>
          Please don't use any naughty words
        </FormHelperText>
      </form>
    </Box>
  )
}

export default App
