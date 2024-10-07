import axios from "axios"; 

const url = "https://api.themoviedb.org/3";

const options = {
  params: {
    include_adult: false,
    language: "en-US",
    page: 1,
  },

  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTc5NzEzOTE5OGIwZjUxZWI1Nzg2MzY3ZjIzNTc4ZiIsIm5iZiI6MTcyODI1NTEzMC4zMjcxMTUsInN1YiI6IjY3MDMxMTg0NzgzMGMxMzAxZTdkNTkxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.djdp_SJxraxnPdz0EeziBbbxLrZrXP2FHDB2juNOhCc',
  },
};

export const apiTrendingMovies = async function () {
  const response = await axios.get(`${url}/trending/movie/week`, options);

  return response.data.results;
};

export const apiSearchMovies = async function (query, page) {
  const response = await axios.get(`${url}/search/movie`, {
    params: {
      query: query,
      page: page,
    },
    headers: options.headers,
  });

  return response.data.results;
};

export const apiDetailsMovies = async function (id) {
  const response = await axios.get(`${url}/movie/${id}`, options);

  return response.data;
};

export const apiCreditsMovies = async function (id) {
  const response = await axios.get(`${url}/movie/${id}/credits`, options);

  return response.data;
};

export const apiReviewsMovies = async function (id) {
  const response = await axios.get(`${url}/movie/${id}/reviews`, options);

  return response.data.results;
};