import React, {useState} from 'react';
import {View,Image,StyleSheet,ActivityIndicator} from 'react-native';

const ImageWithIndicator = ({imageStyle,imgLink}) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <View>
          <Image style={{ ...imageStyle, display: isLoading ? 'none' : 'flex' }} source={{uri:imgLink}} onLoadEnd={ ()=>{{setIsLoading(false);}}}/>
          {isLoading ? <ActivityIndicator style={{ ...imageStyle }} color="black" /> : null}
        </View>

    );
  };
  
  const styles = StyleSheet.create({
    
  });
  
  export default ImageWithIndicator;