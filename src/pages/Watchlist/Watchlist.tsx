import Layout from '../../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchWatchlistMovies,
  resetStatusAddWatchlistMovie,
  selectAddWatchlistMoviesStatus,
  selectWatchlistMovies,
  selectWatchlistMoviesError,
  selectWatchlistMoviesStatus,
} from '../../store/movie/movieSlice';
import { useEffect } from 'react';
import { MovieListResponse } from '../../types';
import MovieList from '../../components/MovieCard/MovieList';
import { useLocation, useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const dispatch = useAppDispatch();
  const watchlistMovies = useAppSelector(selectWatchlistMovies);
  const statusWatchlistMovies = useAppSelector(selectWatchlistMoviesStatus);
  const errorWatchlistMovies = useAppSelector(selectWatchlistMoviesError);
  const statusAddWatchlistMovie = useAppSelector(
    selectAddWatchlistMoviesStatus
  );
  const navigate = useNavigate();
  const location = useLocation();
  const accountId = localStorage.getItem('account_id') || '';
  const accessToken = localStorage.getItem('access_token') || '';

  useEffect(() => {
    if (accessToken && accountId) {
      dispatch(fetchWatchlistMovies(accountId));
    } else {
      navigate('/');
    }
  }, [dispatch, accountId, accessToken, navigate]);

  useEffect(() => {
    if (statusAddWatchlistMovie === 'succeeded') {
      dispatch(fetchWatchlistMovies(accountId));
      dispatch(resetStatusAddWatchlistMovie());
    }
  }, [statusAddWatchlistMovie, accountId, dispatch]);

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="inline-block h-28 w-28 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  };

  const renderError = () => {
    return <p>{errorWatchlistMovies}</p>;
  };

  return (
    <Layout>
      {statusWatchlistMovies === 'loading' ? (
        renderLoading()
      ) : statusWatchlistMovies === 'failed' ? (
        renderError()
      ) : (
        <>
          <h2 className="font-bold text-4xl">Your Watchlist</h2>
          {watchlistMovies?.results?.length === 0 ? (
            <p className="flex justify-center items-center mt-10 text-xl">
              You don't have any watchlist.
            </p>
          ) : (
            <div className={'mt-8 mb-8'}>
              <MovieList
                movieList={(watchlistMovies as MovieListResponse)?.results}
                urlPath={location.pathname}
              />
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Watchlist;
