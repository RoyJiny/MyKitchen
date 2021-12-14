import React, {useState} from 'react';
import {View,Image,StyleSheet,ActivityIndicator} from 'react-native';

const ImageWithIndicator = ({imageStyle,imgLink}) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <View>
          <Image style={{ ...imageStyle, display: isLoading ? 'none' : 'flex' }} source={{uri:imgLink}} onLoadEnd={ ()=>{{setIsLoading(false);}}}/>
          <ActivityIndicator style={{ ...imageStyle, display: isLoading ? 'flex' : 'none' }} color="black" />
        </View>

    );
  };
  
  const styles = StyleSheet.create({
    
  });
  
  export default ImageWithIndicator;