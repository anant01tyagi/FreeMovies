import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const placeHolder = require('../assets/images/clapboard.png');

const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            movieId: item.id,
            url: item.poster_path,
          })
        }
        style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeHolder
          }></Image>

        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    elevation: 5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginVertical: 4,
  },
  image: {
    width: 120,
    height: 200,
    borderRadius: 6,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
  },
});

Card.propTypes = propTypes;
export default Card;
