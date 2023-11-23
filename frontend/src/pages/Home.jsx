import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [formData, setFormData] = useState({
    search: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input // - SEARCH BAR
        type="text"
        name="search"
        value={formData.search}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>

    <Link to='/library'>Browse Documents</Link>
    </>
  )
}

export default Home
