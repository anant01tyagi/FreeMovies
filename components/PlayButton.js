import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable
        onPress={() => {
          handlePress();
        }}
        style={styles.button}>
        <Icon name={'caret-forward-outline'} size={30} color={'white'}></Icon>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 70,
    padding: 10,
    backgroundColor: 'red',
    width: 50,
    elevation: 5,
  },
});

export default PlayButton;
