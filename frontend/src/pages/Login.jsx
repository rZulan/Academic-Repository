import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

const Login = () => {
  const [user, setUser] = useState(null)
  
  const handleLogin = (response) => {
    let decodedUser = jwtDecode(JSON.stringify(response))
    
    console.log("Response:", response)
    console.log(decodedUser)

  }
  
  return (
    <>
    <GoogleLogin
      onSuccess={credentialResponse => handleLogin(credentialResponse)}
      onError={() => {
        console.log('Login Failed');
      }}
    />
    </>
  )
}

export default Login