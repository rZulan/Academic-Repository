import React, { useState } from 'react';
import axios from 'axios';

const Upload3 = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [convertedText, setConvertedText] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: '',
    department: '', // Updated to use a dropdown
    course: '',    // Updated to use a dropdown
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Your API endpoint for file upload (replace with your actual endpoint)
      const response = await axios.post('/upload/', formData);

      setConvertedText(response.data.ConvertedText);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAICheck = async (e) => {
    e.preventDefault();

    try {
      const aiFormData = new FormData();
      aiFormData.append('providers', 'sapling');
      aiFormData.append('text', convertedText);
      aiFormData.append('fallback_providers', '');

      // Your AI detection API endpoint (replace with your actual endpoint)
      const aiResponse = await axios.post(
        'https://api.edenai.run/v2/text/ai_detection',
        aiFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_AI_DETECTION_API_KEY',
          },
        }
      );

      console.log('AI Detection Score:', aiResponse.data);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const handlePlagiarismCheck = async (e) => {
    e.preventDefault();

    try {
      const aiFormData = new FormData();
      aiFormData.append('providers', 'winstonai');
      aiFormData.append('text', convertedText);
      aiFormData.append('title', formData.title);
      aiFormData.append('fallback_providers', 'originalityai');

      // Your plagiarism detection API endpoint (replace with your actual endpoint)
      const plagiaResponse = await axios.post(
        'https://api.edenai.run/v2/text/plagia_detection',
        aiFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_PLAGIARISM_DETECTION_API_KEY',
          },
        }
      );

      console.log('Plagiarism Detection Score:', plagiaResponse.data);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg w-[65%]">
            <h1 className="text-2xl mb-4">Step 1</h1>
            <form>
              <div className="mb-4">
                <label className="block text-gray-600">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-[#600414]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Abstract:</label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full h-24 focus:outline-none focus:border-[#600414]"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Authors:</label>
                <input
                  type="text"
                  name="authors"
                  value={formData.authors}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-[#600414]"
                />
              </div>
              <div className="mb-4">
              <label className="block text-gray-600">Department:</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-[#600414]"
              >
                <option value="">Select Department</option>
                <option value="College of Engineering and Architecture">
                  College of Engineering and Architecture
                </option>
                <option value="College of Business Studies">
                  College of Business Studies
                </option>
                <option value="College of Arts and Sciences">
                  College of Arts and Sciences
                </option>
                <option value="College of Hospitality Management">
                  College of Hospitality Management
                </option>
                <option value="College of Social Sciences and Philosophy">
                  College of Social Sciences and Philosophy
                </option>
                <option value="College of Education">
                  College of Education
                </option>
                <option value="College of Computing Studies">
                  College of Computing Studies
                </option>
                <option value="College of Industrial Technology">
                  College of Industrial Technology
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Course:</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-[#600414]"
              >
                <option value="">Select Course</option>
                {/* Options for College of Engineering and Architecture */}
                {formData.department === 'College of Engineering and Architecture' && (
                  <>
                    <option value="Bachelor of Science in Architecture">Bachelor of Science in Architecture</option>
                    <option value="Bachelor of Science in Civil Engineering">Bachelor of Science in Civil Engineering</option>
                    <option value="Bachelor of Science in Mechanical Engineering">Bachelor of Science in Mechanical Engineering</option>
                    <option value="Bachelor of Science in Electrical Engineering">Bachelor of Science in Electrical Engineering</option>
                    <option value="Bachelor of Science in Electronics Engineering">Bachelor of Science in Electronics Engineering</option>
                    <option value="Bachelor of Science in Industrial Engineering">Bachelor of Science in Industrial Engineering</option>
                    <option value="Bachelor of Science in Computer Engineering">Bachelor of Science in Computer Engineering</option>
                  </>
                )}
                {/* Options for College of Business Studies */}
                {formData.department === 'College of Business Studies' && (
                  <>
                    <option value="Bachelor of Science in Business Administration">Bachelor of Science in Business Administration</option>
                    <option value="Bachelor of Science in Entrepreneurship">Bachelor of Science in Entrepreneurship</option>
                    <option value="Bachelor of Science in Accountancy">Bachelor of Science in Accountancy</option>
                    <option value="Bachelor of Science in Accounting Information Systems">Bachelor of Science in Accounting Information Systems</option>
                    <option value="Bachelor in Public Administration">Bachelor in Public Administration</option>
                  </>
                )}
                {/* Options for College of Arts and Sciences */}
                {formData.department === 'College of Arts and Sciences' && (
                  <>
                    <option value="Bachelor of Science in Environmental Science">Bachelor of Science in Environmental Science</option>
                    <option value="Bachelor of Science in Biology">Bachelor of Science in Biology</option>
                  </>
                )}
                {/* Options for College of Hospitality Management */}
                {formData.department === 'College of Hospitality Management' && (
                  <>
                    <option value="Bachelor of Science in Hotel and Restaurant Management (4th year only)">
                      Bachelor of Science in Hotel and Restaurant Management (4th year only)
                    </option>
                    <option value="Bachelor of Science in Hospitality Management">Bachelor of Science in Hospitality Management</option>
                    <option value="Bachelor of Science in Tourism Management">Bachelor of Science in Tourism Management</option>
                  </>
                )}
                {/* Options for College of Social Sciences and Philosophy */}
                {formData.department === 'College of Social Sciences and Philosophy' && (
                  <>
                    <option value="Bachelor of Science in Social Work">Bachelor of Science in Social Work</option>
                    <option value="Bachelor of Science in Psychology">Bachelor of Science in Psychology</option>
                    <option value="Bachelor of Science in Sociology">Bachelor of Science in Sociology</option>
                  </>
                )}
                {/* Options for College of Education */}
                {formData.department === 'College of Education' && (
                  <>
                    <option value="Bachelor of Elementary Education">Bachelor of Elementary Education</option>
                    <option value="Bachelor of Secondary Education">Bachelor of Secondary Education</option>
                    <option value="Bachelor in Physical Education">Bachelor in Physical Education</option>
                    <option value="Bachelor in Technical and Livelihood Education">Bachelor in Technical and Livelihood Education</option>
                    <option value="Bachelor in Technical-Vocational Teacher Education">Bachelor in Technical-Vocational Teacher Education</option>
                  </>
                )}
                {/* Options for College of Computing Studies */}
                {formData.department === 'College of Computing Studies' && (
                  <>
                    <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
                    <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
                    <option value="Bachelor of Science in Information Systems">Bachelor of Science in Information Systems</option>
                    <option value="Associate in Computer Technology">Associate in Computer Technology</option>
                  </>
                )}
                {/* Options for College of Industrial Technology */}
                {formData.department === 'College of Industrial Technology' && (
                  <>
                    <option value="Bachelor of Science in Industrial Technology (Ladderized)">Bachelor of Science in Industrial Technology (Ladderized)</option>
                  </>
                )}
              </select>
            </div>
          </form>
          <input type="file" id="fileinput" onChange={handleFileChange} />
          <button
            onClick={handleFileUpload}
            className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300 mt-4"
          >
            Upload
          </button>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleNextStep}
              className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300"
            >
              Next
            </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg w-[65%]">
            <h1 className="text-2xl mb-4">Step 2</h1>
            <button
              onClick={handleAICheck}
              className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300"
            >
              AI Check
            </button>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousStep}
                className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg w-[65%]">
            <h1 className="text-2xl mb-4">Step 3</h1>
            <button
              onClick={handlePlagiarismCheck}
              className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300"
            >
              Plagiarism Check
            </button>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousStep}
                className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg w-[65%]">
            <h1 className="text-2xl mb-4">Summary</h1>
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePreviousStep}
                className="bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300"
              >
                Previous
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderStepContent()}</div>;
};

export default Upload3;
