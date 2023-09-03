import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/SideBar'
import FriendsList from '../components/FriendsList'
import Profile from '../components/Profile'
import { FriendsContext, ProfileDataContext, UsernameContext } from '../src/App'
import axios from 'axios'
export default function ProfilePage() {
  const [profileData, setProfileData] = useContext(ProfileDataContext)
  const [friendsArray, setFriendsArray] = useContext(FriendsContext)
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)
  const api_url = import.meta.env.VITE_SECRET
  // use effect
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

  //jsx return
  return (
    <>
      <div className='layout-container'>
        <Sidebar />
        <Profile />
        <FriendsList />
      </div>
    </>
  )
}
