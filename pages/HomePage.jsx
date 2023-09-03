import React, { useContext, useEffect, useState } from 'react'
import Login from './Login'
import { AuthContext, CommentsContext, ProfileIdContext } from '../src/App'
import Feed from '../components/Feed'
import SideBar from '../components/SideBar'
import FriendsList from '../components/FriendsList'
import profileData from '../utils/profileData'
import MainCard from '../components/MainCard'
import '../css/layoutContainer.css'
import axios from 'axios'

export default function HomePage() {
  const [profileId, setProfileId] = useContext(ProfileIdContext)
  const [loggedIn, setLoggedIn] = useContext(AuthContext)
  const [comments, setComments] = useContext(CommentsContext)
  const api_url = import.meta.env.VITE_SECRET

  //Loading Profile Identification

  useEffect(() => {
    profileData().then((id) => {
      if ((id, loggedIn)) {
        setProfileId(id)
      }
    })
  }, [profileId, loggedIn])

  useEffect(() => {
    const token = localStorage.getItem('key')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .get(`${api_url}/comments`)
      .then((response) => {
        const { commentsData } = response.data

        setComments(commentsData)
      })
      .catch((error) => console.log(error.message))
  }, [])

  if (loggedIn) {
    return (
      <>
        <div className='layout-container'>
          <SideBar />
          <Feed />
          <FriendsList />
        </div>
      </>
    )
  } else {
    return <Login />
  }
}
