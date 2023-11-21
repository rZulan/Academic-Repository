import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <Link to='/'>Home</Link>
    <Link to='/login'>Login</Link>
    <Link to='/profile'>Profile</Link>
    </>
  )
}

export default Header