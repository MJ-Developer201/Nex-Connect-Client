import React from 'react'
import { IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'

export default function PostList({ post, handleDelete }) {
  return (
    <div className='container post-list-container'>
      {post.map((post) => (
        <div key={post._id} className='container post-item shadow rounded p-3 mb-3'>
          <h3 className='post-username'>{post.username}</h3>
          <h4 className='post-body'>{post.post}</h4>
          <p className='post-date'>{new Date(post.createdAt).toLocaleString()}</p>
          <div className='d-flex align-items-center mt-3'>
            <IconButton onClick={() => handleDelete(post._id)} aria-label='Delete' color='error'>
              <DeleteIcon />
            </IconButton>

            <TextField variant='outlined' label='Leave a comment' size='small' fullWidth />
          </div>
        </div>
      ))}
    </div>
  )
}
