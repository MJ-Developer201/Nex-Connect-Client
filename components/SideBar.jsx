import React, { useContext, useState } from 'react'
import '../css/sidebar.css'
import '../css/mediaquery.css'
import { Typography, Avatar } from '@mui/material'
import {
  AccountBoxOutlined,
  People,
  NewspaperOutlined,
  MessageOutlined,
  LogoutOutlined,
  CloseOutlined,
  Menu,
} from '@mui/icons-material'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link } from 'react-router-dom'
import { UsernameContext, ProfilePicContext } from '../src/App'
import handleLogout from '../utils/logoutfunc'

const Sidebar = () => {
  const [profilePic, setProfilePic] = useContext(ProfilePicContext)
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)

  return (
    <>
      <div style={{ maxHeight: 380, maxWidth: 300 }} className={`card nav-card`}>
        <nav className=''>
          <div>
            <Link to='/' className='nav_logo'>
              <Avatar style={{ marginLeft: '-4px' }} className='nav_logo-icon' src={profilePic} />

              <div style={{ textDecoration: 'none' }} variant='body2' className='nav_logo-name'>
                <Typography variant='body1'>Hello , {usernameContext}</Typography>
                <div
                  className='greetings-padding'
                  style={{
                    padding: 1,
                    backgroundColor: '#2376A8',

                    marginLeft: '-0.1rem',
                    minWidth: '100px',
                  }}
                ></div>
              </div>
            </Link>
            <div className='nav_list'>
              <Link to='/profile-page' className='nav_link '>
                <AccountBoxOutlined className='nav_icon' />
                <Typography variant='body2' className='nav_name'>
                  Profile
                </Typography>
              </Link>
              <Link to='/messages' className='nav_link'>
                <MessageOutlined className='nav_icon' />
                <Typography variant='body2' className='nav_name'>
                  Messages
                </Typography>
              </Link>
              <Link to='/friends-page' className='nav_link'>
                <People className='nav_icon' />
                <Typography variant='body2' className='nav_name'>
                  Friends
                </Typography>
              </Link>
              <Link to='/news' className='nav_link'>
                <NewspaperOutlined className='nav_icon' />
                <Typography variant='body2' className='nav_name'>
                  News
                </Typography>
              </Link>

              <Link onClick={() => handleLogout()} to='/login' className='nav_link'>
                <LogoutOutlined className='nav_icon' />
                <Typography variant='body2' className='nav_name'>
                  Logout
                </Typography>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
