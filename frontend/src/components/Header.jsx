import { Link } from 'react-router-dom'
import AuthContext from '../utils/AuthContext'
import { useContext } from 'react'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  
  return (
    <>
    <Link to='/'>Home</Link>
    {
      user ? (
        <Link onClick={logout}>Logout</Link>
      ) : (
        <Link to='/login'>Login</Link>
      )
    }
    
    <Link to='/profile'>Profile</Link>
    </>
  )
}

export default Header