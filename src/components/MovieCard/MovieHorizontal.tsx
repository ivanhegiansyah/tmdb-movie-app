import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import { MovieListItem } from '../../types';

type MovieHorizontalProps = {
  movieHorizontal: MovieListItem[];
};

const MovieHorizontal: React.FC<MovieHorizontalProps> = ({
  movieHorizontal,
}) => {
  return (
    <div
      className={'flex overflow-x-auto scrolling-touch items-start gap-x-4 p-4'}
    >
      {movieHorizontal?.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard
            id={movie.id}
            title={movie.original_title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            widthCard={'xl:w-52 lg:w-42 w-32'}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieHorizontal;
