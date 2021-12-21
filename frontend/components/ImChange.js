import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImageWithIndicator from './ImageWithIndicator';

export default function ImChange({isActive, image, setImage}) {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <TouchableOpacity onPress={isActive ? pickImage : () =>{}}>
      {image && <ImageWithIndicator imageStyle={styles.imageStyle} imgLink={image}/>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 84,
        width: 84,
        borderRadius: 16,
        borderColor: 'black',
        borderWidth: 0.5,
    }
});