import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BASE_TMDB_API_URL, TMDB_ACCESS_TOKEN } from '../../config';
import axios from 'axios';

export type AuthState = {
  loginState: boolean;
  statusPostRequestToken: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorPostRequestToken: string | undefined;
  statusPostAccessToken: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorPostAccessToken: string | undefined;
};

export type DataParams = {
  redirect_to?: string;
  request_token?: string;
};

const initialState: AuthState = {
  loginState: false,
  statusPostRequestToken: 'idle',
  errorPostRequestToken: undefined,
  statusPostAccessToken: 'idle',
  errorPostAccessToken: undefined,
};

export const createRequestToken = createAsyncThunk(
  'movie/createRequestToken',
  async (data: DataParams) => {
    const response = await axios.post(
      `${BASE_TMDB_API_URL}/4/auth/request_token`,
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

export const createAccessToken = createAsyncThunk(
  'movie/createAccessToken',
  async (data: DataParams) => {
    const response = await axios.post(
      `${BASE_TMDB_API_URL}/4/auth/access_token`,
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginStateTrue: (state) => {
      state.loginState = true;
    },
    setLoginStateFalse: (state) => {
      state.loginState = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createRequestToken.fulfilled, (state, action) => {
        state.statusPostRequestToken = 'succeeded';
        localStorage.setItem('request_token', action.payload.request_token);
      })
      .addCase(createAccessToken.pending, (state) => {
        state.statusPostAccessToken = 'loading';
      })
      .addCase(createAccessToken.fulfilled, (state, action) => {
        state.statusPostAccessToken = 'succeeded';
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('account_id', action.payload.account_id);
      })
      .addCase(createAccessToken.rejected, (state, action) => {
        state.statusPostAccessToken = 'failed';
        state.errorPostAccessToken = action.error.message;
      });
  },
});

export const { setLoginStateTrue, setLoginStateFalse } = authSlice.actions;

export const selectLoginState = (state: RootState) => state.auth.loginState;

export const selectStatusPostRequestToken = (state: RootState) =>
  state.auth.statusPostRequestToken;
export const selecErrorPostRequestToken = (state: RootState) =>
  state.auth.errorPostRequestToken;
export const selectStatusAccessToken = (state: RootState) =>
  state.auth.statusPostAccessToken;
export const selectErrorPostRequestToken = (state: RootState) =>
  state.auth.errorPostAccessToken;

export default authSlice.reducer;
