import {
  BASE_TMDB_IMAGE_URL,
  MOVIE_BACKDROP_SIZE,
  MOVIE_POSTER_SIZE,
} from '../../../config';
import {
  convertDecimalToPercantage,
  calculateDuration,
} from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  DataParams,
  postFavoriteMovies,
  postWatchlistMovies,
  selectMovieDetail,
  selectMovieDetailStatus,
} from '../../../store/movie/movieSlice';
import moment from 'moment';
import favoriteIcon from '../../../assets/icons/material-symbols_favorite.svg';
import bookmarkIcon from '../../../assets/icons/mingcute_bookmark-line.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';
import LoginPopup from '../../../components/LoginPopup/LoginPopup';
import { Rating } from 'react-simple-star-rating';

type MovieRating = {
  movieId: number;
  rating: number;
};

const DetailSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const movieDetail = useAppSelector(selectMovieDetail);
  const statusDetail = useAppSelector(selectMovieDetailStatus);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const movieRatingList = JSON.parse(
    localStorage.getItem('movie_rating_list') || '[]'
  );

  const accountId = localStorage.getItem('account_id') || '';

  const movieBackdropUrl = `${BASE_TMDB_IMAGE_URL}/${MOVIE_BACKDROP_SIZE}/${movieDetail?.backdrop_path}`;
  const moviePosterUrl = `${BASE_TMDB_IMAGE_URL}/${MOVIE_POSTER_SIZE}/${movieDetail?.poster_path}`;

  const generateMovieGenres = () => {
    if (movieDetail) {
      return movieDetail?.genres?.map((genre) => genre?.name).join(', ');
    }
  };

  const handleAddToFavorite = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    if (accountId && movieDetail?.id) {
      const params: DataParams = {
        accountId,
        media_type: 'movie',
        media_id: movieDetail?.id,
        favorite: true,
      };
      dispatch(postFavoriteMovies(params));
    } else {
      setOpenPopup(true);
    }
  };

  const handleAddToWatchlist = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    if (accountId && movieDetail?.id) {
      const params: DataParams = {
        accountId,
        media_type: 'movie',
        media_id: movieDetail?.id,
        watchlist: true,
      };
      dispatch(postWatchlistMovies(params));
    } else {
      setOpenPopup(true);
    }
  };

  const handleRating = (rate: number) => {
    let tempArr = [...movieRatingList];
    const existingMovieRatingIndex = tempArr.findIndex(
      (idx) => idx.movieId === movieDetail.id
    );

    console.log(existingMovieRatingIndex)

    if (existingMovieRatingIndex !== -1) {
      tempArr[existingMovieRatingIndex] = {
        movieId: movieDetail.id,
        rating: rate,
      };
    } else {
      tempArr = [
        ...tempArr,
        {
          movieId: movieDetail.id,
          rating: rate,
        },
      ];
    }

    setRating(rate);
    localStorage.setItem('movie_rating_list', JSON.stringify(tempArr));
  };

  useEffect(() => {
    if (movieRatingList?.length !== 0) {
      const movieRating = movieRatingList?.find(
        (movie: MovieRating) => movie.movieId === movieDetail?.id
      );
      if (movieRating) {
        setRating(movieRating.rating);
      } else {
        setRating(0);
      }
    }
  }, [movieRatingList, movieDetail?.id]);

  const renderLoadingSkeleton = () => {
    return (
      <div className="w-full">
        <Skeleton width={'50%'} height={'2em'} />
        <div className="flex w-full gap-2 mt-2">
          <Skeleton width={'4em'} height={'1em'} />
          <Skeleton width={'4em'} height={'1em'} />
          <Skeleton width={'3em'} height={'1em'} />
        </div>
        <div className="flex w-full items-center gap-2 mt-4 mb-2">
          <Skeleton width={'2em'} height={'2em'} borderRadius={'100px'} />
          <Skeleton width={'2em'} height={'1.3em'} />
          <Skeleton width={'2em'} height={'1.3em'} />
          <Skeleton width={'2em'} height={'1.3em'} />
        </div>
        <Skeleton width={'10em'} height={'1em'} className="mt-4 mb-2" />
        <Skeleton height={'1em'} />
        <Skeleton height={'1em'} />
        <Skeleton height={'1em'} />
        <Skeleton height={'1em'} />
        <Skeleton height={'1em'} />
      </div>
    );
  };

  return (
    <>
      {!accountId && <LoginPopup open={openPopup} setOpen={setOpenPopup} />}
      <div
        className="w-full bg-no-repeat bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${movieBackdropUrl})`,
          maxWidth: '100%',
          backgroundSize: 'cover',
        }}
      >
        <div className="px-8 lg:px-32 xl:px-48 py-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {statusDetail === 'loading' ? (
              <>
                <Skeleton width={'16em'} height={'24em'} />
                {renderLoadingSkeleton()}
              </>
            ) : (
              <>
                <div className="grow-0 shrink-0 self-center">
                  <img
                    className="w-64 shadow-2xl rounded-lg"
                    src={moviePosterUrl}
                    alt={`${movieDetail?.original_title} poster`}
                  />
                </div>

                <div className="text-white w-full">
                  <div>
                    <div className="flex items-center text-3xl font-bold gap-2">
                      <h1 className="">{movieDetail?.original_title} </h1>
                      <p className="font-normal">
                        ({moment(movieDetail?.release_date).year()})
                      </p>
                    </div>

                    <p className="mb-5">
                      {movieDetail?.release_date && (
                        <>
                          <span>
                            {moment(movieDetail?.release_date).format('L')}
                          </span>
                          <span className="px-2">•</span>
                        </>
                      )}

                      <span>{generateMovieGenres()}</span>

                      {movieDetail?.runtime && (
                        <>
                          <span className="px-2">•</span>
                          <span>{calculateDuration(movieDetail?.runtime)}</span>
                        </>
                      )}
                    </p>

                    <div className="flex w-28 text-sm items-center gap-2 mb-5">
                      <div className="relative bg-white rounded-full p-1">
                        <div
                          className="bg-white p-4 rounded-full"
                          style={{
                            background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(#0EA5E9 ${convertDecimalToPercantage(
                              movieDetail?.vote_average
                            )}%, #EDEDED 0)`,
                          }}
                        >
                          {' '}
                          <div className=" absolute text-[#0EA5E9] font-bold top-2.5 left-[11px]">
                            {convertDecimalToPercantage(
                              movieDetail?.vote_average
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs">User Score</p>
                      <img
                        src={favoriteIcon}
                        alt="favorite icon"
                        onClick={handleAddToFavorite}
                        className="hover:scale-110 cursor-pointer"
                      />
                      <img
                        src={bookmarkIcon}
                        alt="bookmark icon"
                        onClick={handleAddToWatchlist}
                        className="hover:scale-110 cursor-pointer"
                      />
                    </div>
                    <p className="italic mb-2">{movieDetail?.tagline}</p>

                    <p className="font-bold text-xl mb-1">Overview</p>
                    <p>{movieDetail?.overview}</p>
                  </div>

                  {accountId && (
                    <div className="flex mt-4 items-center gap-2">
                      <p className="font-bold text-xl">
                        {rating ? 'Your Rating: ' : 'Add Rating: '}{' '}
                      </p>
                      <Rating
                        // style={{ marginLeft: '24px' }}
                        SVGstyle={{ display: 'inline-block' }}
                        size={24}
                        initialValue={rating ?? 0}
                        allowFraction
                        onClick={handleRating}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSection;
