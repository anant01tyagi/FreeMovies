import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=dc2c822916e62dfb8dc295e9c828925a';

//get popular movies
export const getPopularMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/popular?${apiKey}`);
  return response.data.results;
};

//get upcoming movies
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/upcoming?${apiKey}`);
  return response.data.results;
};

//get popular tv
export const getPopularTv = async () => {
  const response = await axios.get(`${baseUrl}/tv/popular?${apiKey}`);
  return response.data.results;
};

//get family movies
export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${baseUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};

//get documentaries
export const getDocumentaries = async () => {
  const response = await axios.get(
    `${baseUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return response.data.results;
};

export const getMovie = async id => {
  const response = await axios.get(`${baseUrl}/movie/${id}?${apiKey}`);
  return response.data;
};

export const searchMovieTv = async (query, type) => {
  const response = await axios.get(
    `${baseUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return response.data.results;
};
