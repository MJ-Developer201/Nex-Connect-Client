import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/SideBar'
import FriendsList from '../components/FriendsList'
import AltUserProfile from '../components/AltUserProfile'
import axios from 'axios'
import { config } from '../utils/token'
import { OtherUserIdContext } from '../src/App'
const api_url = import.meta.env.VITE_SECRET

export default function ViewUserPage() {
  const { username, targetId } = useParams()
  const [targetProfile, setTargetProfile] = useState({})

  useEffect(() => {
    axios.post(`${api_url}/target-user`, { targetId }, config).then((res) => {
      const profile = res.data
      setTargetProfile(profile)
    })
  }, [targetId])

  return (
    <div>
      <>
        <div className='layout-container'>
          <Sidebar />
          <AltUserProfile profile={targetProfile} />
          <FriendsList />
        </div>
      </>
    </div>
  )
}
