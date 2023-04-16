import { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate, useLocation, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMovies } from 'services/getMovies';
import s from './MovieDetails.module.css';

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const servPath = 'https://www.themoviedb.org/t/p/w220_and_h330_face';

  useEffect(() => {
    const requestPath = `/movie/${movieId}`;
    getMovies(requestPath).then(data => {
      setMovie(data);
    });
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state ?? '/');
  };

  return (
    <>
      <section className={s.section}>
        <button className={s.buttonBack} onClick={handleGoBack}>
          Go back
        </button>
        <div className={s.infoWrapper}>
          <div className={s.imageWrap}>
            {movie.poster_path && (
              <img
                className={s.image}
                src={`${servPath}${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
          <div className={s.infoMovie}>
            <h1>{movie.title}</h1>
            {movie.vote_average !== 0 && (
              <p>User score: {Math.floor(10 * movie.vote_average)}%</p>
            )}
            <h2>Overview:</h2>
            <p>{movie.overview}</p>
            <h3>Genres:</h3>
            <ul className={s.genresList}>
              {movie.genres &&
                movie.genres.map(genre => (
                  <li className={s.genresItem} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={s.section}>
      
        <p>Addition information</p>
        <ul>
          <li>
            <NavLink to="cast" state={location.state}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </section>
    </>
  );
}

MovieDetails.propTypes = {
  movieId: PropTypes.number,
};

export default MovieDetails;
