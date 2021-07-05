import { setApiUrl } from './index'

describe('setApiUrl', () => {
  test('It sets API URL to prod when in production mode', () => {
    // mock being in production
    process.env.NODE_ENV = 'production'

    // test goes here
    const apiUrl = setApiUrl()
    expect(apiUrl).toBe('https://afternoon-mesa-95200.herokuapp.com')

    // reset env
    process.env.NODE_ENV = 'test'
  })

  test('It sets API URL to localhost by default when in development mode', () => {
    // mock being in development
    process.env.NODE_ENV = 'development'

    // test goes here
    const apiUrl = setApiUrl()
    expect(apiUrl).toBe('http://localhost:4000')

    // reset env
    process.env.NODE_ENV = 'test'
  })

  test('It sets API URL to chosen URL when in REACT_APP_API_URL is passed', () => {
    // mock being in development
    process.env.NODE_ENV = 'development'
    process.env.REACT_APP_API_URL = 'banana'

    // test goes here
    const apiUrl = setApiUrl()
    expect(apiUrl).toBe('banana')

    // reset env
    process.env.NODE_ENV = 'test'
  })
})
