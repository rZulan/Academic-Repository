// DocumentPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/API";

const DocumentPage = () => {
  const [document, setDocument] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/document/${id}`)
      .then(res => {
        setDocument(res.data);
      })
      .catch(error => {
        console.error("Error fetching document:", error);
      });
  }, [id]);

  const handleBackClick = () => {
    // Use the navigate function to navigate back to the library page
    navigate("/library");
  };

  return (
    <div className="main-body bg-gray-100 p-7">
      {document ? (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          {document ? (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4">{document.title}</h2>
            <p className="text-gray-600 mb-4">{document.abstract}</p>
            <div className="border-t border-gray-300 my-6"></div>
            <div className="flex flex-wrap justify-between text-gray-700">
              <div className="mb-4">
                <strong className="text-gray-900">Author:</strong> {document.author}
              </div>
              <div className="mb-4">
                <strong className="text-gray-900">Year:</strong> {document.school_year}
              </div>
              <div className="mb-4">
                <strong className="text-gray-900">Department:</strong> {document.department}
              </div>
              <div className="mb-4">
                <strong className="text-gray-900">Course:</strong> {document.course}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
          <button
            onClick={handleBackClick}
            className="bg-[#600414] text-white py-3 px-6 rounded hover:bg-[#40030d] transition duration-300 mt-4"
          >
            Back to Library
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DocumentPage;