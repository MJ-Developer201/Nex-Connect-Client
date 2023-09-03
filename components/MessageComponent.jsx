import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  TextField,
  Button,
  Avatar,
  Paper,
  Snackbar,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardActions,
  Input,
} from '@mui/material'
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { v4 } from 'uuid'
import { db } from '../utils/firebaseInit'
import { ProfilePicContext, UsernameContext } from '../src/App'
import { Send, SendOutlined } from '@mui/icons-material'
import '../css/layoutContainer.css'

const MessageComponent = () => {
  const [inputValue, setInputValue] = useState('')
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)
  const [profilePic, setProfilePic] = useContext(ProfilePicContext)
  const [messages, setMessages] = useState([])
  const [snackbarStatus, setSnackbarStatus] = useState(false)

  const messageRef = collection(db, 'messages')
  const messageContainerRef = useRef(null)

  const dataQuery = query(messageRef, orderBy('createdAt'))

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const unsubscribe = onSnapshot(dataQuery, messageRef, (snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setMessages(fetchedData)
    })

    return () => unsubscribe()
  }, [])

  const submitMessage = (e) => {
    e.preventDefault()
    if (inputValue.trim() !== '') {
      addDoc(messageRef, {
        message: inputValue,
        createdAt: serverTimestamp(),
        username: usernameContext,
        profilePicture: profilePic,
      })
        .then(() => {
          snackbarOpen()
          setInputValue('')
        })
        .catch((error) => console.log(error.message))
    }
  }

  const snackbarOpen = () => {
    setSnackbarStatus(true)
  }

  const closeSnackbar = () => {
    setSnackbarStatus(false)
  }

  return (
    <Container maxWidth='sm' style={{ marginTop: '2rem' }}>
      <Card
        className='scroll-container'
        ref={messageContainerRef}
        elevation={3}
        style={{
          padding: '1rem',
          maxHeight: '80vh',
          overflowY: 'scroll',
          scrollBehavior: 'smooth',
          overflowWrap: 'break-word',
        }}
      >
        <Typography variant='h5' align='center' color='primary'>
          Global Chat
        </Typography>
        <div style={{ marginTop: '1rem' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: usernameContext === message.username ? 'flex-start' : 'flex-end',
                marginBottom: '1rem',
              }}
            >
              {usernameContext === message.username && (
                <Avatar src={message.profilePicture} alt={message.username} />
              )}
              <Paper
                elevation={2}
                style={{
                  borderRadius: '2rem',
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: usernameContext !== message.username ? 'white' : '#4870df',
                  color: usernameContext !== message.username ? 'black' : 'white',
                }}
              >
                {message.message}
              </Paper>
              {usernameContext !== message.username && (
                <Avatar src={message.profilePicture} alt={message.username} />
              )}
            </div>
          ))}

          <form onSubmit={submitMessage} style={{ marginTop: '2rem', display: 'flex' }}>
            <input
              className='form-control'
              style={{
                marginRight: '0.5rem',
                backgroundColor: '#dedfed',
                borderRadius: '2rem',
              }}
              fullWidth
              variant='outlined'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Type your message'
            />
            <Button
              size='small'
              variant='outlined'
              color='secondary'
              style={{ maxHeight: '2.4rem', borderRadius: '3rem' }}
              type='submit'
            >
              <Send style={{ marginLeft: '0.5rem', marginBottom: '0.2rem' }} />
            </Button>
          </form>
        </div>

        <Snackbar
          open={snackbarStatus}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          message='Message Sent'
        />
      </Card>
    </Container>
  )
}

export default MessageComponent
