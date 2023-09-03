const api_url = import.meta.env.api_url
export default function getProfile(config) {
  axios
    .get(`${api_url}/user-info`, config)
    .then((response) => {
      const resData = response.data
      setProfileData(resData)
    })
    .catch((error) => console.log(error))
}
