import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImageWithIndicator from './ImageWithIndicator';

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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'center' }}>
      <Icon style={{alignSelf: 'center'}}
        name="upload"
        size={20}
        color="black"
        underlayColor="blue"
        onPress={pickImage}>
      </Icon>
      {image && <ImageWithIndicator imageStyle={{width: 64, height: 64 ,marginLeft: 16, borderRadius: 8}} imgLink={image}/>}
    </View>
  );
}