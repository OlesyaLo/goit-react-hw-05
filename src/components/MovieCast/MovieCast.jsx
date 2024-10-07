import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiCreditsMovies } from '../../api-movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setLoading(true);
        const data = await apiCreditsMovies(movieId);
        setMovieCast(data.cast);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMoviesById();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movieCast.length > 0 && (
        <ul className={css.list}>
          {movieCast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                title={actor.name}
              />
              <p>{actor.original_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}