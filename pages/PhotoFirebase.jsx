import React from 'react'
import PhotoForm from '../components/PhotoForm'
import Sidebar from '../components/SideBar'
import FriendsList from '../components/FriendsList'

export default function UploadFirebase() {
  return (
    <>
      <div className='layout-container'>
        <Sidebar />

        <PhotoForm />
        <FriendsList />
      </div>
    </>
  )
}
