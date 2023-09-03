function configFunc() {
  const token = localStorage.getItem('key')
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  return config
}
export const config = configFunc()
