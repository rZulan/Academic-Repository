import { useState } from 'react';
import API from '../utils/API';
import axios from 'axios';

const Upload3 = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [convertedText, setConvertedText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async(e) => {
    e.preventDefault()

    try {
      const formData = new FormData();
      formData.append('file', fileinput.files[0]);

      const response = await API.post('/cleanup/',
        formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
        }
      },
      )

      setConvertedText(response.data.ConvertedText)
      console.log(convertedText)
    } catch(e) {
      console.log(e)
    }
  };

  const handleAICheck = async(e) => {
    e.preventDefault()

    try {
      const aiFormData = new FormData();
      aiFormData.append('providers', 'sapling');
      aiFormData.append('text', convertedText);
      aiFormData.append('fallback_providers', '');
  
      const aiResponse = await axios.post(
        'https://api.edenai.run/v2/text/ai_detection',
        aiFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWYwYzNjN2QtODE3Ny00YWE3LTlmNTctZmM5ZGNjYWQ0ZDkzIiwidHlwZSI6InNhbmRib3hfYXBpX3Rva2VuIn0.ahBLyQ6HJYbtRYQpo-Y09wtT60kWHqLNgnQyYh1DlZk',
          },
        }
      );
  
      console.log('AI Detection Score:', aiResponse.data);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const handlePlagiarismCheck = async(e) => {
    e.preventDefault()

    try {
      const aiFormData = new FormData();
      aiFormData.append('providers', 'winstonai');
      aiFormData.append('text', convertedText);
      aiFormData.append('title', 'test');
      aiFormData.append('fallback_providers', 'originalityai');
  
      const plagiaResponse = await axios.post(
        'https://api.edenai.run/v2/text/plagia_detection',
        aiFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmJhZWQyMGItYjZiMy00YmFmLWFlYWItMjZhNDk3ZTFlYWE3IiwidHlwZSI6InNhbmRib3hfYXBpX3Rva2VuIn0.65eR0XPWFINLsbxTXFPupTWk7C61l_E0FcZlyi28ZQE',
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1>Step 1</h1>
            <input type="file" id="fileinput" onChange={handleFileChange} />
            <button
              onClick={handleFileUpload}
              className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}
            >
              Upload
            </button>
            <button onClick={handleNextStep} className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}>Next</button>
          </>
          
        );
      case 2:
        return (
          <>
            <h1>Step 2</h1>

            <button
              onClick={handleAICheck}
              className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}
            >
              AI Check
            </button>
            
            <button onClick={handlePreviousStep} className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}>Previous</button>
            <button onClick={handleNextStep} className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}>Next</button>
          </>
        );
      case 3:
        return (
          <>
            <h1>Step 3</h1>

            <button
              onClick={handlePlagiarismCheck}
              className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}
            >
              Plagiarism Check
            </button>
            
            <button onClick={handlePreviousStep} className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}>Previous</button>
            <button onClick={handleNextStep} className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}>Next</button>

          </>
        );
      case 4:
        return (
          <>
            <h1>Summary</h1>
            <button onClick={handlePreviousStep} className={`bg-[#600414] text-white rounded-md px-4 py-2 transition duration-300`}>Previous</button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderStepContent()}
    </div>
  );
};

export default Upload3;
