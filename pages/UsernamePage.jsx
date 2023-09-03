import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  Input,
} from '@mui/material'
import axios from 'axios'
import { UsernameContext } from '../src/App'

export default function SignupForm() {
  //states
  const [username, setUsername] = useState('')
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const api_url = import.meta.env.VITE_SECRET

  //variables
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('key')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .get(`${api_url}/user-info`, config)
      .then((response) => {
        const { username, bio, website, age, city, state } = response.data.item
        setAge(age)
        setBio(bio)
        setCity(city)
        setState(state)
        setUsername(username)
        setWebsite(website)
      })

      .catch((error) => console.log(error))
  }, [])

  //form input function

  //token from storage
  const token = localStorage.getItem('key')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  //logic for submitting username/profile info
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${api_url}/profile`, { username, age, bio, website, city, state }, config)
      .then((response) => {
        const { username } = response.data
        setUsernameContext(username)
        navigate('/')
      })
  }

  //jsx markup
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ marginTop: '-8%', maxWidth: '700px', width: '500px', maxHeigh: '800px' }}>
        <CardContent>
          <Typography variant='h5' component='h2' sx={{ marginBottom: '1rem' }}>
            Customize Your Profile
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <TextField
              label='Username'
              variant='outlined'
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              multiline
              rows={4}
              label='About me'
              variant='outlined'
              fullWidth
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <TextField
              label='Website'
              variant='outlined'
              fullWidth
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <TextField
              label='Age'
              variant='outlined'
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              label='City'
              variant='outlined'
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <TextField
              label='State'
              variant='outlined'
              fullWidth
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <Button type='submit' variant='contained' fullWidth onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
