import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import DefaultRoutes from './utils/DefaultRoutes'

import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<DefaultRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
