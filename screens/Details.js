import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getMovie} from '../services/service';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';

const Details = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const movieUrl = route.params.url;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const placeHolder = require('../assets/images/clapboard.png');

  const dimensions = Dimensions.get('screen');

  useEffect(() => {
    getMovie(movieId)
      .then(movieData => {
        setMovieDetail(movieData);
        setLoaded(true);
      })
      .catch(err => {
        setError(err);
      });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <View style={styles.container}>
              <Image
                style={{height: dimensions.height / 1.7, width: '100%'}}
                resizeMode="cover"
                source={
                  movieDetail.poster_path
                    ? {
                        uri:
                          'https://image.tmdb.org/t/p/w500' +
                          movieDetail.poster_path,
                      }
                    : placeHolder
                }></Image>

              <View style={styles.container}>
                <View style={styles.playButton}>
                  <PlayButton handlePress={videoShown}></PlayButton>
                </View>
                <Text style={styles.movieTitle}>
                  {movieDetail.title.toUpperCase()}
                </Text>
                {movieDetail.genres && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10,
                      padding: 5,
                    }}>
                    {movieDetail.genres.map(genre => {
                      return (
                        <Text
                          key={genre.id}
                          style={{
                            marginHorizontal: 8,
                            fontWeight: '500',
                            fontSize: 12,
                          }}>
                          {genre.name}
                        </Text>
                      );
                    })}
                  </View>
                )}
                <Text
                  style={{marginBottom: 10, fontWeight: '500', fontSize: 13}}>
                  {movieDetail.runtime + ' Minutes'}
                </Text>

                <StarRating
                  disabled={true}
                  fullStarColor={'gold'}
                  maxStars={5}
                  rating={movieDetail.vote_average / 2}
                  starSize={30}
                />
                <Text style={styles.overview}>{movieDetail.overview}</Text>
                <Text style={styles.release}>
                  {'Released on: ' +
                    dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
                </Text>
              </View>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <VideoPlayer
              fullScreenOrientation="all"
              onBack={() => {
                videoShown();
              }}
              onEnd={() => {
                videoShown();
              }}
              navigator={navigation}
              source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            />
          </Modal>
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overview: {
    padding: 10,
    marginTop: 10,
    textAlign: 'justify',
    fontWeight: '500',
    color: 'black',
  },
  release: {
    fontWeight: '500',
    fontSize: 15,
    paddingBottom: 20,
  },
  playButton: {
    position: 'absolute',
    top: -30,
    right: 10,
  },
});

export default Details;
