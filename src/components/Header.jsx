import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import '../css/header.css';

const Header = ({ title }) => {
  return (
    <div className='header-container'>
      <header className='header-content'>
        <h1 className='header-title'>
          <FontAwesomeIcon icon={faNewspaper} className='header-icon' />
          {title}
        </h1>
        <div className='header-search'>
          <Search />
        </div>
      </header>
    </div>
  );
};

export default Header;
