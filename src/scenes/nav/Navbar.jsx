import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Tabs, Tab, Toolbar, Typography } from '@material-ui/core'

const navLinks = [
  {
    label: 'Home',
    value: '/',
  },
  {
    label: 'Sign in',
    value: '/sign-in',
  },
  {
    label: 'Sign up',
    value: '/sign-up',
  },
]

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography component="h1" variant="h6">
          trello clone
        </Typography>

        <Tabs value={pathname}>
          {navLinks.map(({ label, value }) => (
            <Tab
              key={value}
              label={label}
              value={value}
              component={Link}
              to={value}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}
