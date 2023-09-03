const api_url = import.meta.env.api_url

export default function getComments(config) {
  axios
    .get(`${api_url}/comments`, config)
    .then((response) => {
      const resData = response.data
      setProfileData(resData)
    })
    .catch((error) => console.log(error))
}
