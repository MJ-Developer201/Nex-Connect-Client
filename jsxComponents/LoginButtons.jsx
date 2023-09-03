import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function LoginButtons() {
  return (
    <div className='login-buttons'>
      <Button type='submit' variant='contained'>
        Login
      </Button>

      <Link className='register-button-form' to='/register'>
        <Button variant='contained'>Register</Button>
      </Link>
    </div>
  )
}
