//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaries,
} from '../services/service';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaries(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });

          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        },
      )
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error ? (
        <ScrollView style={{backgroundColor: 'black'}}>
          {moviesImages && (
            <View>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={{height: 0}}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}

          <View style={{padding: 5}}>
            {popularMovies && (
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}></List>
            )}

            {familyMovies && (
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}></List>
            )}
            {documentaryMovies && (
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}></List>
            )}
            {popularTv && (
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}></List>
            )}
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large"></ActivityIndicator>
      )}
      {error && <Error></Error>}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
