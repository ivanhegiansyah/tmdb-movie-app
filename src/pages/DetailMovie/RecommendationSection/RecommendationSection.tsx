import {
  selectMovieRecommendations,
  selectMovieRecommendationsError,
  selectMovieRecommendationsStatus,
} from '../../../store/movie/movieSlice';
import { useAppSelector } from '../../../store/hooks';
import MovieHorizontal from '../../../components/MovieCard/MovieHorizontal';
import { MovieListResponse } from '../../../types';

const RecommendationSection: React.FC = () => {
  const movieRecommendations = useAppSelector(selectMovieRecommendations);
  const statusRecommendations = useAppSelector(
    selectMovieRecommendationsStatus
  );
  const errorRecommendations = useAppSelector(selectMovieRecommendationsError);

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="inline-block h-28 w-28 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  };

  const renderError = () => {
    return <p>{errorRecommendations}</p>;
  };

  return (
    <>
      {statusRecommendations === 'loading' ? (
        renderLoading()
      ) : statusRecommendations === 'failed' ? (
        renderError()
      ) : (
        <>
          {movieRecommendations && movieRecommendations?.results?.length > 0 ? (
            <div className="px-8 lg:px-32 xl:px-48 my-8 space-y-4 ">
              <h4 className="font-bold text-2xl">Recomendations</h4>
              <div
                className={
                  'flex overflow-x-auto scrolling-touch items-start gap-x-4 p-4'
                }
              >
                <MovieHorizontal
                  movieHorizontal={
                    (movieRecommendations as MovieListResponse)?.results
                  }
                />
              </div>
            </div>
          ) : undefined}
        </>
      )}
    </>
  );
};

export default RecommendationSection;
