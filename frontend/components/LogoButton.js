import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'

const LogoButton = ({imageLink,onClick, borderColor, fillColor, text, textColor}) => {    
    return (
        <TouchableOpacity
            onPress={onClick}
            style={{
                borderRadius: 30,
                borderWidth: 1.5,
                borderColor: borderColor,
                backgroundColor: fillColor,
                alignItems: 'center',
                height: 50,
                width: 310,
                alignSelf: 'center',
                flexDirection: 'row',
                paddingLeft: 20
            }}
        >
            <Image
                style={{
                    height: 20,
                    width: 20,
                    marginRight: 30
                }}
                source={{uri: imageLink}}
            />
            <Text 
                style={{
                    textAlign:'center',
                    color: textColor,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}
            >
                    {text}
            </Text>
        </TouchableOpacity>
    )
}

export default LogoButton
