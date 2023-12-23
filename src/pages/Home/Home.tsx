import { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import TopRatedSection from './TopRatedSection/TopRatedSection';
import {
  fetchNowPlayingMovie,
  fetchTopRatedMovie,
} from '../../store/movie/movieSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import NowPlayingSection from './NowPlayingSection/NowPlayingSection';
import {
  createAccessToken,
  selectStatusAccessToken,
} from '../../store/auth/authSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const statusAccessToken = useAppSelector(selectStatusAccessToken);
  const requestToken = localStorage.getItem('request_token') || '';
  const accessToken = localStorage.getItem('access_token') || '';
  const accountId = localStorage.getItem('account_id') || '';

  useEffect(() => {
    dispatch(fetchTopRatedMovie());
    dispatch(fetchNowPlayingMovie());
  }, [dispatch]);

  useEffect(() => {
    if (requestToken && !accessToken && !accountId) {
      dispatch(createAccessToken({ request_token: requestToken }));
    }
  }, [requestToken, accessToken, accountId, dispatch]);
  return (
    <>
      {statusAccessToken === 'loading' ? (
        <div className="flex justify-center items-start mt-72">
          <div className="inline-block h-28 w-28 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      ) : (
        <Layout>
          <NowPlayingSection />
          <TopRatedSection />
        </Layout>
      )}
    </>
  );
};

export default Home;
