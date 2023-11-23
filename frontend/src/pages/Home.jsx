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

      <div className="text-center mb-20 mt-20">
          <h1 className="text-5xl font-bold mb-4 text-[#600414]">DHVSU Repository</h1>
          <p className="text-2xl">Lorem ipsum nigga de guas alimunim boji mads</p>
      </div>

      <form onSubmit={handleSubmit} className="my-4 flex items-center">
        <input
          type="text"
          name="search"
          value={formData.search}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 outline-none w-96 rounded-lg focus:outline-none focus:border-[#600414] transition duration-300 shadow-lg"
          placeholder="Search Documents"
        />
        <button
          type="submit"
          className="bg-[#600414] hover:scale-110 transition ease-in-out duration-300 text-white rounded-md px-4 py-2 ml-2 shadow-lg"
        >
          Submit
        </button>
      </form>

        <Link to="/library" className="bg-[#600414] hover:scale-110 transition ease-in-out duration-300 text-white rounded-md px-4 py-2 ml-2 shadow-lg">
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

      <section className="mt-8 mx-32">
        <h1 className="text-3xl font-semibold mb-4">What is DHVSU Repository?</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum facilis, ducimus hic
          architecto quam maiores itaque natus, voluptatem neque doloribus ab vitae aliquid sint
          perferendis saepe...
        </p>
      </section>
    </>
  )
}

export default Home
