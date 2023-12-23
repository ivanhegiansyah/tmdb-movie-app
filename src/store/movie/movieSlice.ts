import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { MovieDetailsResponse, MovieListResponse } from '../../types';
import { BASE_TMDB_API_URL, TMDB_ACCESS_TOKEN } from '../../config';

export type MovieState = {
  statusTopRated: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorTopRated: string | undefined;
  topRated: MovieListResponse;

  statusNowPlaying: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorNowPlaying: string | undefined;
  nowPlaying: MovieListResponse;

  statusMovieDetail: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorMovieDetail: string | undefined;
  MovieDetail: MovieDetailsResponse;

  statusMovieRecommendations: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorMovieRecommendations: string | undefined;
  MovieRecommendations: MovieListResponse;

  statusFavoriteMovies: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorFavoriteMovies: string | undefined;
  favoriteMovies: MovieListResponse;

  statusWatchlistMovies: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorWatchlistMovies: string | undefined;
  watchlistMovies: MovieListResponse;

  statusSearchMovies: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorSearchMovies: string | undefined;
  searchMovies: MovieListResponse;

  statusAddFavoriteMovies: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorAddFavoriteMovies: string | undefined;

  statusAddWatchlistMovies: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorAddWatchlistMovies: string | undefined;
};

export type DataParams = {
  accountId?: string;
  media_type?: string;
  media_id?: number;
  favorite?: boolean;
  watchlist?: boolean;
};

const initialState: MovieState = {
  statusTopRated: 'idle',
  errorTopRated: undefined,
  topRated: {} as MovieListResponse,

  statusNowPlaying: 'idle',
  errorNowPlaying: undefined,
  nowPlaying: {} as MovieListResponse,

  statusMovieDetail: 'idle',
  errorMovieDetail: undefined,
  MovieDetail: {} as MovieDetailsResponse,

  statusMovieRecommendations: 'idle',
  errorMovieRecommendations: undefined,
  MovieRecommendations: {} as MovieListResponse,

  statusFavoriteMovies: 'idle',
  errorFavoriteMovies: undefined,
  favoriteMovies: {} as MovieListResponse,

  statusWatchlistMovies: 'idle',
  errorWatchlistMovies: undefined,
  watchlistMovies: {} as MovieListResponse,

  statusSearchMovies: 'idle',
  errorSearchMovies: undefined,
  searchMovies: {} as MovieListResponse,

  statusAddFavoriteMovies: 'idle',
  errorAddFavoriteMovies: undefined,

  statusAddWatchlistMovies: 'idle',
  errorAddWatchlistMovies: undefined,
};

export const fetchTopRatedMovie = createAsyncThunk(
  'movie/fetchTopRatedMovie',
  async () => {
    const response = await axios.get(
      `${BASE_TMDB_API_URL}/3/movie/top_rated?language=en-US&page=1`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchNowPlayingMovie = createAsyncThunk(
  'movie/fetchNowPlayingMovie',
  async () => {
    const response = await axios.get(
      `${BASE_TMDB_API_URL}/3/movie/now_playing?language=en-US&page=1`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  'movie/fetchMovieDetail',
  async (movieId: number) => {
    const response = await axios.get(
      `${BASE_TMDB_API_URL}/3/movie/${movieId}?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchMovieRecommendations = createAsyncThunk(
  'movie/fetchMovieRecommendations',
  async (movieId: number) => {
    const response = await axios.get(
      `${BASE_TMDB_API_URL}/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchFavoriteMovies = createAsyncThunk(
  'movie/fetchFavoriteMovies',
  async (accountId: string) => {
    const response = await axios.get(
      `${BASE_TMDB_API_URL}/3/account/${accountId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchWatchlistMovies = createAsyncThunk(
  'movie/fetchWatchlistMovies',
  async (accountId: string) => {
    const response = await axios.get(
      `${BASE_TMDB_API_URL}/3/account/${accountId}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchSearchMovies = createAsyncThunk(
  'movie/fetchSearchMovies',
  async (query: string) => {
    const response = await axios.get(
      `${BASE_TMDB_API_URL}/3/search/movie?page=1&query=${query}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const postFavoriteMovies = createAsyncThunk(
  'movie/postFavoriteMovies',
  async (data: DataParams) => {
    const response = await axios.post(
      `${BASE_TMDB_API_URL}/3/account/${data.accountId}/favorite`,
      data ?? {},
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

export const postWatchlistMovies = createAsyncThunk(
  'movie/postWatchlistMovies',
  async (data: DataParams) => {
    const response = await axios.post(
      `${BASE_TMDB_API_URL}/3/account/${data.accountId}/watchlist`,
      data ?? {},
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetStatusAddFavoriteMovies: (state) => {
      state.statusAddFavoriteMovies = 'idle';
    },
    resetStatusAddWatchlistMovie: (state) => {
      state.statusAddWatchlistMovies = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedMovie.pending, (state) => {
        state.statusTopRated = 'loading';
      })
      .addCase(fetchTopRatedMovie.fulfilled, (state, action) => {
        state.statusTopRated = 'succeeded';
        state.topRated = action.payload;
      })
      .addCase(fetchTopRatedMovie.rejected, (state, action) => {
        state.statusTopRated = 'failed';
        state.errorTopRated = action.error.message;
      })
      .addCase(fetchNowPlayingMovie.pending, (state) => {
        state.statusNowPlaying = 'loading';
      })
      .addCase(fetchNowPlayingMovie.fulfilled, (state, action) => {
        state.statusNowPlaying = 'succeeded';
        state.nowPlaying = action.payload;
      })
      .addCase(fetchNowPlayingMovie.rejected, (state, action) => {
        state.statusNowPlaying = 'failed';
        state.errorNowPlaying = action.error.message;
      })
      .addCase(fetchMovieDetail.pending, (state) => {
        state.statusMovieDetail = 'loading';
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.statusMovieDetail = 'succeeded';
        state.MovieDetail = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.statusMovieDetail = 'failed';
        state.errorMovieDetail = action.error.message;
      })
      .addCase(fetchMovieRecommendations.pending, (state) => {
        state.statusMovieRecommendations = 'loading';
      })
      .addCase(fetchMovieRecommendations.fulfilled, (state, action) => {
        state.statusMovieRecommendations = 'succeeded';
        state.MovieRecommendations = action.payload;
      })
      .addCase(fetchMovieRecommendations.rejected, (state, action) => {
        state.statusMovieRecommendations = 'failed';
        state.errorMovieRecommendations = action.error.message;
      })
      .addCase(fetchFavoriteMovies.pending, (state) => {
        state.statusFavoriteMovies = 'loading';
      })
      .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
        state.statusFavoriteMovies = 'succeeded';
        state.favoriteMovies = action.payload;
      })
      .addCase(fetchFavoriteMovies.rejected, (state, action) => {
        state.statusFavoriteMovies = 'failed';
        state.errorFavoriteMovies = action.error.message;
      })
      .addCase(fetchWatchlistMovies.pending, (state) => {
        state.statusWatchlistMovies = 'loading';
      })
      .addCase(fetchWatchlistMovies.fulfilled, (state, action) => {
        state.statusWatchlistMovies = 'succeeded';
        state.watchlistMovies = action.payload;
      })
      .addCase(fetchWatchlistMovies.rejected, (state, action) => {
        state.statusWatchlistMovies = 'failed';
        state.errorWatchlistMovies = action.error.message;
      })
      .addCase(fetchSearchMovies.pending, (state) => {
        state.statusSearchMovies = 'loading';
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.statusSearchMovies = 'succeeded';
        state.searchMovies = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.statusSearchMovies = 'failed';
        state.errorSearchMovies = action.error.message;
      })
      .addCase(postFavoriteMovies.pending, (state) => {
        state.statusAddFavoriteMovies = 'loading';
      })
      .addCase(postFavoriteMovies.fulfilled, (state) => {
        state.statusAddFavoriteMovies = 'succeeded';
      })
      .addCase(postFavoriteMovies.rejected, (state, action) => {
        state.statusAddFavoriteMovies = 'failed';
        state.errorAddFavoriteMovies = action.error.message;
      })
      .addCase(postWatchlistMovies.pending, (state) => {
        state.statusAddWatchlistMovies = 'loading';
      })
      .addCase(postWatchlistMovies.fulfilled, (state) => {
        state.statusAddWatchlistMovies = 'succeeded';
      })
      .addCase(postWatchlistMovies.rejected, (state, action) => {
        state.statusAddFavoriteMovies = 'failed';
        state.errorAddWatchlistMovies = action.error.message;
      });
  },
});

export const { resetStatusAddFavoriteMovies, resetStatusAddWatchlistMovie } =
  movieSlice.actions;

export const selectTopRated = (state: RootState) => state.movie.topRated;
export const selectTopRatedStatus = (state: RootState) =>
  state.movie.statusTopRated;
export const selectTopRatedError = (state: RootState) =>
  state.movie.errorTopRated;

export const selectNowPlaying = (state: RootState) => state.movie.nowPlaying;
export const selectNowPlayingStatus = (state: RootState) =>
  state.movie.statusNowPlaying;
export const selectNowPlayingError = (state: RootState) =>
  state.movie.errorNowPlaying;

export const selectMovieDetail = (state: RootState) => state.movie.MovieDetail;
export const selectMovieDetailStatus = (state: RootState) =>
  state.movie.statusMovieDetail;
export const selectMovieDetailError = (state: RootState) =>
  state.movie.errorMovieDetail;

export const selectMovieRecommendations = (state: RootState) =>
  state.movie.MovieRecommendations;
export const selectMovieRecommendationsStatus = (state: RootState) =>
  state.movie.statusMovieRecommendations;
export const selectMovieRecommendationsError = (state: RootState) =>
  state.movie.errorMovieRecommendations;

export const selectFavoriteMovies = (state: RootState) =>
  state.movie.favoriteMovies;
export const selectFavoriteMoviesStatus = (state: RootState) =>
  state.movie.statusFavoriteMovies;
export const selectFavoriteMoviesError = (state: RootState) =>
  state.movie.errorFavoriteMovies;

export const selectWatchlistMovies = (state: RootState) =>
  state.movie.watchlistMovies;
export const selectWatchlistMoviesStatus = (state: RootState) =>
  state.movie.statusWatchlistMovies;
export const selectWatchlistMoviesError = (state: RootState) =>
  state.movie.errorWatchlistMovies;

export const selectSearchMovies = (state: RootState) =>
  state.movie.searchMovies;
export const selectSearchMoviesStatus = (state: RootState) =>
  state.movie.statusSearchMovies;
export const selectSearchMoviesError = (state: RootState) =>
  state.movie.errorSearchMovies;

export const selectAddFavoriteMoviesStatus = (state: RootState) =>
  state.movie.statusAddFavoriteMovies;
export const selectAddFavoriteMoviesError = (state: RootState) =>
  state.movie.errorAddFavoriteMovies;

export const selectAddWatchlistMoviesStatus = (state: RootState) =>
  state.movie.statusAddWatchlistMovies;
export const selectAddWatchlistMoviesError = (state: RootState) =>
  state.movie.errorAddWatchlistMovies;

export default movieSlice.reducer;
