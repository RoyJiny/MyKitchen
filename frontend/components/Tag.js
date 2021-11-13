import React, {useState} from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Tag = ({text, textColor, stateInit}) => {
    const [isSelected, setIsSelected] = useState(stateInit==true);
    const [bordColor,setBordColor] = useState(stateInit ? "dodgerblue" : textColor);
    
    return (
        <TouchableOpacity
            onPress={() => {
                setIsSelected(!isSelected);
                isSelected ? setBordColor(textColor) : setBordColor("dodgerblue")
            }}
            style={{
                borderRadius: 16,
                borderColor: bordColor,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 16,
                marginHorizontal: 5,
                paddingHorizontal: 6,
                alignSelf: 'center'
            }}
        >
            {
               <Text 
                    style={{
                        textAlign:'center',
                        color: bordColor,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}
                >
                        {text}
                </Text>
            }
            
        </TouchableOpacity>
    )
}

export default Tag
