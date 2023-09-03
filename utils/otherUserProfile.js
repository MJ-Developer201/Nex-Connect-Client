import axios from 'axios'
import { config } from './token'
const api_url = import.meta.env.api_url
export const otherUserProfile = (userId) => {
  axios
    .get(`${api_url}/other-user-profile`, { params: userId }, config)
    .then((response) => {
      return response.data.profile
    })
    .catch((error) => console.log(error.message))
}
