import React, { useEffect } from 'react'
import { Box, Card, CardHeader, Divider, CardContent, Typography, Avatar } from '@mui/material'

export default function AltUserProfile({ profile }) {
  useEffect(() => {}, [profile])

  return (
    <div>
      <Box display='grid' gridTemplateColumns='40% 1fr' className='profile-container'>
        <Card sx={{ marginRight: 10, minWidth: '1000px', maxHeight: 450 }} elevation={3}>
          <CardHeader
            avatar={<Avatar src={profile?.picture} />}
            titleTypographyProps={{ variant: 'h4' }}
            title={profile?.username}
          />
          <Divider style={{ color: 'black', backgroundColor: 'black', marginBlock: '0.2rem' }} />
          <CardContent>
            <Card elevation={0} sx={{ height: '300px' }}>
              <Typography
                variant='body2'
                style={{ color: 'grey', marginBlock: '0.1rem', fontSize: '1.3rem', fontWeight: '400' }}
              >
                Age: {profile?.age}
              </Typography>
              <Typography
                variant='body3'
                style={{ color: 'grey', marginBlock: '0.1rem', fontSize: '1.3rem', fontWeight: '400' }}
              >
                City: {profile?.city}
              </Typography>
              <Typography
                variant='body2'
                style={{ color: 'grey', marginBlock: '0.1rem', fontSize: '1.3rem', fontWeight: '400' }}
              >
                State: {profile?.state}
              </Typography>
              <Typography
                style={{ color: 'grey', marginTop: '0.1rem', fontSize: '1.4rem', fontWeight: '400' }}
                variant='body2'
                gutterBottom
              >
                Bio:
              </Typography>

              <Typography
                style={{ color: 'grey', marginTop: '0.1rem', fontSize: '1.1rem', fontWeight: '400' }}
                variant='body2'
                gutterBottom
              >
                {profile?.bio}
              </Typography>
            </Card>
            <Typography variant='sub' style={{ color: 'grey', float: 'right' }}>
              Website: {profile?.website}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}
