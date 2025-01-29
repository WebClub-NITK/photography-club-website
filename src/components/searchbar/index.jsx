import React, { useState, useEffect, useContext } from 'react';
import { Search, X } from 'lucide-react';
import { TabContext } from '../../context/TabContext';

const SearchBar = ({ placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchQuery, setSearchQuery } = useContext(TabContext);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, setSearchQuery]);

  const clearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  return (
    <div className="flex justify-center items-center w-full p-6">
      <form 
        onSubmit={(e) => e.preventDefault()} // Prevents default form submission
        className="w-full max-w-2xl"
      >
        <div className="relative flex items-center">
          <Search 
            className="absolute left-4 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full py-3 pl-12 pr-12 text-base border-2 rounded-full 
                     shadow-sm focus:outline-none focus:border-blue-500 
                     focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                     hover:border-gray-300 transition-colors duration-200 border-gray-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 text-gray-400 hover:text-gray-600 
                       transition-colors duration-200"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
