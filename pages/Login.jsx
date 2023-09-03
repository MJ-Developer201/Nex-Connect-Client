import React, { Fragment, useContext, useState } from 'react'
import axios from 'axios'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { AuthContext, ProfilePicContext, UsernameContext } from '../src/App'
import getProfile from '../utils/getProfile'
import LoginSvg from '../jsxComponents/LoginSvg'
import LoginEmailField from '../jsxComponents/LoginEmailField'
import LoginPasswordField from '../jsxComponents/LoginPasswordField'
import LoginButtons from '../jsxComponents/LoginButtons'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useContext(AuthContext)
  const { usernameContext, setUsernameContext } = useContext(UsernameContext)
  const [profilePic, setProfilePic] = useContext(ProfilePicContext)
  const navigate = useNavigate()
  const api_url = import.meta.env.VITE_SECRET

  //submit login function
  function handleSubmit(e) {
    e.preventDefault()

    axios
      .post(`${api_url}/login`, { email, password })
      .then((res) => {
        const token = res.data.token
        localStorage.setItem('key', token)
        setEmail('')
        setPassword('')
        if (token) {
          setLoggedIn(true)

          //start of profile data get
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          axios
            .get(`${api_url}/user-info`, config)
            .then((response) => {
              const { item } = response.data
              const { picture } = item
              setProfilePic(picture)
              navigate('/')
            })
            .catch((error) => {
              navigate('/username')
              console.log('No profile Found,Redirect to Profile Page')
            })
        }
      })
      .catch((error) => {
        console.log(error.message, 'Data did not save to Db .please try again')
      })
  }

  return (
    <>
      <div className='login-container'>
        <LoginSvg />
        <div className='below-svg-div'>
          <LoginEmailField email={email} setEmail={setEmail} />
          <LoginPasswordField password={password} setPassword={setPassword} />
          <form onSubmit={handleSubmit}>
            <LoginButtons className='login-buttons' />
          </form>
        </div>
      </div>
    </>
  )
}
