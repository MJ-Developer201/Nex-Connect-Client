import React, { useContext } from 'react'
import { FriendsContext } from '../src/App'
import '../css/friendsList.css'
import '../css/mediaquery.css'
import { Avatar, Card, TextField } from '@mui/material'
import axios from 'axios'
import { config } from '../utils/token'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

const FriendsList = () => {
  const [friendsArray, setFriendsArray] = useContext(FriendsContext)
  const api_url = import.meta.env.VITE_SECRET
  const navigate = useNavigate()

  //
  function goToProfile(profile) {
    axios
      .post(`${api_url}/other-profile`, { profile }, config)
      .then((response) => {
        navigate(`/${profile}/${v4()}`)
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <div>
      <div className='card nav-card friends-list-card'>
        <div className='card-header bg-transparent border-bottom-0'>
          <h5 className='mb-0 text-muted'>Friends</h5>
          <div className='underline'></div>
        </div>
        <div className='card-body'>
          {/* <TextField
            style={{ marginBottom: 20, marginTop: -10 }}
            fullWidth
            className='friend-search-field'
            size='small'
            placeholder='Search Contacts'
          /> */}
          {friendsArray.length === 1 && friendsArray[0] === 'No Friends Yet' ? (
            <p className='no-friends-message'>No Friends Yet</p>
          ) : (
            friendsArray.map((friend) => (
              <div
                style={{ marginBottom: 15 }}
                key={friend._id}
                className='d-flex align-items-center friend-item'
              >
                <div onClick={() => goToProfile(friend._id)} className='mr-3 friends-list-avatar'>
                  <Avatar src={friend.picture} />
                </div>
                <h6
                  style={{ color: 'black' }}
                  onClick={() => goToProfile(friend._id)}
                  className='mb-0 friends-list-h6'
                >
                  {friend.username}
                </h6>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendsList
