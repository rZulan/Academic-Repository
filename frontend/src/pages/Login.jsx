import { GoogleLogin } from '@react-oauth/google';
import AuthContext from '../utils/AuthContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { user, login, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F6F6F6' }}>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
            <h1 className="text-2xl font-bold" style={{ color: '#600414' }}>DHVSU REPOSITORY</h1>
          </div>

          <div className="flex items-center justify-center mt-5 mb-2">
          <h1 className="text-xl font-bold" style={{ color: '#600414' }}>LOGIN</h1>
        </div>

        <p className="flex items-center justify-center mt-5 mb-2">Use DHVSU account to login:</p>
      
        <div className="flex items-center justify-center mt-5 mb-2">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-t-4 border-t-[#600414] h-12 w-12 mb-2 animate-spin"></div>
            <p className="text-gray-600">Logging in...</p>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => login(credentialResponse)}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        )}
      </div>

        </div>
      </div>
  );
};

export default Login;
