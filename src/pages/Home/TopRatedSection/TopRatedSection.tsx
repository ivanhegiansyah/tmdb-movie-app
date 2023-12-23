import MovieList from '../../../components/MovieCard/MovieList';
import { useAppSelector } from '../../../store/hooks';
import {
  selectTopRatedError,
  selectTopRatedStatus,
  selectTopRated,
} from '../../../store/movie/movieSlice';
import { MovieListResponse } from '../../../types';

const TopRatedSection: React.FC = () => {
  const topRatedMovies = useAppSelector(selectTopRated);
  const statusTopRated = useAppSelector(selectTopRatedStatus);
  const errorTopRated = useAppSelector(selectTopRatedError);

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="inline-block h-28 w-28 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  };

  const renderError = () => {
    return <p>{errorTopRated}</p>;
  };

  return (
    <>
      {statusTopRated === 'loading' ? (
        renderLoading()
      ) : statusTopRated === 'failed' ? (
        renderError()
      ) : (
        <div className="mt-8 space-y-4">
          <h2 className="font-bold text-4xl">Top Rated</h2>
          <MovieList
            movieList={(topRatedMovies as MovieListResponse)?.results}
          />
        </div>
      )}
    </>
  );
};

export default TopRatedSection;
