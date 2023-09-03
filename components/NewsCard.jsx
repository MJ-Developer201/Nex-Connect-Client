import { DeleteOutline } from '@mui/icons-material'
import { Avatar, Card, CardContent, CardHeader, IconButton } from '@mui/material'
import React from 'react'

export default function NewsCard({ user }) {
  return (
    <>
      <Card style={{ maxHeight: '350px' }} key={user.id} elevation={3}>
        <CardHeader
          action={
            <IconButton>
              <DeleteOutline />
            </IconButton>
          }
          title={user.username}
        >
          {user.username}
        </CardHeader>
        <CardContent>
          {user.name} <br />
          {user.email}
        </CardContent>
      </Card>
    </>
  )
}
