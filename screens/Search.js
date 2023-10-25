import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Error from '../components/Error';

import {searchMovieTv} from '../services/service';

const Search = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [searchResults, setSearchResults] = React.useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Search Movies or TV Shows"
            />
          </View>

          <TouchableOpacity
            style={styles.search}
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search-outline'} size={25} color="red"></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={styles.noResults}>
              <Text>No results matching your criteria.</Text>
              <Text>Try using different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.noResults}>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.8,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flexGrow: 1,
    flexBasis: 'auto',
    paddingRight: 2,
  },
  search: {
    backgroundColor: 'white',
    width: 40,
    marginRight: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 40,
  },
  searchItems: {
    padding: 5,
  },

  noResults: {
    paddingTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default Search;
