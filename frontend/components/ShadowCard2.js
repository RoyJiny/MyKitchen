import React from 'react';
import {View,StyleSheet} from 'react-native';

const ShadowCard2 = ({children,width}) => {
    return(
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    cardShadow: {
      marginHorizontal: 15,
      borderRadius: 16,
      backgroundColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      },
    cardContainer: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      }
    })

export default ShadowCard2;