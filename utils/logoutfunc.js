export default function handleLogout() {
  localStorage.removeItem('key')
  localStorage.removeItem('GlobalVariableUsername')

  setLoggedIn(null)
  navigate('/')
}

function profileRedirect() {
  navigate('/profile-page')
}
