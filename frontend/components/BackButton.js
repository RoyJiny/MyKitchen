import React from 'react'
import { TouchableOpacity } from 'react-native'
import * as Icons from '@expo/vector-icons'

const BackButton = ({onClick}) => {    
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        alignSelf: 'center'
      }}
  >
    <Icons.FontAwesome5 name="angle-left" size={30} color="black" />
  </TouchableOpacity>
  )
}

export default BackButton
