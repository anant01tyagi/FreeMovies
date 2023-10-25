import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const defaultProps = {
  main: false,
};

const propTypes = {
  main: PropTypes.bool,
};
class NavBar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;

    return (
      <SafeAreaView>
        {main ? (
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                width: '20%',
                margin: 10,
                alignItems: 'center',
                alignSelf: 'flex-end',
                borderRadius: 70,
              }}
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name={'search-outline'} size={30} color="red"></Icon>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              // marginBottom: 15,
              padding: 5,
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              //backgroundColor: 'white',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                width: '10%',
                marginTop: 5,
                marginLeft: 10,
                marginBottom: 5,
                alignItems: 'center',
                borderRadius: 80,
                justifyContent: 'center',
                elevation: 5,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={30} color="red"></Icon>
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: '700',
                alignSelf: 'center',
                color: 'red',
                fontSize: 23,
                elevation: 5,
                shadowRadius: 5,
                shadowColor: 'black',
              }}>
              {/* Movie Overview */}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                width: '10%',
                marginTop: 5,
                marginLeft: 10,
                marginBottom: 5,
                alignItems: 'center',
                borderRadius: 80,
                justifyContent: 'center',
                elevation: 5,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-forward'} size={30} color="red"></Icon>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
