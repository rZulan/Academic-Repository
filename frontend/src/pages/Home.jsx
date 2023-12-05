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

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

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
<section className='flex flex-col items-center py-12 px-4 bg-[#600414] text-white'>
  <div className="text-center max-w-2xl mx-auto">
    <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">📚 DHVSU Thesis/Capstone Repository 🎓</h1>
    <p className="text-lg lg:text-2xl leading-relaxed">Your Gateway to Academic Excellence – Where Ideas Thrive and Originality Shines!</p>
  </div>

  <form onSubmit={handleSubmit} className="my-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
    <input
      type="text"
      name="search"
      value={formData.search}
      onChange={handleChange}
      className="bg-white text-[#600414] placeholder-[#600414] border-2 border-[#600414] px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-[#600414] transition duration-300 shadow-md"
      placeholder="🔍 Search Documents"
    />
    <button
      type="submit"
      className="bg-[#FF9A8B] hover:bg-[#FF806B] text-[#600414] rounded-lg px-6 py-3 w-full sm:w-auto transition duration-300 shadow-md"
    >
      🚀 Submit
    </button>
  </form>

  <Link to="/library" className="bg-[#FF9A8B] hover:bg-[#FF806B] text-[#600414] rounded-lg px-6 py-3 transition duration-300 shadow-md">
    📖 Browse Documents
  </Link>
</section>

<section className="mt-8 px-4 lg:px-32 mb-20">
  <h1 className="text-2xl lg:text-3xl font-semibold mb-4">🌟 Featured Documents</h1>
  <div className="border-t-2 border-[#600414] my-4"></div>
  {loading ? (
    <div className="flex justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-[#FF9A8B] h-12 w-12 mb-4 animate-spin"></div>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {featuredDocuments.map((document) => (
        <Link key={document.id} to={`/document/${document.id}`} className="hover:shadow-lg transition duration-300">
          <div className="bg-white p-4 rounded-lg border-2 border-[#FF9A8B]">
            <h1 className="text-lg font-semibold mb-2">{document.title}</h1>
            <p className="text-gray-600 text-sm">{truncateText(document.abstract, 150)}</p>
          </div>
        </Link>
      ))}
    </div>
  )}
</section>

<section className="mt-8 px-4 lg:px-32">
  <h1 className="text-2xl lg:text-3xl font-semibold mb-4">📚 What is DHVSU Repository?</h1>
  <div className="border-t-2 border-[#600414] my-4"></div>
  <p className="text-gray-600 text-lg">
    The DHVSU Repository is a comprehensive and innovative platform designed to serve as a centralized hub for academic research and scholarly work, 
    specifically focusing on the storage and dissemination of theses, capstone projects, and dissertations. This repository is a powerful resource
    for students, and faculty in DHVSU (Don Honorio Ventura State University).
  </p>
</section>


    </>
  );
}

export default Home;
