// import React, { useEffect, useReducer } from 'react';
// import Loader from '../utils/Loader';
// import Card from '../components/Card';
// import { API_KEY, BASE_URL } from "../constants/index";
// import Topic from '../components/Topic';
// import '../css/news.css';

// const filterAndSliceArticles = (articles, maxArticles) =>
//   articles.filter(item => item.urlToImage !== null).slice(0, maxArticles);

// const timeElapsedSince = dateString => {
//   const now = new Date();
//   const date = new Date(dateString);
//   const diffMs = now.getTime() - date.getTime();
//   const diffSecs = Math.round(diffMs / 1000);
//   const diffMins = Math.round(diffSecs / 60);
//   const diffHours = Math.round(diffMins / 60);
//   const diffDays = Math.round(diffHours / 24);
//   const diffWeeks = Math.round(diffDays / 7);
//   const diffMonths = Math.round(diffDays / 30);
//   const diffYears = Math.round(diffDays / 365);

//   if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
//   if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
//   if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
//   if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
//   if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//   if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
//   return `${diffSecs} second${diffSecs > 1 ? 's' : ''} ago`;
// };

// const initialState = {
//   articles: [],
//   loading: true,
//   error: null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         articles: action.articles,
//         loading: false,
//         error: null,
//       };
//     case 'FETCH_ERROR':
//       return { ...state, loading: false, error: action.error };
//     default:
//       return state;
//   }
// };

// const News = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const fetchArticles = async () => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}top-headlines?country=in&apiKey=${API_KEY}`
//       );
//       const data = await response.json();
//       dispatch({ type: 'FETCH_SUCCESS', articles: data.articles });
//     } catch (error) {
//       dispatch({ type: 'FETCH_ERROR', error });
//     }
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const { articles, loading, error } = state;

//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <Topic title="Latest News" />
//       {loading ? (
//         <div className="loader-container">
//           <Loader />
//         </div>
//       ) : (
//         <div className='news-container'>
//           {filterAndSliceArticles(articles, 20).map((article, index) => (
//             <Card
//               key={index}
//               source={article.source.name}
//               url={article.url}
//               imageUrl={article.urlToImage}
//               title={article.title}
//               description={article.description}
//               lastUpdated={timeElapsedSince(article.publishedAt)}
//             />
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default News;

import React, { useContext, useEffect, useReducer } from 'react';
import Loader from '../utils/Loader';
import Card from './Card';
import { NewsContext } from '../utils/NewsContext';
import { API_KEY, BASE_URL } from "../constants/index"
import Topic from './Topic';
import '../css/news.css';

const filterAndSliceArticles = (articles, maxArticles) =>
  articles.filter(item => item.urlToImage !== null).slice(0, maxArticles);

const timeElapsedSince = dateString => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  return `${diffSecs} second${diffSecs > 1 ? 's' : ''} ago`;
};

const initialState = {
  articles: {
    business: [],
    entertainment: [],
    health: [],
    science: [],
    sports: [],
    technology: [],
    trending: [],
  },
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        articles: {
          ...state.articles,
          [action.category]: action.articles,
        },
        loading: false,
        error: null,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

const News = () => {
  const newsContext = useContext(NewsContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchArticles = async category => {
    try {
      const response = await fetch(
        `${BASE_URL}top-headlines?country=in&category=${category}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      const setter = newsContext[`set${category.charAt(0).toUpperCase() + category.slice(1)}State`];
      if (setter) {
        setter(data.articles);
        dispatch({ type: 'FETCH_SUCCESS', category, articles: data.articles });
      } 
      else {
        throw new Error(`Invalid category: ${category}`);
      }
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', error });
    }
  };

  useEffect(() => {
    const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology', 'trending'];
    categories.forEach(fetchArticles);
  }, []);

  const { articles, loading, error } = state;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className='news-container'>
          <div className="news-topic">
          <Topic title="Top Headlines" />
          </div>
          {Object.keys(articles).map(category =>
            filterAndSliceArticles(articles[category], 3).map((article, index) => (
              <Card
                key={index}
                source={article.source.name}
                url={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                description={article.description}
                lastUpdated={timeElapsedSince(article.publishedAt)}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default News;