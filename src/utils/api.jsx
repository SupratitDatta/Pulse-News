import axios from 'axios';
import {API_KEY, BASE_URL} from "../constants/index"

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHeadlineByCountry = async () => {
  try {
    const response = await api.get(
      `${BASE_URL}top-headlines?country=in&apiKey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    throw error;
  }
};

export const fetchSearchDataApi = async (query) => {
  try {
    const response = await api.get(
      `${BASE_URL}everything?q=${query}&sortBy=popularity&apiKey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    throw error;
  }
};
