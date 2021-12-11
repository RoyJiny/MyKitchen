import React, {useState} from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Tag = ({text, textColor, stateInit, add, remove}) => {
    const [isSelected, setIsSelected] = useState(stateInit);

    return (
        <TouchableOpacity
            onPress={() => {
                setIsSelected(!isSelected);
                if (isSelected) remove(text);
                else add(text);
            }}
            style={{
                borderRadius: 16,
                borderColor: isSelected ? "#068cbd" : "#bab8b8",
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
                        color: isSelected ? "#068cbd" : "#6b6a6a",
                        fontSize: 14
                    }}
                >
                        {text}
                </Text>
            }
            
        </TouchableOpacity>
    )
}

export default Tag
