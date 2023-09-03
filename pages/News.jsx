import React from 'react'
import FriendsList from '../components/FriendsList'
import Sidebar from '../components/SideBar'
import NewsFeed from '../components/NewsFeed'

export default function News() {
  return (
    <>
      <div className='layout-container'>
        <Sidebar />
        <NewsFeed />
        <FriendsList />
      </div>
    </>
  )
}
