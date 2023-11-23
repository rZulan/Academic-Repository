import React from 'react';

const Document = () => {
  // Sample document data
  const documentData = {
    title: 'Sample Document',
    abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
    authors: ['Author 1', 'Author 2'],
    college: 'College of Sample',
    course: 'Sample Course',
    schoolYear: '2023',
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded">
      <h1 className="text-3xl font-semibold mb-4">{documentData.title}</h1>

      <p className="text-gray-600 mb-4">{documentData.abstract}</p>

      <div className="mb-4">
        <strong>Authors:</strong>
        <ul className="list-disc pl-4">
          {documentData.authors.map((author, index) => (
            <li key={index}>{author}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <strong>College:</strong> {documentData.college}
      </div>

      <div className="mb-4">
        <strong>Course:</strong> {documentData.course}
      </div>

      <div className="mb-4">
        <strong>School Year:</strong> {documentData.schoolYear}
      </div>
    </div>
  );
};

export default Document;
