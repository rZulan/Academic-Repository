import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [formData, setFormData] = useState({
    search: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
  ];

  return (
    <>
      <section className='flex flex-col items-center'>
        <div className="text-center mb-20 mt-20">
          <h1 className="text-5xl font-bold mb-4 text-[#600414]">DHVSU Thesis/Capstone Repository</h1>
          <p className="text-2xl">Your Gateway to Academic Excellence – Where Ideas Thrive and Originality Shines!</p>
        </div>

        <form onSubmit={handleSubmit} className="my-4 flex items-center">
          <input
            type="text"
            name="search"
            value={formData.search}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 outline-none w-full sm:w-96 rounded-lg focus:outline-none focus:border-[#600414] transition duration-300 shadow-lg"
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

      <section className="mt-8 mx-8 lg:mx-32">
        <h1 className="text-3xl font-semibold mb-4">Featured Documents</h1>
        <div className="border-t-2 border-gray-300 my-4 mx-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {featuredDocuments.map((document) => (
            <div key={document.id} className="bg-white p-4 rounded shadow-lg hover:shadow-xl hover:scale-105 transition duration-300">
              <h1 className="text-lg font-semibold mb-2">{document.title}</h1>
              <p className="text-gray-600">{document.abstract}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 mx-8 lg:mx-32">
        <h1 className="text-3xl font-semibold mb-4">What is DHVSU Repository?</h1>
        <div className="border-t-2 border-gray-300 my-4"></div>
        <p className="text-gray-600">
        The DHVSU Repository is a comprehensive and innovative platform designed to serve as a centralized hub for academic research and scholarly work,
         specifically focusing on the storage and dissemination of theses, capstone projects, and dissertations. This repository is a powerful resource
          for students, and faculty in DHVSU (Don Honorio Ventura State University).
        </p>
      </section>
    </>
  );
}

export default Home;
