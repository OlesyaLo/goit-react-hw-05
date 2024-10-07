import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiSearchMovies } from '../../api-movies';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const newQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!newQuery) return;

    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await apiSearchMovies(newQuery, page);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [newQuery, page]);

  const handleSubmit = event => {
    event.preventDefault();
    const inputQuery = event.target.elements.query.value.trim();

    setMovies([]);
    setPage(1);
    searchParams.set('query', inputQuery);
    setSearchParams(searchParams);
    event.target.reset();

    if (!inputQuery) {
      notify();
      return;
    }
  };

  const notify = () => {
    toast.error('Please enter a search query', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
  };

  return (
    <div className={css.container}>
      <h1>Search Movies</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input} type="text" name="query" autoFocus placeholder='Search for movie, tv show, person...'/>
        <button className={css.formBtn} type="submit">
          Search
        </button>
        <ToastContainer />
      </form>
      {loading && <Loader />}
      <MovieList movies={movies} />
      {movies.length === 0 && !loading && newQuery && !error && (
        <ErrorMessage />
      )}
      {error && <ErrorMessage />}
    </div>
  );
}