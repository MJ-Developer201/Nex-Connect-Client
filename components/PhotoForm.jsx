import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Container, Typography, Button, Grid, Card, Box, CardMedia, Dialog, Input } from '@mui/material'
import { storage } from '../utils/firebaseInit'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { UsernameContext, UserImagesContext, ProfilePicContext } from '../src/App'
import axios from 'axios'
import {} from '../src/App'
import { config } from '../utils/token'
import { DialerSip, Token } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import OpenInFullTwoToneIcon from '@mui/icons-material/OpenInFullTwoTone'
import { Toast, ToastContainer, ToastHeader, ToastBody } from 'react-bootstrap'

export default function PhotoForm() {
  //component states
  const navigate = useNavigate()
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)
  const [selectedFile, setSelectedFile] = useState(null)
  const imageListRef = ref(storage, `images/${usernameContext}`)
  const [userImages, setUserImages] = useContext(UserImagesContext)
  const [profilePic, setProfilePic] = useContext(ProfilePicContext)
  const [imageUrl, setImageUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [position, setPosition] = useState('top-end')
  const inputRef = useRef(null)
  const [hoverImage, setHoverImage] = useState(null)
  const api_url = import.meta.env.VITE_SECRET

  //toast functions
  const handleSnackbar = () => {
    setOpen(true)
  }
  const handleCloseSnackbar = (event) => {
    setOpen(false)
  }

  //functions
  function handleOpen() {
    setToastModal(true)
  }

  function handleClose() {
    setToastModal(false)
  }

  //getting initial list
  useEffect(() => {
    if (usernameContext) {
      setUserImages([])
      usernameContext &&
        listAll(imageListRef).then((response) => {
          Promise.all(response.items.map(getDownloadURL))
            .then((urls) => {
              setUserImages(urls)
            })
            .catch((error) => console.log(error.message))
        })
    }
  }, [usernameContext])

  //upload photo to firebase function
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  //setting profile pic function
  const handleProfilePic = (url) => {
    setProfilePic(url)
    axios
      .post(`${api_url}/profile-pic`, { url }, config)
      .then((response) => {
        const { picture } = response.data
        setProfilePic(picture)
        navigate('/profile-page')
      })
      .catch((error) => console.log(error.message))
  }

  /// new functions

  const handleSubmit = (event) => {
    event.preventDefault()
    const userFolderRef = ref(storage, `images/${usernameContext}`)
    const imageRef = ref(userFolderRef, `${selectedFile.name + v4()}`)
    uploadBytes(imageRef, selectedFile)
      .then(() => {
        setShowToast(true)
        setOpen(true)
        setSelectedFile(null)
        return getDownloadURL(imageRef)
      })
      .then((url) => {
        axios
          .post(`${api_url}/profile-pic`, { url }, config)
          .then((response) => {
            const { picture } = response.data
            setProfilePic(url)
            setImageUrl(url)
            inputRef.current.value = ''

            setUserImages((prevImages) => [...prevImages, url])
            setTimeout(() => {
              setShowToast(false)
            }, 2000)
          })
          .catch((error) => {
            console.log('Error in post request:', error)
            console.log(error.message, 'did not complete post route')
          })
      })
      .catch((error) => {
        console.error('Error in image upload:', error)
        console.log(error.message)
      })
  }

  return (
    <>
      <div style={{}}>
        <div style={{}}>
          <input ref={inputRef} onChange={(event) => handleFileChange(event)} type='file' name='' id='' />
          <Button
            onClick={handleSubmit}
            type='submit'
            variant='contained'
            color='primary'
            component='span'
            size='small'
            style={{ borderRadius: '25px' }}
          >
            Upload Image
          </Button>
        </div>
        <div className='style' style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginTop: '3rem' }}>
          {!userImages}
          {userImages &&
            userImages.map((url) => {
              return (
                <div style={{}} key={url}>
                  <div
                    onMouseEnter={() => {
                      setHoverImage(url)
                    }}
                    onMouseLeave={() => setHoverImage(null)}
                    elevation={2}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginBlock: 15,
                    }}
                  >
                    <CardMedia component='img' src={url} sx={{ maxWidth: '250px', maxHeight: '200px' }} />
                    {hoverImage === url && (
                      <Button
                        style={{ marginTop: '0.5rem' }}
                        variant='contained'
                        onClick={() => {
                          handleProfilePic(url)
                        }}
                      >
                        Set as Profile Picture
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
        <ToastContainer position={position}>
          <Toast position={position} show={showToast} onClose={() => setShowToast(false)}>
            <ToastHeader>
              <strong style={{ marginRight: '2rem' }}>Image Uploaded</strong>
              <small>Just Now</small>
            </ToastHeader>
            <ToastBody>Image Upload Successfully!</ToastBody>
          </Toast>
        </ToastContainer>
      </div>
    </>
  )
}
