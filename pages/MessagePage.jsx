import React from 'react'
import Sidebar from '../components/SideBar'
import FriendsList from '../components/FriendsList'
import MessagesComponent from '../components/MessageComponent'

export default function MessagePage() {
  return (
    <>
      <div className='layout-container'>
        <Sidebar />
        <MessagesComponent />
        <FriendsList />
      </div>
    </>
  )
}
