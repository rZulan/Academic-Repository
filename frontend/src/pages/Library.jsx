import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import API from "../utils/API";

const Library = () => {
  const [loading, setLoading] = useState(true);
  const [documentType, setDocumentType] = useState({
    all: true,
    thesis: false,
    capstone: false,
    dissertation: false,
  });
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState(null);
  const [allDocuments, setAllDocuments] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  const getDocuments = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/library/`);
      const fetchedDocuments = response.data;
      setDocuments(fetchedDocuments);
      setAllDocuments(fetchedDocuments);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentTypeChange = (event) => {
    const { name, checked } = event.target;

    if (name === "all" && checked) {
      const updatedDocumentType = Object.keys(documentType).reduce((acc, type) => {
        acc[type] = true;
        return acc;
      }, {});
      setDocumentType(updatedDocumentType);
    } else {
      setDocumentType((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleFilterClick = () => {
    let filteredDocuments = [...allDocuments];

    const selectedTypes = Object.keys(documentType).filter(type => documentType[type]);
    if (selectedTypes.length !== Object.keys(documentType).length) {
      filteredDocuments = filteredDocuments.filter(document => selectedTypes.includes(document.type));
    }

    if (year !== "") {
      filteredDocuments = filteredDocuments.filter(document => document.year.toString() === year);
    }

    if (course !== "") {
      filteredDocuments = filteredDocuments.filter(document => document.course === course);
    }

    setDocuments(filteredDocuments);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const searchResults = allDocuments.filter(document =>
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.abstract.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDocuments(searchResults);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDocuments();
    };

    fetchData();
  }, []);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents && documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="main-body bg-[#F6F6F6] p-7 h-auto mt-0">
      <div className="flex flex-wrap mx-4">
        <div className="w-full lg:w-[15%] md:w-[25%] p-10 rounded-md shadow-lg bg-white h-auto ml-10 m-3">
          <h2 className="text-2xl font-bold mb-6">Filter</h2>
          <div className="mb-4">
            <h3 className="font-semibold">Document Type:</h3>
            {Object.keys(documentType).map(type => (
              <label key={type} className="block">
                <input
                  type="checkbox"
                  name={type}
                  checked={documentType[type]}
                  onChange={handleDocumentTypeChange}
                  className="mr-2"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Year:</h3>
            <select
              value={year}
              onChange={handleYearChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Year</option>
              {[2023, 2022, 2021, 2020].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Department:</h3>
            <select
              value={department}
              onChange={handleDepartmentChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Department</option>
              {["Business Studies", "Computing Studies"].map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Course:</h3>
            <select
              value={course}
              onChange={handleCourseChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Course</option>
              {["Computer Science", "Information Technology", "Business Administration"].map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleFilterClick}
            className="w-full bg-[#600414] text-white py-3 px-6 rounded hover:bg-[#40030d] transition duration-300"
          >
            Filter
          </button>
        </div>

        <div className="w-full md:w-3/4 p-4 ml-10">
          <div className="flex">
            <input
              type="text"
              placeholder="Search Document"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#600414] transition duration-300 shadow-lg"
            />
            <button
              onClick={handleSearchClick}
              className="bg-[#600414] text-white py-3 px-6 ml-2 rounded hover:bg-[#40030d] transition duration-300"
            >
              Search
            </button>
          </div>
          <div className="border-t-2 border-gray-300 my-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="loader ease-linear rounded-full border-t-4 border-t-[#40030d] h-12 w-12 mb-2 animate-spin"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : (
              currentDocuments && currentDocuments.map((document, index) => (
                <Link to={`/document/${document.id}`} key={index}>
                  <div className="mt-6 bg-white p-4 rounded-lg shadow-md hover:scale-105 transition ease-in-out duration-300" key={index}>
                    <h3 className="text-xl font-semibold mb-2">{document.title}</h3>
                    <p className="text-gray-700">
                      <strong>Abstract:</strong> {document.abstract}
                    </p>
                    <div className="border-t-2 border-gray-300 my-4"></div>
                    <p className="text-gray-700">
                      <strong>Author: </strong>{document.author}
                      <strong> Year: </strong>{document.school_year}
                      <strong> Department: </strong>{document.department}
                      <strong> Course: </strong>{document.course}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <ul className="flex space-x-2">
              <li>
                <button
                  className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: Math.ceil((documents && documents.length) / documentsPerPage) }, (_, i) => (
                <li key={i}>
                  <button
                    className={`bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d] ${currentPage === i + 1 ? 'bg-opacity-60' : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil((documents && documents.length) / documentsPerPage)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
