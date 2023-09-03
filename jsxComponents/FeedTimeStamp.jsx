import React from 'react'

export default function FeedTimeStamp({ post_createdAt }) {
  return (
    <div>
      <div style={{ marginLeft: '.5rem' }}>
        <p className='createAt'>Posted At:</p>
        <p style={{ marginTop: '-1rem' }} className='createAt'>
          {new Date(post_createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
