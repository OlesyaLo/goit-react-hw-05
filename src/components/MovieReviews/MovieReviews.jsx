import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiReviewsMovies } from '../../api-movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setLoading(true);
        const data = await apiReviewsMovies(movieId);
        setMovieReviews(data);
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
      {movieReviews && movieReviews.length > 0 ? (
        <ul className={css.list}>
          {movieReviews.map(user => (
            <li className={css.item} key={user.id}>
              <p className={css.username}>{user.author_details.username}:</p>
              <p>{user.content}</p>
              <hr className={css.hr} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.notFound}>
          No reviews available.
        </p>
      )}

      {error && <ErrorMessage />}
    </div>
  );
}