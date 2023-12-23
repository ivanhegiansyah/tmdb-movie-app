import { BASE_TMDB_IMAGE_URL, MOVIE_POSTER_SIZE } from '../../config';
import favoriteIcon from '../../assets/icons/material-symbols_favorite.svg';
import bookmarkIcon from '../../assets/icons/mingcute_bookmark-line.svg';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  DataParams,
  postFavoriteMovies,
  postWatchlistMovies,
  selectFavoriteMovies,
  selectWatchlistMovies,
} from '../../store/movie/movieSlice';
import { useState } from 'react';
import LoginPopup from '../LoginPopup/LoginPopup';

export type MovieCardProps = {
  title: string;
  posterPath: string;
  releaseDate: string;
  widthCard?: string;
  id?: number;
  urlPath?: string;
};

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  releaseDate,
  widthCard,
  id,
  urlPath,
}: MovieCardProps) => {
  const releaseYear = moment(releaseDate).year();
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const watchlistMovies = useAppSelector(selectWatchlistMovies);

  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const accountId = localStorage.getItem('account_id') || '';

  const handleAddToFavorite = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    if (urlPath === '/watchlist') {
      return;
    }
    if (accountId && id) {
      const isAlreadyFavorite = favoriteMovies?.results?.find(
        (movie) => movie.id === id
      );
      const params: DataParams = {
        accountId,
        media_type: 'movie',
        media_id: id,
        favorite: isAlreadyFavorite ? false : true,
      };
      dispatch(postFavoriteMovies(params));
    } else {
      setOpenPopup(true);
    }
  };

  const handleAddToWatchlist = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    if (urlPath === '/favorite') {
      return;
    }
    if (accountId && id) {
      const isAlreadyWatchlist = watchlistMovies?.results?.find(
        (movie) => movie.id === id
      );
      const params: DataParams = {
        accountId,
        media_type: 'movie',
        media_id: id,
        watchlist: isAlreadyWatchlist ? false : true,
      };
      dispatch(postWatchlistMovies(params));
    } else {
      setOpenPopup(true);
    }
  };

  return (
    <>
      {!accountId && <LoginPopup open={openPopup} setOpen={setOpenPopup} />}
      <div
        className={`group/card hover:scale-105 duration-500 hover:shadow-2xl hover:shadow-blue-500/50 transition-all ${
          widthCard ? widthCard : 'w-full'
        }`}
      >
        <div className="relative">
          <div className="absolute bottom-2 right-2 z-50 flex gap-1 invisible group-hover/card:visible">
            <img
              src={favoriteIcon}
              alt="favorite icon"
              onClick={handleAddToFavorite}
              className="hover:scale-110"
            />
            <img
              src={bookmarkIcon}
              alt="bookmark icon"
              onClick={handleAddToWatchlist}
              className="hover:scale-110"
            />
          </div>
          <div className="">
            <img
              src={
                posterPath
                  ? `${BASE_TMDB_IMAGE_URL}/${MOVIE_POSTER_SIZE}/${posterPath}`
                  : '/no_image.jpg'
              }
              alt={`${title} poster`}
              loading="lazy"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>

        <div className="mt-1 text-[#B6B6B6] px-4 pb-2">
          <p className="font-bold text-lg truncate">{title}</p>
          <p className="font-normal text-base">{releaseYear}</p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
