import React, { useContext, useState } from 'react'
import handleSubmit from '../utils/handleSubmit'
import PostInputJsx from '../jsxComponents/PostInput'
import { PostFeedContext, ProfileIdContext, ProfilePicContext } from '../src/App'

export default function PostInput({}) {
  const [postFeed, setPostFeed] = useContext(PostFeedContext)
  const [postInput, setPostInput] = useState('')
  const [profileId, setProfileId] = useContext(ProfileIdContext)
  const [profilePic, setProfilePic] = useContext(ProfilePicContext)

  const token = localStorage.getItem('key')
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }

  function handlePostSubmit(e) {
    handleSubmit(e, postInput, setPostInput, config, setPostFeed, profileId)
  }

  return (
    <>
      <PostInputJsx handlePostSubmit={handlePostSubmit} postInput={postInput} setPostInput={setPostInput} />
    </>
  )
}
