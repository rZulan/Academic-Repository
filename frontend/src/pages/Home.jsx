import { useContext } from "react"
import AuthContext from "../utils/AuthContext"

const Home = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
      {
        user &&
        <>
        <h1>{user.email}</h1>
        <img src={user.picture} alt="" />
        </>
      }
    </>
  )
}

export default Home