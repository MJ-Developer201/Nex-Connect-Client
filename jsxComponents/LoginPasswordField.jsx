import React from 'react'

export default function LoginPasswordField({ password, setPassword }) {
  return (
    <div>
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
  )
}
