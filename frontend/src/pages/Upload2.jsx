import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';
import API from '../utils/API';
import axios from 'axios';

const Upload2 = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.currentTarget.files[0] });
  };

  const handleVerifyCredibility = async (e) => {
    e.preventDefault();
  
    try {
      const aiFormData = new FormData();
      aiFormData.append('providers', 'sapling');
      aiFormData.append('text', 'In a rapidly evolving world of technology, the opportunities seem boundless. Artificial Intelligence, with its capacity to learn and adjust, is transforming industries and redefining the limits of what was once deemed conceivable. From self-driving cars navigating bustling streets to virtual assistants comprehending and responding to human queries, the influence of AI is undeniable. As we peer into the future, the incorporation of AI into various facets of our lives holds the potential for heightened efficiency, innovation, and convenience. However, it also prompts crucial inquiries about morality, confidentiality, and the potential societal consequences of widespread AI acceptance. Achieving a balance between leveraging the capabilities of AI for positive change and addressing its obstacles will be essential in shaping a future where humans and intelligent machines coexist harmoniously."');
      aiFormData.append('fallback_providers', '');
  
      const aiResponse = await axios.post(
        'https://api.edenai.run/v2/text/ai_detection',
        aiFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWYwYzNjN2QtODE3Ny00YWE3LTlmNTctZmM5ZGNjYWQ0ZDkzIiwidHlwZSI6ImFwaV90b2tlbiJ9.vQRpYvpAxrrfZvHOI4gicG8pN2O1X0pptOL51JcBRF0',
          },
        }
      );
  
      console.log('AI Detection Score:', aiResponse.data);
  
      const plagiarismFormData = new FormData();
      plagiarismFormData.append('providers', 'winstonai');
      plagiarismFormData.append('text', 'In a rapidly evolving world of technology, the opportunities seem boundless. Artificial Intelligence, with its capacity to learn and adjust, is transforming industries and redefining the limits of what was once deemed conceivable. From self-driving cars navigating bustling streets to virtual assistants comprehending and responding to human queries, the influence of AI is undeniable. As we peer into the future, the incorporation of AI into various facets of our lives holds the potential for heightened efficiency, innovation, and convenience. However, it also prompts crucial inquiries about morality, confidentiality, and the potential societal consequences of widespread AI acceptance. Achieving a balance between leveraging the capabilities of AI for positive change and addressing its obstacles will be essential in shaping a future where humans and intelligent machines coexist harmoniously."');
      plagiarismFormData.append('title', 'test');
      plagiarismFormData.append('fallback_providers', '');
  
      const plagiarismResponse = await axios.post(
        'https://api.edenai.run/v2/text/plagia_detection',
        plagiarismFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWYwYzNjN2QtODE3Ny00YWE3LTlmNTctZmM5ZGNjYWQ0ZDkzIiwidHlwZSI6ImFwaV90b2tlbiJ9.vQRpYvpAxrrfZvHOI4gicG8pN2O1X0pptOL51JcBRF0',
          },
        }
      );
  
      console.log('Plagiarism Detection Score:', plagiarismResponse.data);
  
      // Handle the results as needed
      // setPlagiarismScore(newPlagiarismScore);
      // setAiGeneratedScore(newAiGeneratedScore);
      // setCanSubmit(newPlagiarismScore <= 50 && newAiGeneratedScore <= 50);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.file);

      const response = await API.post('/upload2/', formDataToSend);

      console.log('File uploaded:', response.data);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleFileUpload}></form>
      
      <div>
          <label className="block text-gray-700">File:</label>
          <input
            type="file"
            name="file"
            accept=".pdf, .docx"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      
      <form onSubmit={handleVerifyCredibility}>
        <button type="submit" className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}>
            Verify Credibilitys
        </button>
      </form>
    </div>
  );
};

export default Upload2;
