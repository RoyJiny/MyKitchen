import React, {useState} from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'

const Button = ({onClick, fillColor, text, textColor, height=50,width=300,additionalStyle={},additionalTextStyle={},treatAsAsync=false,asyncCB=()=>{},asyncStopLoading=true}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setIsLoading(true);
        if (treatAsAsync) {
        onClick()
          .then(() => {
            if (asyncStopLoading) setIsLoading(false);  // for signout - the button is not mounted anymore so no need to change the state
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
      style={{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0,
        shadowRadius: 10,
        borderRadius: 5,
        elevation: 6,
        backgroundColor: fillColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
        alignSelf: 'center',
        ...additionalStyle
      }}
    >
      {
        !isLoading
        ? <Text 
          style={[{
            textAlign:'center',
            color: textColor,
            fontSize: 16,
            fontWeight: 'bold',
            padding: 2
          },additionalTextStyle]}
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
