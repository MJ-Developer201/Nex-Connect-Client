import React from 'react'
import { Badge, IconButton } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood'
export default function FeedLikeButton({ likesIconClicked, post_Id, post_Likes }) {
  return (
    <div>
      <Badge id={'badge'} badgeContent={post_Likes} color='secondary'>
        <IconButton
          style={{ color: 'black', marginBottom: '1rem' }}
          onClick={(e) => likesIconClicked(post_Id)}
          className='favorite-icon'
          aria-label='Like'
          color='primary'
        >
          <ThumbUpAltIcon />
        </IconButton>
      </Badge>
    </div>
  )
}
