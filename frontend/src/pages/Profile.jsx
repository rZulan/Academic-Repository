import React, { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../utils/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext)
  
  // const [user] = useState({
  //   username: 'John Doe',
  //   email: 'johndoe@example.com',
  //   bio: 'Enthusiastic learner and tech enthusiast. Passionate about new technologies and software development.',
  //   profilePic: 'https://via.placeholder.com/150',
  // });

  const [uploadedDocuments] = useState([
    { title: 'Understanding React Hooks', date: '2023-01-01' },
    { title: 'Advanced CSS Techniques', date: '2023-02-01' },
  ]);

  const [recentlyViewed] = useState([
    { title: 'Node.js Best Practices', date: '2023-03-01' },
    { title: 'Database Optimization Strategies', date: '2023-04-01' },
  ]);

  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleDocumentUpload = () => {
    const newDocument = { title: newDocumentTitle, date: new Date().toLocaleDateString() };
    uploadedDocuments.push(newDocument);
    setNewDocumentTitle('');
  };

  const handleAddFavorite = (title) => {
    setFavorites([...favorites, title]);
  };

  return (
    <div className="mt-5 p-3">
  <div className="container mx-auto bg-[#F9FAFB] shadow-md rounded-lg overflow-hidden">
    <div className="md:flex">
      <div className="md:w-1/4 p-8 bg-[#600414] text-white">
        <div className="text-center mb-6">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4 mx-auto border-4 border-[#FF9A8B]"
          />
          <h1 className="text-2xl font-semibold">{user.username}</h1>
          <p className="text-lg">{user.email}</p>
          <button className="bg-white text-[#600414] hover:bg-[#FF9A8B] font-semibold py-2 px-4 rounded-full my-2">
            Edit Profile
          </button>
        </div>
        <div>
          <p className="text-lg">Enthusiastic learner and tech enthusiast. Passionate about new technologies and software development.</p>
        </div>
      </div>
      <div className="md:w-3/4 p-8">
        <div className="mb-10"></div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2">Favorites/Bookmarks</h2>
          <ul className="list-disc pl-5">
            {favorites.map((title, index) => (
              <li key={index} className="mb-2 text-[#600414]">
                {title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2">Recently Viewed Documents</h2>
          <ul className="list-disc pl-5">
            {recentlyViewed.map((doc, index) => (
              <li key={index} className="mb-4 text-[#600414]">
                <div className="flex justify-between items-center">
                  <span>{doc.title}</span>
                  {favorites.includes(doc.title) ? (
                    <span className="text-[#FF9A8B]">Bookmarked</span>
                  ) : (
                    <button
                      onClick={() => handleAddFavorite(doc.title)}
                      className="bg-[#FF9A8B] hover:bg-[#FF806B] text-[#600414] font-semibold py-1 px-2 rounded"
                    >
                      Add to Favorites
                    </button>
                  )}
                </div>
                <p className="text-sm text-[#9B9B9B]">{doc.dateViewed}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
