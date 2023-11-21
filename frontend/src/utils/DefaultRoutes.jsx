import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

const DefaultRoutes = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default DefaultRoutes