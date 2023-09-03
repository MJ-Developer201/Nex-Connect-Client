import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { ProfileDataContext, ProfilePicContext } from '../src/App'
import '../css/mediaquery.css'

export default function MainCard() {
  const [profilePic, setProfilePic] = useContext(ProfilePicContext)
  const [profileData, setProfileData] = useContext(ProfileDataContext)

  const { age, friends, state, city, website, username, bio } = profileData.item

  return (
    <Card elevation={3} style={{ marginBottom: '8%', display: 'flex' }} title='Main-Card'>
      <div style={{}}>
        <CardMedia
          src={profilePic}
          component='img'
          style={{
            maxWidth: 'auto',

            objectFit: 'contain',
          }}
        />
        {/* <CardContent className='main-card' style={{}}> */}
      </div>
      <div
        className='main-card-text'
        style={{
          marginBlock: 4,
          display: 'grid',
          gridTemplateColumns: 'auto',
          justifyItems: 'left',
        }}
      >
        <div style={{ marginLeft: '1rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '390' }}>{username}</h3>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '390' }}>Age: {age}</h3>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '390' }}>Friends: {friends.length}</h3>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '390' }}>
            Location: {city},{state}
          </h3>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '390' }}>{website}</h3>
        </div>
        <div style={{ marginInline: '1rem' }}>
          <h5 style={{ fontSize: '1.2rem', fontWeight: '390', maxHeight: '200px' }}>{bio}</h5>
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  )
}
