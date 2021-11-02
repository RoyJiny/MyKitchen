import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

import Colors from '../globals/Colors'

const Backdrop = ({text, height}) => {
  return (
    <View style={[styles.container, {height: height}]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation: 15,
    marginBottom: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    paddingLeft: 40
  },
  text: {
    color: 'white',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  }
});

export default Backdrop;
