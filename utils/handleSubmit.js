import axios from 'axios'
const api_url = import.meta.env.VITE_SECRET
export default function handleSubmit(e, postInput, setPostInput, config, setPostFeed, profileId) {
  e.preventDefault()

  axios
    .post(`${api_url}/post`, { postInput, profileId }, config)
    .then((response) => {
      const newPost = response.data
      setPostFeed(newPost)
      setPostInput('')
    })
    .catch((error) => {
      console.log(error)
    })
    .catch((error) => console.log(error))
}
