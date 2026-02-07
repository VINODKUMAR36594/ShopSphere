import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChanges = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-6 flex items-center justify-end space-x-3">
      <label
        htmlFor="sort"
        className="text-gray-700 text-sm font-medium"
      >
        Sort by:
      </label>
      <select
        id="sort"
        onChange={handleSortChanges}
        value={searchParams.get("sortBy") || ""}
        className="border border-gray-300 p-2 rounded-lg shadow-sm bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   hover:border-blue-400 transition duration-200"
      >
        <option value="">Default</option>
        <option value="priceAsc">💰 Price: Low to High</option>
        <option value="priceDesc">💸 Price: High to Low</option>
        <option value="popularity">🔥 Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;