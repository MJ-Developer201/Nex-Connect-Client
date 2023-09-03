import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home as HomeIcon, Menu } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Switch, Button, Menu as MuiMenu, MenuItem } from '@mui/material'
import { ThemeContext, UsernameContext } from '../src/App'
import { useContext, useState } from 'react'
import handleLogout from '../utils/logoutfunc'

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false)
  const { darkMode, handleDarkMode } = useContext(ThemeContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
  const [usernameContext, setUsernameContext] = useContext(UsernameContext)
  // const [loggedIn, setLoggedIn] = useContext()
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleFriendsClick = () => {
    navigate('/friends-page')
    setAnchorEl(false)
  }

  const handleProfileClick = () => {
    navigate('/profile-page')
    setAnchorEl(false)
  }

  const handleHomeClick = () => {
    navigate('/')
    setAnchorEl(false)
  }

  const handleMessagesClick = () => {
    navigate('/messages')
    setAnchorEl(false)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{}} className='nav-bar' position='static'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Link style={{ textDecoration: 'none' }} className='logo-link' to={'/'}>
                <Typography className='page-title' variant='h6' component='div'>
                  Nex Connect
                </Typography>
              </Link>
            </div>

            <div>
              <Link className='homepage-button' to={'/'}>
                <HomeIcon className='home-icon' />
              </Link>
            </div>

            <div style={{ display: 'flex' }}>
              {/* <span className='navbar-spans'>
                <Switch
                  color='default'
                  size='small'
                  onChange={handleDarkMode}
                  checked={darkMode}
                  style={{}}
                ></Switch>
              </span> */}
              {usernameContext && (
                <span className='hamburger-icon'>
                  <Menu onClick={handleClick} />
                </span>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <MuiMenu
        id='demo-positioned-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleHomeClick}>Home</MenuItem>
        <MenuItem onClick={handleMessagesClick}>Message</MenuItem>

        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleFriendsClick}>Friends</MenuItem>
        <Link to={'/login'}>
          <MenuItem
            onClick={() => {
              handleLogout()
            }}
          >
            Logout
          </MenuItem>
        </Link>
      </MuiMenu>
    </>
  )
}
