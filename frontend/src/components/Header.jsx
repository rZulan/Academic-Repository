import { Link } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';
import { useContext } from 'react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold">DHVSU Repository</h1>

        <nav className="space-x-4 flex items-center">
          <Link to='/' className="text-white">Home</Link>
          <Link to='/profile' className="text-white">Profile</Link>

          {user ? (
            <div className="flex items-center">
              <Link onClick={logout} className="text-white">Logout</Link>
              {user.picture && <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full ml-2" />}
            </div>
          ) : (
            <Link to='/login' className="text-white">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
