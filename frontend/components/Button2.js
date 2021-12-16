import React, {useState} from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'

// handles async onClick functions
const Button2 = ({onClick, asyncCB=()=>{}, fillColor, text, textColor, disable=false, treatAsAsync=true}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setIsLoading(true);
        if (treatAsAsync) {
          onClick()
            .then(() => {
              setIsLoading(false);
              asyncCB();
            })
            .catch(err => {
              console.log(err);
              setIsLoading(false);
            });
        } else {
          onClick();
          setIsLoading(false);
        }
      }}
      disabled={disable}
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
