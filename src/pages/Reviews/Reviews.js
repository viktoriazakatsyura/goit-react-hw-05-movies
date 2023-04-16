import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovies } from 'services/getMovies';
import PropTypes from 'prop-types';
import s from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const requestPath = `/movie/${movieId}/reviews`;
    getMovies(requestPath).then(data => {
      setMovie(data);
    });
  }, [movieId]);

  return (
    <>
      <section className={s.section}>
        {movie.results && !movie.results.length && (
          <p>We don't have any reviews for this movie</p>
        )}
        <ul>
          {movie.results &&
            movie.results.map(el => {
              return (
                <>
                  <li key={el.id}>
                    <h3>{el.author}</h3>
                    <p className="content">{el.content}</p>
                    <p className="created">
                      Date: {el.created_at.slice(0, 10)}
                    </p>
                  </li>
                </>
              );
            })}
        </ul>
      </section>
    </>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.number,
};

export default Reviews;
