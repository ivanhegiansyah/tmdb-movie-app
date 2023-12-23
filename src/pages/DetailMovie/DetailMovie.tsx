import { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAppDispatch } from '../../store/hooks';
import {
  fetchMovieDetail,
  fetchMovieRecommendations,
} from '../../store/movie/movieSlice';
import { useParams } from 'react-router-dom';
import DetailSection from './DetailSection/DetailSection';
import RecommendationSection from './RecommendationSection/RecommendationSection';

const DetailMovie = () => {
  const dispatch = useAppDispatch();
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(fetchMovieDetail(Number(movieId)));
    dispatch(fetchMovieRecommendations(Number(movieId)));
  }, [dispatch, movieId]);

  return (
    <Layout paddingLayout="p-0">
      <DetailSection />
      <RecommendationSection />
    </Layout>
  );
};

export default DetailMovie;
