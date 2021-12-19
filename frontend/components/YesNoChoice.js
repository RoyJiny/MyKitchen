import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { RadioButton } from 'react-native-paper';

import Colors from '../globals/Colors';

const YesNoChoice = ({category, units, Ycomment, Ncomment, number, onChangeNumber, isSelected, setIsSelected}) => {
    
    return (
        <View style={{marginLeft: 16, marginTop: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <RadioButton
                    status={ isSelected ? 'checked' : 'unchecked' }
                    color="black"
                    uncheckedColor={Colors.lightGray}
                    onPress= {() => setIsSelected(true)}
                />
                <Text 
                    style={{
                        textAlign:'center',
                        color: isSelected ? "black" : Colors.lightGray,
                        fontSize: 14,
                    }}
                >
                        {"Yes"}
                </Text>
                <Text 
                    style={{
                        marginLeft: 8,
                        textAlign:'center',
                        color: isSelected ? "black" : Colors.lightGray,
                        fontSize: 14,
                    }}
                >
                        {Ycomment}
                </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Text 
                    style={{
                        marginLeft: 16,
                        textAlign:'center',
                        color: isSelected ? "black" : Colors.lightGray,
                        fontSize: 14,
                    }}
                >
                        {category}
                </Text>
                <TextInput
                    style={{height: 24,
                        width: 42,
                        margin: 8,
                        borderWidth: 1,
                        borderColor: isSelected ? "black" : Colors.lightGray,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        color: isSelected ? "black" : Colors.lightGray
                    }}
                    editable={isSelected}
                    onChangeText={onChangeNumber}
                    value={number}
                    keyboardType="numeric"
                />
                <Text 
                    style={{
                        textAlign:'center',
                        color: isSelected ? "black" : Colors.lightGray,
                        fontSize: 14
                    }}
                >
                        {units}
                </Text>
            </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <RadioButton
                    status={ !isSelected ? 'checked' : 'unchecked' }
                    color="black"
                    uncheckedColor={Colors.lightGray}
                    onPress= {() => setIsSelected(false)}
                />
                <Text 
                    style={{
                        textAlign:'center',
                        color: isSelected ? Colors.lightGray : "black",
                        fontSize: 14,
                    }}
                >
                        {"No"}
                </Text>
                <Text 
                    style={{
                        marginLeft: 8,
                        textAlign:'center',
                        color: isSelected ? Colors.lightGray : "black",
                        fontSize: 14,
                    }}
                >
                        {Ncomment}
                </Text>
            </View>
        </View>
        
        
    )
}

export default YesNoChoice
