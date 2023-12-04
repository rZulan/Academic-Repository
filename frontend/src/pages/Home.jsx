import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';

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

  const [loading, setLoading] = useState(true); // Add loading state
  const [featuredDocuments, setFeaturedDocuments] = useState([]);

  useEffect(() => {
    const fetchFeaturedDocuments = async () => {
      try {
        const response = await API.get('/library/'); // Replace with the correct endpoint
        setFeaturedDocuments(response.data.slice(0, 6));
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching featured documents:', error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchFeaturedDocuments();
  }, []);

  return (
    <>
      <section className='flex flex-col items-center mt-[160px]'>
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

      <section className="mt-8 mx-8 lg:mx-32 mb-[100px]">
        <h1 className="text-3xl font-semibold mb-4">Featured Documents</h1>
        <div className="border-t-2 border-gray-300 my-4 mx-3"></div>
        {loading ? (
          <div className="flex flex-wrap justify-center">
            <div className="loader ease-linear rounded-full border-t-4 border-t-[#600414] h-12 w-12 mb-2 animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {featuredDocuments.map((document) => (
              <Link key={document.id} to={`/document/${document.id}`}>
                <div className="bg-white p-4 rounded shadow-lg hover:shadow-xl hover:scale-105 transition duration-300">
                  <h1 className="text-lg font-semibold mb-2">{document.title}</h1>
                  <p className="text-gray-600">{document.abstract}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
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
