import { useState, createContext, useEffect, useRef, useContext } from 'react'

import './index.css'
import HomePage from '../pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Navbar from '../components/Navbar'
import Register from '../pages/Register'
import UsernamePage from '../pages/UsernamePage'
import ProfilePage from '../pages/ProfilePage'
import FriendsList from '../components/FriendsList'
import News from '../pages/News.jsx'
import MessagePage from '../pages/MessagePage'
import FriendsPage from '../pages/FriendsPage'
import SettingsPage from '../pages/SettingsPage'
import UploadFirebase from '../pages/PhotoFirebase'
import axios from 'axios'
import gsap from 'gsap'
import { Container, ThemeProvider, colors, createTheme } from '@mui/material'
import ViewUserPage from '../pages/ViewUserPage'
import { listAll, getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../utils/firebaseInit'
import EditProfilePage from '../pages/EditProfilePage'

//global context
export const LikesContext = createContext()
export const AuthContext = createContext()
export const PostFeedContext = createContext()
export const UsernameContext = createContext()
export const ProfileIdContext = createContext()
export const ProfileDataContext = createContext()
export const FriendsContext = createContext()
export const ThemeContext = createContext()
export const CommentsContext = createContext()
export const UserImagesContext = createContext()
export const ProfilePicContext = createContext()
export const OtherUserIdContext = createContext()

//start of Functional Component
function App() {
  const storedToken = localStorage.getItem('key')

  //context state
  const [loggedIn, setLoggedIn] = useState(storedToken !== null)
  const [postFeed, setPostFeed] = useState([])
  const [usernameContext, setUsernameContext] = useState('')
  const [postLikes, setPostLikes] = useState(0)
  const [profileId, setProfileId] = useState('')
  const [profileData, setProfileData] = useState(null)
  const [friendsArray, setFriendsArray] = useState(['No Friends Yet'])
  const [darkMode, setDarkMode] = useState(false)
  const [comments, setComments] = useState([])
  const [imageList, setImageList] = useState([])
  const [profilePic, setProfilePic] = useState(null)
  const [otherUserId, setOtherUserId] = useState('')
  const [userImages, setUserImages] = useState([])
  const imageListRef = ref(storage, `images/${usernameContext}`)
  const api_url = import.meta.env.VITE_SECRET

  //create theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2376A8',
      },
      secondary: {
        main: '#000000',
        light: '#AB2E29',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? 'rgba(0,0,0,0.9)' : 'white',
            color: darkMode ? 'white' : 'black',
            transition: 'background-color 1.2s ease',
          },
        },
      },
    },
  })

  // use effect to get all user pics from firebase
  useEffect(() => {
    usernameContext &&
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setUserImages((prev) => [...prev, url])
          })
        })
      })
  }, [])

  //useEffect for Session Token
  const targetRef = useRef(null)
  useEffect(() => {
    if (storedToken !== null) {
      setLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('key')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    loggedIn &&
      axios.get(`${api_url}/single-profile`, config).then((response) => {
        const { username, friends, picture } = response.data.profile
        setFriendsArray(friends)
        setUsernameContext(username)
        setProfilePic(picture)
      })
  }, [])

  function handleDarkMode() {
    setDarkMode((prevMode) => !prevMode)
  }

  const themeStyle = {
    // background: darkMode ? `linear-gradient(80deg, #5d4157, #a8caba)` : 'white',
    background: darkMode ? 'rgba(0,0,0,0.9)' : 'white',
    color: darkMode ? 'white' : 'black',
    minHeight: '100vh',
    transition: 'background-color 1.2s ease', // Smooth transition for the background color
    // ... Other styles you might want to apply ...
  }

  //Jsx render
  return (
    <>
      <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
        <div style={themeStyle}>
          <div ref={targetRef}>
            <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
              <ProfilePicContext.Provider value={[profilePic, setProfilePic]}>
                <UserImagesContext.Provider value={[imageList, setImageList]}>
                  <ProfileDataContext.Provider value={[profileData, setProfileData]}>
                    <UsernameContext.Provider value={[usernameContext, setUsernameContext]}>
                      <ProfileIdContext.Provider value={[profileId, setProfileId]}>
                        <PostFeedContext.Provider value={[postFeed, setPostFeed]}>
                          <LikesContext.Provider value={[postLikes, setPostLikes]}>
                            <FriendsContext.Provider value={[friendsArray, setFriendsArray]}>
                              <CommentsContext.Provider value={[comments, setComments]}>
                                <OtherUserIdContext.Provider value={[otherUserId, setOtherUserId]}>
                                  <UserImagesContext.Provider value={[userImages, setUserImages]}>
                                    <ThemeProvider theme={theme}>
                                      <Router>
                                        {/* <Container
                                          maxWidth='md
                                        '
                                        > */}
                                        <Navbar />

                                        <Routes>
                                          <Route path='/' element={<HomePage />} />
                                          <Route path='/news' element={<News />} />
                                          <Route path='/login' element={<Login />} />
                                          <Route path='/register' element={<Register />} />
                                          <Route path='/messages' element={<MessagePage />} />
                                          <Route path='friends-page' element={<FriendsPage />} />
                                          <Route path={'/username'} element={<UsernamePage />} />
                                          <Route path='/profile-page' element={<ProfilePage />} />
                                          <Route path='/friends-list' element={<FriendsList />} />
                                          <Route path='/messages' element={<MessagePage />} />
                                          <Route path='/settings' element={<SettingsPage />} />
                                          <Route path='/upload-form' element={<UploadFirebase />} />

                                          <Route path='/edit-profile' element={<EditProfilePage />} />
                                          <Route
                                            path='/:username/:targetId/:randomId'
                                            element={<ViewUserPage />}
                                          />
                                          <Route path='/:targetId/:randomId' element={<ViewUserPage />} />
                                        </Routes>
                                        {/* </Container> */}
                                      </Router>
                                    </ThemeProvider>
                                  </UserImagesContext.Provider>
                                </OtherUserIdContext.Provider>
                              </CommentsContext.Provider>
                            </FriendsContext.Provider>
                          </LikesContext.Provider>
                        </PostFeedContext.Provider>
                      </ProfileIdContext.Provider>
                    </UsernameContext.Provider>
                  </ProfileDataContext.Provider>
                </UserImagesContext.Provider>
              </ProfilePicContext.Provider>
            </AuthContext.Provider>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
