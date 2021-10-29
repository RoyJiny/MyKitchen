import React, {useState} from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'

const Button = ({onClick, borderColor, fillColor, text, textColor}) => {
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <TouchableOpacity
            onPress={async () => {
                setIsLoading(true);
                await onClick();
                setIsLoading(false);
            }}
            style={{
                borderRadius: 30,
                borderWidth: 1.5,
                borderColor: borderColor,
                backgroundColor: fillColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                height: 50,
                width: 300,
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
