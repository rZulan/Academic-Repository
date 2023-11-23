import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState(null)

  const handleLogin = (credentialResponse) => {
    let decodedUser = jwtDecode(JSON.stringify(credentialResponse))
    
    const firstName = decodedUser.given_name || ' ';
    const lastName = decodedUser.family_name || ' ';

    // Make an Axios request to your Django endpoint
    axios.post('http://127.0.0.1:8000/api/login/', {
      google_user_id: decodedUser.sub,
      email: decodedUser.email,
      picture: decodedUser.picture,
      email_verified: decodedUser.email_verified,
      first_name: firstName,
      last_name: lastName,
    })
    .then((response) => {
      console.log('Django Response:', response.data)
      let backendUser = jwtDecode(JSON.stringify(response.data))

      setUser(backendUser)
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

      {
        user &&
        <>
        <h1>{user.email}</h1>
        <h3>{user.first_name} {user.last_name}</h3>
        <img src={user.picture} alt="no picture" />
        </>
      }
    </>
  )
}

export default Login