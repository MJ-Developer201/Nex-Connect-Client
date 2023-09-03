import axios from 'axios'
import React from 'react'
const api_url = import.meta.env.VITE_SECRET
export default function profileData() {
  const token = localStorage.getItem('key')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return axios
    .get(`${api_url}/single-profile`, config)
    .then((response) => {
      return response.data.profile._id
    })
    .catch((error) => console.log(error.message))
}
