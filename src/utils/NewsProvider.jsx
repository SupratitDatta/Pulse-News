import axios from 'axios';
import { useState } from 'react';
import { NewsContext } from './NewsContext';
import {API_KEY, BASE_URL} from "../constants/index"

const NewsProvider = ({ children }) => {
  const [headlineByCategory, setHeadlineByCategory] = useState([]);
  const [businessState, setBusinessState] = useState([]);
  const [entertainmentState, setEntertainmentState] = useState([]);
  const [healthState, setHealthState] = useState([]);
  const [scienceState, setScienceState] = useState([]);
  const [sportsState, setSportsState] = useState([]);
  const [technologyState, setTechnologyState] = useState([]);
  const [trendingState, setTrendingState] = useState([]);
  const [searchState, setSearchState] = useState([]);
  const [queryState, setQueryState] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getHeadlineByCategory = (COUNTRY_CODE, CATEGORY) => {
    axios
      .get(`${BASE_URL}top-headlines?country=${COUNTRY_CODE}&category=${CATEGORY}&apiKey=${API_KEY}`)
      .then((response) => {
        setHeadlineByCategory(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NewsContext.Provider
      value={{
        headlineByCategory, getHeadlineByCategory,
        businessState, setBusinessState,
        entertainmentState, setEntertainmentState,
        healthState, setHealthState,
        scienceState, setScienceState,
        sportsState, setSportsState,
        technologyState, setTechnologyState,
        trendingState, setTrendingState,
        searchState, setSearchState,
        queryState, setQueryState,
        searchResult, setSearchResult,
        searchQuery, setSearchQuery,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
