import React, { useEffect, useState } from 'react'
import { Typography, Card, CardHeader, CardContent, Divider, Avatar } from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'

//style sheet ref
const apiKey = 'uPzrAOIq8zxvnq1B5UkHI4lc5C9ewoqz'
const api = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}`
//

export default function NewsFeed() {
  const [users, setUsers] = useState([])
  const news_key = import.meta.env.VITE_NEWS_API

  useEffect(() => {
    fetch(api)
      .then((response) => {
        response.json()
      })
      .then((data) => {})
      .catch((error) => console.log(error.message))
  }, [])

  //jsx return
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '10px',
      }}
    ></div>
  )
}
