import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import icon from "../assets/icon.png";
import '../css/header.css';

const Header = ({ title }) => {
  return (
    <div className='header-container'>
      <header className='header-content'>
        <div className="header-pic">
          <img src={icon} className="header-logo"></img>
          <div></div>
          <h1 className='header-title'>
            {/* <FontAwesomeIcon icon={faNewspaper} className='header-icon' /> */}
            {/* {title} */}
          </h1>
        </div>
        <div className='header-search'>
          <Search />
        </div>
      </header>
    </div>
  );
};

export default Header;
