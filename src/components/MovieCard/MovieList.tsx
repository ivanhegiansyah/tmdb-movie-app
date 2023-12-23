import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import { MovieListItem } from '../../types';

type MovieListProps = {
  movieList: MovieListItem[];
  urlPath?: string;
};

const MovieList: React.FC<MovieListProps> = ({ movieList, urlPath }) => {
  return (
    <div
      className={
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8'
      }
    >
      {movieList?.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard
            id={movie.id}
            title={movie.original_title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            urlPath={urlPath}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
