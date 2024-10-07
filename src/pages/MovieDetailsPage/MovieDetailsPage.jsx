import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import { apiDetailsMovies } from '../../api-movies';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import clsx from 'clsx';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backURL = useRef(location.state ?? '/movies'); 

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setLoading(true);
        const data = await apiDetailsMovies(movieId);
        setMovieDetails(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMoviesById();
  }, [movieId]);

  return (
    <div className={css.container}>
        {
          <div>
            <Link to={backURL.current} className={css.backLink}>
              Go back
            </Link>
          </div>
        }
        {movieDetails && (
          <div className={css.wrapper}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.overview}
              />
            </div>
            <div>
              <h1 className={css.title}>{movieDetails.title}</h1>
              <h2 className={css.genres}>
                Genres:{' '} </h2>
                <p className={css.text}>
                {movieDetails.genres.map(genre => (
                  <span key={genre.id}>{genre.name}. </span>
                ))}
                </p>
              
              <h2 className={css.overview}>Overview: </h2>
              <p className={css.text}>{movieDetails.overview}</p>
              <h2 className={css.rating}>Rating: </h2> 
              <p className={css.text}>{movieDetails.vote_average}</p>
            </div>
          </div>
        )}
        {loading && <Loader />}
        {error && <ErrorMessage />}
       
        <div className={clsx(error ? css.none : css.ok)}>
          <h2 className={css.addTitel}>Additional information</h2>
          <ul className={css.listAddInfo}>
            <li>
              <Link to="cast">
                Movie Cast
              </Link>
            </li>
            <li>
              <Link to="reviews">
                Movie Reviews
              </Link>
            </li>
          </ul>
        </div>

        <Suspense fallback={<b>Loading...</b>}>
          <Outlet />
        </Suspense>
    </div>
  );
}