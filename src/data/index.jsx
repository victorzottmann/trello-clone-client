import axios from 'axios'

export const setApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://afternoon-mesa-95200.herokuapp.com'
  }

  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:4000'
  }
}

const apiUrl = setApiUrl()

export const api = axios.create({
  baseURL: apiUrl,
})
