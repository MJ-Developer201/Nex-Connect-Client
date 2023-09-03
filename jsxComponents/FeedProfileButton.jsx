import React from 'react'
import { Button, Avatar } from '@mui/material'

export default function FeedProfileButton({
  goToProfile,
  addFriend,
  post_userProfile,
  post_User,
  post_Picture,
}) {
  return (
    <div>
      <span style={{ marginLeft: '1%' }} className='d-flex'>
        <span onClick={() => goToProfile(post_userProfile, post_User)} className='profile-pic-feed'>
          <Avatar className='profile-feed-image' src={post_Picture}></Avatar>
        </span>
        <h3 onClick={() => goToProfile(post.userProfile, post.username)} className='post-username'>
          {post_User}
        </h3>
        <Button
          onClick={() => addFriend(post_userProfile)}
          color='secondary'
          className='add-button'
          style={{
            borderRadius: '10px',
            maxHeight: '28px',
            marginTop: '8px',
            marginLeft: 'auto',
            marginRight: '3.5rem',
          }}
          variant='outlined'
          size='small'
        >
          Add
        </Button>
      </span>
    </div>
  )
}
