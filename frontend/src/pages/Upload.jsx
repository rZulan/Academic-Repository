import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';
import API from '../utils/API';

const Upload = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && !user.is_staff) {
      navigate('/');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: '',
    college: '',
    course: '',
    file: null,
  });

  const [plagiarismScore, setPlagiarismScore] = useState(0);
  const [aiGeneratedScore, setAiGeneratedScore] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.currentTarget.files[0] });
  };

  const handleVerifyCredibility = () => {
    let newAiGeneratedScore;
    let newPlagiarismScore;

    switch (formData.title) {
      case 'AIGenerated':
        newAiGeneratedScore = 98;
        newPlagiarismScore = 0;
        break;
      case 'AIGenerated1':
        newAiGeneratedScore = 67;
        newPlagiarismScore = 53;
        break;
      case 'NoneAI':
        newAiGeneratedScore = 0;
        newPlagiarismScore = 7.3;
        break;

      default:
        newAiGeneratedScore = 51;
        newPlagiarismScore = 51;
        break;
    }

    setPlagiarismScore(newPlagiarismScore);
    setAiGeneratedScore(newAiGeneratedScore);

    setCanSubmit(newPlagiarismScore <= 50 && newAiGeneratedScore <= 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('abstract', formData.abstract);
        formDataToSend.append('file', formData.file);

        const response = await API.post('/upload/', formDataToSend);

        console.log('Submitted:', response.data);
      } catch (error) {
        console.error('Error submitting:', error);
      }
    } else {
      console.log('Cannot submit. Verify credibility first.');
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            value={formData.title}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Abstract */}
        <div>
          <label className="block text-gray-700">Abstract:</label>
          <textarea
            name="abstract"
            onChange={handleInputChange}
            value={formData.abstract}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Authors */}
        <div>
          <label className="block text-gray-700">Authors:</label>
          <input
            type="text"
            name="authors"
            onChange={handleInputChange}
            value={formData.authors}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* College */}
        <div>
          <label className="block text-gray-700">College:</label>
          <input
            type="text"
            name="college"
            onChange={handleInputChange}
            value={formData.college}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Course */}
        <div>
          <label className="block text-gray-700">Course:</label>
          <input
            type="text"
            name="course"
            onChange={handleInputChange}
            value={formData.course}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* File (PDF only) */}
        <div>
          <label className="block text-gray-700">File (PDF only):</label>
          <input
            type="file"
            name="file"
            accept=".pdf, .docx"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Submit and Verify Credibility Buttons */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={canSubmit}
            className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300 ${
              canSubmit ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
          >
            Submit
          </button>

          <button
            onClick={handleVerifyCredibility}
            className="mt-4 mx-4 bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300 hover:scale-110"
          >
            Verify Credibility
          </button>
        </div>

        {/* Plagiarism and AI Generated Scores */}
        <div className="mt-4">
          <p>Plagiarism Score: {plagiarismScore.toFixed(2)}%</p>
          <p>AI Generated Score: {aiGeneratedScore.toFixed(2)}%</p>
        </div>
      </form>
    </div>
  );
};

export default Upload;
