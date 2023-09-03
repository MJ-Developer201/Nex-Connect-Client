import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import PostInput from './PostInput'
import GlobalFeed from './GlobalFeed'
import { FriendsContext, ProfileDataContext, UsernameContext } from '../src/App'
import MainCard from './MainCard'

export default function Feed() {
  const [profileData, setProfileData] = useContext(ProfileDataContext)
  const [friendsArray, setFriendsArray] = useContext(FriendsContext)
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)
  const api_url = import.meta.env.VITE_SECRET
  //getting the profile info
  useEffect(() => {
    const token = localStorage.getItem('key')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .get(`${api_url}/user-info`, config)
      .then((response) => {
        setProfileData(response.data)
        const { username, friends } = response.data.item
        setFriendsArray(friends)
        setUsernameContext(username)
      })

      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      {profileData && (
        <div className='' style={{}}>
          <MainCard />
          <PostInput profileData={profileData} />
          <GlobalFeed />
        </div>
      )}
    </>
  )
}
