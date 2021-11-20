import React from 'react'
import { Text, TouchableOpacity, Image, ActivityIndicator, View } from 'react-native'

const LogoButton = ({logoConf,onClick, fillColor, text, textColor, isLoading=false}) => {    
    return (
        <TouchableOpacity
            onPress={onClick}
            style={{
              shadowColor: "#000000",
              shadowOffset: {
                  width: 0,
                  height: 4,
              },
              shadowOpacity: 0,
              shadowRadius: 10,
              borderRadius: 10,
              elevation: 10,
              backgroundColor: fillColor,
              alignItems: 'center',
              height: 50,
              width: 310,
              alignSelf: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'center'
            }}
        >
            {isLoading
                ?<ActivityIndicator
                    size={30}
                    color="black"
                />
                :<>
                    {
                    logoConf.isIcon  
                        ? (
                        <logoConf.iconComponent
                        name={logoConf.iconName}
                        size={logoConf.size}
                        color={logoConf.iconColor}
                        style={{marginRight: 30}}
                        />
                        )
                        : (<Image
                            style={{
                                height: logoConf.size,
                                width: logoConf.size,
                                marginRight: 30
                            }}
                            source={{uri: logoConf.imageLink}}
                        />)
                    }
                    <View style={{justifyContent: 'center', flex:1}}>
                        <Text 
                            style={{
                                textAlign:'center',
                                color: textColor,
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}
                        >
                                {text}
                        </Text>
                    </View>
                </>
            }
            
        </TouchableOpacity>
    )
}

export default LogoButton
