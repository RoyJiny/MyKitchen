import React from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Colors from '../globals/Colors';

const NetworkErrorAlert = ({dismiss}) => {
  return (
    <Animatable.View style={styles.container} animation="slideInDown" duration={500}>
      <Text style={styles.text}>
        Oops, seems like we have a network error :({'\n'}Please try again later
      </Text>
      <TouchableOpacity onPress={dismiss} style={styles.dismiss}>
        <Text style={styles.text}>Dismiss</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.alertRed,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  dismiss: {
    alignSelf: 'flex-end'
  }
});

export default NetworkErrorAlert;