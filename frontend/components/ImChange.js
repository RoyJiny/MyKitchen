import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImChange({isActive, imLink}) {
  const [image, setImage] = useState(imLink);

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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <TouchableOpacity onPress={isActive ? pickImage : () =>{}}>
      {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
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
        marginRight: 16
    }
});