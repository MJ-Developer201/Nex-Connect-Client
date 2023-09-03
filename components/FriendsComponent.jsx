import React, { useContext } from 'react'
import '../css/friendsComponent.css'
import { FriendsContext } from '../src/App'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography, Box, Divider, Avatar, Card, CardHeader, CardContent } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { config } from '../utils/token'
import { v4 } from 'uuid'

const getAvatarLetter = (friends) => {
  return friends.charAt(0).toUpperCase()
}

export default function FriendsComponent() {
  // Component context
  const [friendsArray, setFriendsArray] = useContext(FriendsContext)
  const navigate = useNavigate()
  const api_url = import.meta.env.VITE_SECRET

  function goToProfile(profile) {
    axios
      .post(`${api_url}/other-profile`, { profile }, config)
      .then((response) => {
        navigate(`/${profile}/${v4()}`)
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h5' sx={{ textAlign: 'center', textDecoration: 'underline' }}>
        Friends List
      </Typography>
      <Divider sx={{ my: 2, display: 'flex', alignItems: 'center' }} />
      {friendsArray.length === 1 && friendsArray[0] === 'No Friends Yet' ? (
        <Typography style={{ textAlign: 'center' }} variant='h2'>
          No Friends Yet
        </Typography>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          {friendsArray.map((friends) => (
            <Card
              id='friends-card'
              className='friends-card friends-card-container'
              onClick={() => goToProfile(friends._id)}
              style={{ marginBlock: 10, maxWidth: '13rem' }}
              key={friends._id}
            >
              <CardHeader
                avatar={
                  <Avatar
                    // variant='square'
                    sx={{ width: '10rem', height: '10rem', marginLeft: '.35rem' }}
                    src={friends.picture}
                  />
                }
                style={{ marginTop: '10px' }}
              ></CardHeader>

              <CardContent>
                <div style={{ marginBlock: 2 }}>
                  <Typography style={{ fontSize: '1.3rem', fontWeight: '400' }}>
                    Age : {friends.username}
                  </Typography>
                  <Typography style={{ fontSize: '1.3rem', fontWeight: '400' }}>
                    Age : {friends.age}
                  </Typography>
                  <Typography style={{ fontSize: '1.3rem', fontWeight: '400' }}>
                    City : {friends.city}
                  </Typography>
                  <Typography style={{ fontSize: '1.3rem', fontWeight: '400' }}>
                    State :{friends.state}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
