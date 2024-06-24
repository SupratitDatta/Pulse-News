import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faFutbol, faFlask, faBriefcase, faMicrochip, faFilm, faFire, faHome,} from '@fortawesome/free-solid-svg-icons';
import { NewsContext } from '../utils/NewsContext';
import '../css/category.css';

const categories = [
  { categoryName: 'health', icon: faHeartbeat },
  { categoryName: 'sports', icon: faFutbol },
  { categoryName: 'science', icon: faFlask },
  { categoryName: 'business', icon: faBriefcase },
  { categoryName: 'technology', icon: faMicrochip },
  { categoryName: 'entertainment', icon: faFilm },
  // { categoryName: 'trending', icon: faFire },
];

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    businessState,
    entertainmentState,
    healthState,
    scienceState,
    sportsState,
    technologyState,
    trendingState,
  } = useContext(NewsContext);

  const categoryDetailPage = (categoryName, data) => {
    const category = { title: categoryName, data: data };
    navigate(`/detail/${categoryName}`, { state: { category } });
  };

  const handleCategory = (categoryName) => {
    switch (categoryName) {
      case 'health':
        categoryDetailPage(categoryName, healthState);
        break;
      case 'business':
        categoryDetailPage(categoryName, businessState);
        break;
      case 'entertainment':
        categoryDetailPage(categoryName, entertainmentState);
        break;
      case 'science':
        categoryDetailPage(categoryName, scienceState);
        break;
      case 'sports':
        categoryDetailPage(categoryName, sportsState);
        break;
      case 'technology':
        categoryDetailPage(categoryName, technologyState);
        break;
      case 'trending':
        categoryDetailPage(categoryName, trendingState);
        break;
      case 'home':
        navigate('/');
        break;
      default:
        console.error(`Invalid category: ${categoryName}`);
        navigate('/');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`category-wrapper ${isOpen ? 'open' : ''}`}>
        <button
          className={`category-button ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => handleCategory('home')}
        >
          <FontAwesomeIcon icon={faHome} className="category-icon" />
          HOME
        </button>
        {categories.map(({ categoryName, icon }) => (
          <button
            key={categoryName}
            className={`category-button ${location.pathname.includes(categoryName) ? 'active' : ''}`}
            onClick={() => handleCategory(categoryName)}
          >
            <FontAwesomeIcon icon={icon} className="category-icon" />
            {categoryName.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
};

export default Category;