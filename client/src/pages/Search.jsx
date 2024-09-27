

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="border-b-2 p-7 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          {/* Search Term Input */}
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Type Selection */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
           
          </div>

          {/* Amenities Selection */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>

          {/* Sort Selection */}
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select id="sort_order" className="p-3 border rounded-lg">
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      {/* Listings Section */}
      <div className="flex-1">
        <h1 className="p-3 mt-5 text-3xl font-semibold border-b text-slate-700">
          Listing results:
        </h1>
        <div className="flex flex-wrap gap-4 p-7">
          {/* Placeholder for "No listing found!" */}
          <p className="text-xl text-slate-700">No listing found!</p>

          {/* Placeholder for Loading message */}
          <p className="w-full text-xl text-center text-slate-700">
            Loading...
          </p>

          {/* Placeholder for Listing Items */}
          <div className="w-full p-5 border rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Listing Item Placeholder</h2>
            <p className="text-slate-600">Description of the listing...</p>
          </div>

          {/* Show More Button */}
          <button className="w-full text-center text-green-700 hover:underline p-7">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
