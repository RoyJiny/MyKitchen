import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ImUp({image, setImage}) {
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
    <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'center' }}>
      <Icon style={{marginLeft: 80, alignSelf: 'center'}}
                name="upload"
                size={20}
                color="black"
                underlayColor="blue"
                onPress={pickImage}>
              </Icon>
      {image && <Image source={{ uri: image }} style={{ width: 64, height: 64 ,marginLeft: 16, borderRadius: 8}} />}
    </View>
  );
}