import { GoogleLogin } from '@react-oauth/google'

import AuthContext from '../utils/AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { user, login, loading } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => login(credentialResponse)}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        )
      }
    </>
  )
}

export default Login