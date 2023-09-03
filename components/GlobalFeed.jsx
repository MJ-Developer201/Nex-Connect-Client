import React, { useEffect, useContext, useState, Fragment } from 'react'
import SendIcon from '@mui/icons-material/Send'
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RecommendIcon from '@mui/icons-material/Recommend'
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood'
import axios from 'axios'
import {
  CommentsContext,
  FriendsContext,
  PostFeedContext,
  ProfileDataContext,
  ProfileIdContext,
  ProfilePicContext,
  UsernameContext,
} from '../src/App'
import '../css/globalFeed.css'
import CommentIcon from '@mui/icons-material/Comment'
import { Link, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import { Message } from '@mui/icons-material'
import FeedProfileButton from '../jsxComponents/FeedProfileButton'
import FeedTimeStamp from '../jsxComponents/FeedTimeStamp'
import FeedLikeButton from '../jsxComponents/FeedLikeButton'

//

//
export default function GlobalFeed() {
  // Component Variables & Context

  const [commentValue, setCommentValue] = useState('')
  const [postFeed, setPostFeed] = useContext(PostFeedContext)
  const [profileData, setProfileData] = useContext(ProfileDataContext)
  const [friendsArray, setFriendsArray] = useContext(FriendsContext)
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)
  const [profileId, setProfileId] = useContext(ProfileIdContext)
  const [comments, setComments] = useContext(CommentsContext)
  const [profilePic, setProfilePic] = useContext(ProfilePicContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  const navigate = useNavigate()
  const [selectedPostId, setSelectedPostId] = useState(null)
  //

  //
  const token = localStorage.getItem('key')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const api_url = import.meta.env.VITE_SECRET

  //Main Feed Data
  useEffect(() => {
    axios
      .get(`${api_url}/main-feed`)
      .then((res) => {
        const feedArray = res.data
        if (feedArray) {
          setPostFeed(feedArray)
        } else {
          console.log('data not received')
        }
      })
      .catch((error) => console.log(error))
  }, [])

  //likes function
  function likesIconClicked(postId) {
    const token = localStorage.getItem('key')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .post(`${api_url}/main-likes`, { postId }, config)
      .then((response) => {
        const { likes } = response.data
        const updatedPostFeed = postFeed.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: likes }
          } else {
            return post
          }
        })
        setPostFeed(updatedPostFeed)
      })
      .catch((error) => console.log(error.message))
  }

  //add Friend function
  function addFriend(userId) {
    //getting user ID
    const token = localStorage.getItem('key')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    axios

      .post(`${api_url}/add-friend`, { userId }, config)
      .then((response) => {
        const { item } = response.data
        const { friends } = item
        setFriendsArray(friends)
        const updatedData = { ...profileData, friends: friends }
      })
      .catch((error) => console.log(error))
  }

  //add comment function
  function addComment(e, postId) {
    e.preventDefault()
    const comment = commentValue
    if (!comment) {
      console.log('Comment Cannot be empty')
      return
    }
    axios
      .post(`${api_url}/add-comment`, { postId, comment, profileId }, config)
      .then((response) => {
        const { comments: responseComments } = response.data.updatedPost
        setComments(responseComments)
      })
      .catch((error) => console.log(error.message))
  }

  //modal/dialog function
  function handleOpenDialog() {
    setDialogOpen(true)
  }

  function handleCloseDialog() {
    setDialogOpen(false)
  }

  function goToProfile(profile, username) {
    axios
      .post(`${api_url}/other-profile`, { profile }, config)
      .then((response) => {
        navigate(`${username}/${profile}/${v4()}`)
      })
      .catch((error) => console.log(error.message))
  }

  //Jsx return
  if (postFeed.length === 0) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        {postFeed.map((post) => (
          <Card style={{ marginBlock: '5rem' }} key={post._id} elevation={3} className=''>
            <FeedProfileButton
              goToProfile={goToProfile}
              addFriend={addFriend}
              post_userProfile={post.userProfile}
              post_User={post.username}
              post_Picture={post.picture}
            />
            <FeedTimeStamp post_createdAt={post.createdAt} />
            <p className='timeline-pTag'>{post.post}</p>
            <Divider />

            <div
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              className='d-flex  mt-3'
            >
              <div style={{ marginTop: '0.1rem' }}>
                <FeedLikeButton
                  likesIconClicked={likesIconClicked}
                  post_Likes={post.likes}
                  post_Id={post._id}
                />
              </div>
              <input
                style={{ maxWidth: '500px', marginRight: '20px' }}
                value={commentValue[post._id]}
                onChange={(e) => setCommentValue(e.target.value)}
                type='text'
                variant='outlined'
                className='form-control comment-input'
                label='Leave a comment'
              />
              <div
                onClick={(e) => addComment(e, post._id)}
                style={{
                  marginBottom: '0.5rem',
                  paddingRight: '10px',
                }}
              >
                <Button color='secondary' style={{}} variant='outlined'>
                  Send
                  <SendIcon style={{ marginRight: '-10px', marginLeft: '0.4rem' }} className='comment-icon' />
                </Button>
              </div>
            </div>
            <Divider />

            <div className='' style={{ marginBlock: '', display: 'flex', justifyContent: 'space-evenly' }}>
              <Button
                color='secondary'
                onClick={() => {
                  setSelectedPostId(post._id)
                  handleOpenDialog()
                }}
                style={{ borderRadius: 10, marginBlock: 10 }}
                variant='outlined'
              >
                Comments
              </Button>
            </div>
          </Card>
        ))}
        <Dialog open={dialogOpen} fullWidth maxWidth='xs'>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
            {comments
              .filter((comment) => comment.post === selectedPostId)
              .map((comment) => (
                <div
                  className='comment-profile'
                  onClick={() => goToProfile(comment.commenter._id, comment.commenter.username)}
                  style={{ display: 'flex', alignItems: 'center', marginBlock: '1rem' }}
                  key={comment._id}
                >
                  <Avatar style={{ marginRight: '8px' }} src={comment.commenter.picture} />
                  <div
                    style={{
                      marginLeft: '0.2rem',
                      padding: '15px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography style={{ fontSize: '1.1rem' }}>
                      <strong>{comment.commenter.username}</strong>
                    </Typography>

                    <Typography style={{}} variant='body2'>
                      {comment.content}
                    </Typography>
                  </div>
                  <Divider style={{ backgroundColor: 'black', color: 'black' }} />
                </div>
              ))}
            <Button
              onClick={() => {
                setSelectedPostId(null)
                handleCloseDialog()
              }}
              style={{ alignSelf: 'flex-end', marginTop: '16px' }}
              variant='outlined'
            >
              Close
            </Button>
          </div>
        </Dialog>
      </div>
    )
  }
}
