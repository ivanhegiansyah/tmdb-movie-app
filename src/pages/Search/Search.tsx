import Layout from '../../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchSearchMovies,
  selectSearchMovies,
  selectSearchMoviesError,
  selectSearchMoviesStatus,
} from '../../store/movie/movieSlice';
import { useEffect } from 'react';
import { MovieListResponse } from '../../types';
import MovieList from '../../components/MovieCard/MovieList';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const dispatch = useAppDispatch();
  const searchMovies = useAppSelector(selectSearchMovies);
  const statusSearchMovies = useAppSelector(selectSearchMoviesStatus);
  const errorSearchMovies = useAppSelector(selectSearchMoviesError);

  const [searchParams] = useSearchParams();

  const q = searchParams.get('q');

  useEffect(() => {
    if (q) {
      dispatch(fetchSearchMovies(q));
    }
  }, [dispatch, q]);

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="inline-block h-28 w-28 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  };

  const renderError = () => {
    return <p>{errorSearchMovies}</p>;
  };

  return (
    <Layout>
      {statusSearchMovies === 'loading' ? (
        renderLoading()
      ) : statusSearchMovies === 'failed' ? (
        renderError()
      ) : (
        <>
          <h2 className="font-bold text-4xl mb-8">{`Showing results for "${q}"`}</h2>
          {searchMovies?.results?.length === 0 ? (
            <p className="flex justify-center items-center mt-10 text-xl">
              We can't find anything.
            </p>
          ) : (
            <div className={'"mt-8 space-y-4'}>
              <MovieList
                movieList={(searchMovies as MovieListResponse)?.results}
              />
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Search;
