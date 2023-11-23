import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

  const featuredDocuments = [
    {
      id: 1,
      title: 'Document Title 1',
      abstract: 'Abstract 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eius.',
    },
    {
      id: 2,
      title: 'Document Title 2',
      abstract: 'Abstract 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eius.',
    },
    {
      id: 3,
      title: 'Document Title 3',
      abstract: 'Abstract 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eius.',
    },
    {
      id: 4,
      title: 'Document Title 4',
      abstract: 'Abstract 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eius.',
    },
    {
      id: 5,
      title: 'Document Title 5',
      abstract: 'Abstract 5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eius.',
    },
    {
      id: 6,
      title: 'Document Title 6',
      abstract: 'Abstract 6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, eius.',
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: '30px'
  }

  return (
    <>
      <section className='flex flex-col items-center'>
      <form onSubmit={handleSubmit} className="my-4 flex items-center">
        <input
          type="text"
          name="search"
          value={formData.search}
          onChange={handleChange}
          className="border p-3 rounded-l border-b w-64 focus:outline-none focus:ring focus:border-blue-300 flex-grow"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-3 rounded-r hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>

        <Link to="/library" className="ml-2 bg-orange-400 text-white px-4 py-3 rounded hover:bg-orange-500 focus:outline-none focus:ring focus:border-blue-300">
          Browse Documents
        </Link>
      </section>

      <section className="mt-8 mx-32">
        <h1 className="text-3xl font-semibold mb-4">Featured Documents</h1>
        <Slider {...settings}>
          {/* Featured Document Cards */}
          {featuredDocuments.map((document) => (
            <div key={document.id} className="bg-orange-300 p-4 rounded shadow">
              <h1 className="text-lg font-semibold mb-2">{document.title}</h1>
              <p className="text-gray-600">{document.abstract}</p>
            </div>
          ))}
        </Slider>
      </section>

      <section className="mt-8">
        <h1 className="text-3xl font-semibold mb-4">What is DHVSU Repository?</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum facilis, ducimus hic
          architecto quam maiores itaque natus, voluptatem neque doloribus ab vitae aliquid sint
          perferendis saepe...
        </p>
      </section>

      <section className="mt-8">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <ul className="list-disc pl-4">
          <li>E-Mail: contact@dhvsu.edu.ph</li>
          <li>Phone: (214) 9934-52345</li>
          <li>
            Messenger:{' '}
            <a href="https://messenger.com" className="text-blue-500 hover:underline">
              https://messenger.com/DHVSU-Admin
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Home
