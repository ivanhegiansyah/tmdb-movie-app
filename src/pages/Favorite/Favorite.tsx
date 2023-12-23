import Layout from '../../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchFavoriteMovies,
  resetStatusAddFavoriteMovies,
  selectAddFavoriteMoviesStatus,
  selectFavoriteMovies,
  selectFavoriteMoviesError,
  selectFavoriteMoviesStatus,
} from '../../store/movie/movieSlice';
import { useEffect } from 'react';
import { MovieListResponse } from '../../types';
import MovieList from '../../components/MovieCard/MovieList';
import { useLocation, useNavigate } from 'react-router-dom';

const Favorite = () => {
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const statusFavoriteMovies = useAppSelector(selectFavoriteMoviesStatus);
  const errorFavoriteMovies = useAppSelector(selectFavoriteMoviesError);
  const statusAddFavoriteMovies = useAppSelector(selectAddFavoriteMoviesStatus);
  const navigate = useNavigate();
  const location = useLocation();
  const accountId = localStorage.getItem('account_id') || '';
  const accessToken = localStorage.getItem('access_token') || '';

  useEffect(() => {
    if (accessToken && accountId) {
      dispatch(fetchFavoriteMovies(accountId));
    } else {
      navigate('/');
    }
  }, [dispatch, accountId, accessToken, navigate]);

  useEffect(() => {
    if (statusAddFavoriteMovies === 'succeeded') {
      dispatch(fetchFavoriteMovies(accountId));
      dispatch(resetStatusAddFavoriteMovies());
    }
  }, [statusAddFavoriteMovies, accountId, dispatch]);

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="inline-block h-28 w-28 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  };

  const renderError = () => {
    return <p>{errorFavoriteMovies}</p>;
  };

  return (
    <Layout>
      {statusFavoriteMovies === 'loading' ? (
        renderLoading()
      ) : statusFavoriteMovies === 'failed' ? (
        renderError()
      ) : (
        <>
          <h2 className="font-bold text-4xl">Your Favorite Movies</h2>
          {favoriteMovies?.results?.length === 0 ? (
            <p className="flex justify-center items-center mt-10 text-xl">
              You don't have any favorite movies.
            </p>
          ) : (
            <div className={'mt-8 mb-8'}>
              <MovieList
                movieList={(favoriteMovies as MovieListResponse)?.results}
                urlPath={location.pathname}
              />
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Favorite;
