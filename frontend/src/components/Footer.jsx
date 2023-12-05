import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-96 bg-[#333] text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Footer Section 1: About Us */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
            <h2 className="text-xl font-bold mb-4 text-[#fbbf24]">DHVSU Archives</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, officiis.
            </p>
          </div>

          {/* Footer Section 2: Quick Links */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
            <h2 className="text-xl font-bold mb-4 text-[#fbbf24]">Quick Links</h2>
            <ul className="list-unstyled">
              <li>
                <a className="hover:text-[#fbbf24]" href="/">Home</a>
              </li>
              <li>
                <a className="hover:text-[#fbbf24]" href="/library">Library</a>
              </li>
              <li>
                <a className="hover:text-[#fbbf24]" href="/about">About</a>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Footer Section 3: Contact Us */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
            <h2 className="text-xl font-bold mb-4 text-[#fbbf24]">Contact Us</h2>
            <p className="text-gray-400 hover:text-[#fbbf24]">
              <strong >Email:</strong> contact@dhvsu.edu.ph
            </p>
            <p className="text-gray-400 hover:text-[#fbbf24]">
              <strong>Phone:</strong> (214) 9934-52345
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
