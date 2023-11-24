import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/API';

const Upload = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

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

  const [plagiarismScore, setPlagiarismScore] = useState(Math.random() * 100);
  const [aiGeneratedScore, setAiGeneratedScore] = useState(Math.random() * 100);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.currentTarget.files[0] });
  };

  const handleVerifyCredibility = () => {
    // Simulate random plagiarism and AI-generated scores
    const newPlagiarismScore = Math.random() * 100;
    const newAiGeneratedScore = Math.random() * 100;

    setPlagiarismScore(newPlagiarismScore);
    setAiGeneratedScore(newAiGeneratedScore);

    setCanSubmit(newPlagiarismScore <= 50 && newAiGeneratedScore <= 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      // Perform submission logic here
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('abstract', formData.abstract);
        // formDataToSend.append('authors', formData.authors);
        // formDataToSend.append('college', formData.college);
        // formDataToSend.append('course', formData.course);
        formDataToSend.append('file', formData.file);

        const response = await API.post('/upload/', formDataToSend);

        // Handle the response from the Django API
        console.log('Submitted:', response.data);
      } catch (error) {
        console.error('Error submitting:', error);
      }
    } else {
      console.log('Cannot submit. Verify credibility first.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleInputChange} value={formData.title} />
        </label>
        <br />

        <label>
          Abstract:
          <textarea name="abstract" onChange={handleInputChange} value={formData.abstract} />
        </label>
        <br />

        <label>
          Authors:
          <input type="text" name="authors" onChange={handleInputChange} value={formData.authors} />
        </label>
        <br />

        <label>
          College:
          <input type="text" name="college" onChange={handleInputChange} value={formData.college} />
        </label>
        <br />

        <label>
          Course:
          <input type="text" name="course" onChange={handleInputChange} value={formData.course} />
        </label>
        <br />

        <label>
          File (PDF only):
          <input type="file" name="file" accept=".pdf" onChange={handleFileChange} />
        </label>
        <br />

        <button type="submit" disabled={canSubmit}>
          Submit
        </button>
      </form>

      <button onClick={handleVerifyCredibility}>Verify Credibility</button>

      <div>
        Plagiarism Score: {plagiarismScore.toFixed(2)}%
        <br />
        AI Generated Score: {aiGeneratedScore.toFixed(2)}%
      </div>
    </>
    
  );
};

export default Upload;
