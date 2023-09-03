import React, { useState } from 'react'
import { Button } from '@mui/material'
// import { handleSubmit } from '../routes/registerRoute'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const api_url = import.meta.env.VITE_SECRET

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .post(`${api_url}/register`, { email, password })
      .then((res) => {
        const token = res.data.token
        localStorage.setItem('key', token)
        if (token) {
        }
        navigate('/login')
      })
      .catch((error) => {
        console.log(error, 'please try again')
      })
  }

  return (
    <>
      <div style={{}} className='d-flex justify-content-center align-items-center mt-5'>
        <div className=' p-5'>
          <h3>Register Form</h3>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                type='text'
                className='form-control'
                id='email'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                className='form-control'
                id='password'
              />
            </div>
            <div className='d-grid' style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
              <Link to={'/login'}>
                <Button variant='contained'>Back</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
