import React, {useState} from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'

const Button = ({onClick, fillColor, text, textColor, height=50,width=300}) => {
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
                borderRadius: 10,
                backgroundColor: fillColor,
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop: 20,
                height: height,
                width: width,
                alignSelf: 'center'
            }}
        >
            {
                !isLoading
                ? <Text 
                    style={{
                        textAlign:'center',
                        color: textColor,
                        fontSize: 18,
                        fontWeight: 'bold'
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

export default Button
