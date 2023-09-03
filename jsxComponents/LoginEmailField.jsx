import React from 'react'

export default function LoginEmailField({ email, setEmail }) {
  return (
    <div>
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
  )
}
