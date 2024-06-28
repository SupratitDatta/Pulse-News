import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSearchDataApi } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../css/search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetchSearchDataApi(searchQuery);
      const category = {
        title: `Search Results found for "${searchQuery}"`,
        data: response?.articles,
      };
      navigate('/detail/search', { state: { category } });
      setSearchQuery('');
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSideNavOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <>
      <div className="search-bar-container">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="search-bar-button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="search-icon-container" onClick={toggleSideNav}>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <div className={`side-nav ${isSideNavOpen ? 'open' : ''}`}>
        <input
          className="side-nav-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="side-nav-button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div
        className={`overlay ${isSideNavOpen ? 'open' : ''}`}
        onClick={toggleSideNav}
      ></div>
    </>
  );
};

export default Search;