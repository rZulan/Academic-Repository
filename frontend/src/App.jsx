import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from './utils/AuthContext';
import DefaultRoutes from './utils/DefaultRoutes'

import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Library from './pages/Library';
import Document from './pages/Document';
import Upload from './pages/Upload';
import Upload2 from './pages/Upload2';
import Upload3 from './pages/Upload3';

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<DefaultRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/library' element={<Library />} />
              <Route path='/upload' element={<Upload />} />
              <Route path='/upload2' element={<Upload2 />} />
              <Route path='/upload3' element={<Upload3 />} />
              <Route path='/document/:id' element={<Document />} />
            </Route>
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  )
}

export default App
