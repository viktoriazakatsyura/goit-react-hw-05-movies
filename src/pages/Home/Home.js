
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getMovies } from 'services/getMovies';
import s from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies('/trending/movie/day');
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className={s.section}>
      <h1>Trending today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
