import { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import API from './API'

import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const setAuthLoading = (status) => {
    setLoading(status)
  }

  const login = async (credentialResponse) => {
    setAuthLoading(true)

    try {
      let decodedUser = jwtDecode(JSON.stringify(credentialResponse))

      const firstName = decodedUser.given_name || ' '
      const lastName = decodedUser.family_name || ' '

      const response = await API.post('/login/', {
        google_user_id: decodedUser.sub,
        email: decodedUser.email,
        picture: decodedUser.picture,
        email_verified: decodedUser.email_verified,
        first_name: firstName,
        last_name: lastName,
      })

      let backendUser = jwtDecode(JSON.stringify(response.data))

      setUser(backendUser)
      localStorage.setItem('user', JSON.stringify(backendUser))

      navigate('/')
    } catch (error) {
      console.error('Axios Error:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
  
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
