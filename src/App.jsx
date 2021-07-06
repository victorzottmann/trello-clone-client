import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home } from './scenes/home/Home'
import { SignIn } from './scenes/auth/sign-in/SignIn'
import { SignUp } from './scenes/auth/sign-up/SignUp'
import { Navbar } from './scenes/nav/Navbar'

const App = () => {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
