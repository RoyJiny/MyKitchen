import React from 'react'
import {View} from 'react-native'

const BlankDivider = ({height}) => {
  return (
    <View style={{
      height: height,
      backgroundColor: 'transparent'
    }}/>
  );
};

export default BlankDivider;