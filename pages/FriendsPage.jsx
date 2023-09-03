import React from 'react'
import FriendsComponent from '../components/FriendsComponent'
import '../css/layoutContainer.css'
import Sidebar from '../components/SideBar'
import FriendsList from '../components/FriendsList'

export default function FriendsPage() {
  return (
    <>
      <div className='layout-container'>
        <Sidebar />
        <FriendsComponent />
        <FriendsList />
      </div>
    </>
  )
}
