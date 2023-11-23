import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-96 bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Footer Section 1: About Us */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
            <h2 className="text-xl font-bold mb-4">DHVSU Archives</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, officiis.
            </p>
          </div>

          {/* Footer Section 2: Quick Links */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/library">Library</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Footer Section 3: Contact Us */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400">
              <strong>Email:</strong> contact@dhvsu.edu.ph
            </p>
            <p className="text-gray-400">
              <strong>Phone:</strong> (214) 9934-52345
            </p>
          </div>

          {/* Footer Section 4: Social Media */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-4">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              {/* Add more social media links as needed */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
