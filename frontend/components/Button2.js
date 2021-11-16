import React, {useState} from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'

const Button2 = ({onClick, fillColor, text, textColor}) => {
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <TouchableOpacity
            onPress={() => {
                setIsLoading(true);
                onClick();
                setIsLoading(false);
            }}
            style={{
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0,
                shadowRadius: 10,
                elevation: 5,
                borderRadius: 6,
                backgroundColor: fillColor,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 6,
                alignSelf: 'center'
            }}
        >
            {
                !isLoading
                ? <Text 
                    style={{
                        textAlign:'center',
                        color: textColor,
                        fontSize: 20,
                        padding: 4
                    }}
                >
                        {text}
                </Text>
                :
                <ActivityIndicator
                    style={{
                        alignSelf: 'center'
                    }}
                    size={30}
                    color="black"
                />
            }
            
        </TouchableOpacity>
    )
}

export default Button2
