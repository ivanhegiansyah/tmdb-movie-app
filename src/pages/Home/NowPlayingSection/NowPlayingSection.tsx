import MovieHorizontal from '../../../components/MovieCard/MovieHorizontal';
import { useAppSelector } from '../../../store/hooks';
import {
  selectNowPlayingError,
  selectNowPlayingStatus,
  selectNowPlaying,
} from '../../../store/movie/movieSlice';
import { MovieListResponse } from '../../../types';

const NowPlayingSection: React.FC = () => {
  const nowPlayingMovies = useAppSelector(selectNowPlaying);
  const statusNowPlaying = useAppSelector(selectNowPlayingStatus);
  const errorNowPlaying = useAppSelector(selectNowPlayingError);

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center mt-8 mb-64">
        <div className="inline-block h-28 w-28 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  };
  
  const renderError = () => {
    return <p>{errorNowPlaying}</p>;
  };

  return (
    <>
      {statusNowPlaying === 'loading' ? (
        renderLoading()
      ) : statusNowPlaying === 'failed' ? (
        renderError()
      ) : (
        <div className="space-y-4">
          <h2 className="font-bold text-4xl">Now Playing</h2>
          <MovieHorizontal
            movieHorizontal={(nowPlayingMovies as MovieListResponse)?.results}
          />
        </div>
      )}
    </>
  );
};

export default NowPlayingSection;
