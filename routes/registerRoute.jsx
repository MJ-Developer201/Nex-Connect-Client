import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const api_url = import.meta.env.api_url

export function handleSubmit(e, email, password) {
  e.preventDefault()
  const navigate = useNavigate()
  axios
    .post(`${api_url}/register`, { email, password })
    .then((res) => {
      const token = res.data.token
      localStorage.setItem('key', token)
      console.log(token)
      if (token) {
      }
      navigate('/profile-form')
    })
    .catch((error) => {
      console.log(error, 'please try again')
    })
}
