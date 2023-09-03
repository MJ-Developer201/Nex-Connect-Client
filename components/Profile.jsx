import React, { Fragment, useContext, useState } from 'react'
import { Avatar, Card, CardContent, CardHeader, Divider, Typography, Button, Box } from '@mui/material'
import { ProfileDataContext, ProfileIdContext, UsernameContext, ProfilePicContext } from '../src/App'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import { Carousel } from 'react-bootstrap'
import '../css/mediaquery.css'

export default function Profile() {
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)
  const [profileId, setProfileId] = useContext(ProfileIdContext)
  const [profileData, setProfileData] = useContext(ProfileDataContext)
  const [profilePic, setProfilePic] = useContext(ProfilePicContext)

  // Function to get the first letter of the usernameContext
  const getAvatarLetter = () => {
    return usernameContext.charAt(0).toUpperCase()
  }
  if (!profileData) {
    return <div>Loading...</div>
  }

  return (
    <Card sx={{}} elevation={3}>
      <CardHeader
        avatar={<Avatar style={{ objectFit: 'contain' }} src={profilePic}></Avatar>}
        titleTypographyProps={{ variant: 'h4' }}
        title={usernameContext}
        action={
          <div style={{ marginTop: '0.4rem' }}>
            <Link style={{ marginRight: '1rem' }} to={'/upload-form'}>
              <Button variant='outlined'>Photos</Button>
            </Link>
            <Link to={'/username'}>
              <Button variant='outlined'>Edit Profile</Button>
            </Link>
          </div>
        }
      />

      <Divider style={{ color: 'black', backgroundColor: 'black' }} />
      <div id='profile-div' className='profile-div' style={{ display: 'grid', maxHeight: '600px' }}>
        <CardContent style={{ minWidth: 300 }}>
          <Typography variant='body2' style={{ color: 'grey', fontSize: '1.4rem', fontWeight: '400' }}>
            Age : {profileData && profileData.item.age}
          </Typography>
          <Typography variant='body3' style={{ color: 'grey', fontSize: '1.2rem', fontWeight: '400' }}>
            City : {profileData && profileData.item.city}
          </Typography>
          <Typography variant='body2' style={{ color: 'grey', fontSize: '1.2rem', fontWeight: '400' }}>
            State: {profileData && profileData.item.state}
          </Typography>
          <Typography
            style={{ color: 'grey', fontSize: '1.3rem', fontWeight: '400' }}
            variant='body2'
            gutterBottom
          >
            Bio:
          </Typography>
          <Typography
            style={{ color: 'grey', fontSize: '1.15rem', fontWeight: '400' }}
            variant='body2'
            gutterBottom
          >
            {profileData && profileData.item.bio}
          </Typography>
        </CardContent>
        <img
          className='profile-img'
          style={{ float: 'right !important', maxWidth: '100%', maxHeight: '500px' }}
          src={profilePic}
          alt=''
        />
      </div>
    </Card>
  )
}
