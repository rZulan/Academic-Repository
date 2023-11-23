import { useState } from "react";

const Library = () => {
  const [searchFormData, setSearchFormData] = useState({
    search: "",
    schoolYear: "",
    department: "",
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFormData({ ...searchFormData, [name]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Form Data:", searchFormData);
    // Perform search logic here with the filters
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <section className="w-3/4 p-8">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <label htmlFor="search" className="block text-gray-700 text-sm font-bold mb-2">
            Search:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="search"
              name="search"
              value={searchFormData.search}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md">
              Search
            </button>
          </div>
        </form>

        {/* Document Cards */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-2">Title of the Book</h1>
            <p className="text-gray-700">
              Abstract of the book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
            </p>
          </div>
        </div>
        <div className="mb-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-2">Title of the Book</h1>
            <p className="text-gray-700">
              Abstract of the book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
            </p>
          </div>
        </div>

        {/* Repeat the card structure for other documents */}
      </section>

      {/* Sidebar */}
      <section className="w-1/4 bg-gray-100 p-8">
        <label htmlFor="schoolYear" className="block text-gray-700 text-sm font-bold mb-2">
          School Year:
        </label>
        <select
          id="schoolYear"
          name="schoolYear"
          value={searchFormData.schoolYear}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>

        <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
          Department:
        </label>
        <select
          id="department"
          name="department"
          value={searchFormData.department}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="CCS">CCS</option>
          <option value="CEA">CEA</option>
          <option value="CE">CE</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </section>
    </div>
  );
};

export default Library;
