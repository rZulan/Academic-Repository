import { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import API from './API'

import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  
  const login = (credentialResponse) => {
    let decodedUser = jwtDecode(JSON.stringify(credentialResponse))
    
    const firstName = decodedUser.given_name || ' '
    const lastName = decodedUser.family_name || ' '

    API.post('/login/', {
      google_user_id: decodedUser.sub,
      email: decodedUser.email,
      picture: decodedUser.picture,
      email_verified: decodedUser.email_verified,
      first_name: firstName,
      last_name: lastName,
    })
    .then((response) => {
      let backendUser = jwtDecode(JSON.stringify(response.data))

      setUser(backendUser)
      
      localStorage.setItem('user', JSON.stringify(backendUser))
      
      navigate('/')
    })
    .catch((error) => {
      console.error('Axios Error:', error)
    })
  }

  const logout = () => {
    localStorage.removeItem('user')

    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}