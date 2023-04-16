import styled from 'styled-components';
import { lazy, Suspense } from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Movies from 'pages/Movies/Movies';
import s from './App.module.css';


const StyledLink = styled(NavLink)`
  color: grey;
  text-decoration: none;
  font-weight: 700;
  &.active {
    color: #32CD32;
  }
`;

const SharedLayout = () => {
  return (
    <>
      <header></header>
      <Suspense fallback={<h1>Loading...</h1>}>
        <main>
          <Outlet />
        </main>
      </Suspense>
      <footer></footer>
    </>
  );
};


export const App = () => {
  const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
  const Reviews = lazy(() => import('pages/Reviews/Reviews'));
  const Cast = lazy(() => import('pages/Cast/Cast'));

  return (
    <div
      style={{
        color: '#010101',
      }}
    >
      <nav className={s.navigate}>
        <StyledLink to="/" end>
          Home
        </StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>

      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
    
            <Route
              path="cast"
              element={
                <Suspense fallback={<h3>Loading...</h3>}>
                  <Cast />
                </Suspense>
              }
            />
            <Route
              path="reviews"
              element={
                <Suspense fallback={<h3>Loading...</h3>}>
                  <Reviews />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route path="/goit-react-hw-05-movies" element={<Home />} />

        <Route path="*" element={<h1>Wrong path</h1>} />
      </Routes>
    </div>
  );
};
