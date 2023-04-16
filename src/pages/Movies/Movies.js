import { useState, useEffect } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { getMovies } from 'services/getMovies';
import s from './Movies.module.css';

const Movies = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [wordSearch, setWordSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');

  useEffect(() => {
    const requestPath = `/search/movie`;

    getMovies(requestPath, searchParams.get('query')).then((data) => {
      setMovies(data);
    });
  }, [searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ query: wordSearch.trim() });
    setWordSearch('');
  };

  return (
    <section className={s.section}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={wordSearch}
          onChange={(event) => setWordSearch(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {movies.results && movies.results.length !== 0 && (
        <h1>Search results:</h1>
      )}
      {movies.results && movies.results.length === 0 && searchParams.get('query') && (
        <h1>There are no results</h1>
      )}
      <ul>
        {movies.results &&
          movies.results.map((movie) => (
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

export default Movies;
