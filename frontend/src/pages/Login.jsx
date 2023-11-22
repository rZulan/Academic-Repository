import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState(null)

  const handleLogin = (credentialResponse) => {
    let decodedUser = jwtDecode(JSON.stringify(credentialResponse))
    console.log("Response:", credentialResponse)
    console.log("Sub: ", decodedUser.sub)

    // Make an Axios request to your Django endpoint
    axios.post('http://127.0.0.1:8000/api/login/', {
      google_user_id: decodedUser.sub,
      email: decodedUser.email,
      picture: decodedUser.picture,
      email_verified: decodedUser.email_verified
    })
    .then((response) => {
      console.log('Django Response:', response.data)
      // Handle the Django response as needed
    })
    .catch((error) => {
      console.error('Axios Error:', error)
      // Handle error if the request fails
    })
  }

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => handleLogin(credentialResponse)}
        onError={() => {
          console.log('Login Failed')
        }}
      />
    </>
  )
}

export default Login