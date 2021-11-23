import React, {useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import Colors from '../globals/Colors';

const YesNoChoice = ({category, units, Ycomment, Ncomment, number, onChangeNumber, isSelected, setIsSelected}) => {
    
    return (
        <View style={{marginLeft: 16, marginTop: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity
                    onPress={() => {
                        setIsSelected(true);
                    }}
                    style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: isSelected ? "black" : Colors.lightGray,
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                    }}
                >
                    {
                        <View
                            style={{
                            height: 10,
                            width: 10,
                            borderRadius: 10,
                            backgroundColor: isSelected ? "black" : Colors.lightGray,
                            opacity: isSelected ? 1 : 0
                        }} >
                        </View>
                    }
                    
                </TouchableOpacity>
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
                        marginLeft: 32,
                        textAlign:'center',
                        color: isSelected ? "black" : Colors.lightGray,
                        fontSize: 14,
                    }}
                >
                        {category}
                </Text>
                <TextInput
                    style={{height: 24,
                        margin: 12,
                        borderWidth: 1,
                        borderColor: isSelected ? "black" : Colors.lightGray,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        color: isSelected ? "black" : Colors.lightGray
                    }}
                    editable={isSelected}
                    onChangeText={onChangeNumber}
                    value={number}
                    keyboardType="numeric"
                />
                <Text 
                    style={{
                        marginLeft: 2,
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
                <TouchableOpacity
                    onPress={() => {
                        setIsSelected(false);
                    }}
                    style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: isSelected ? Colors.lightGray : "black",
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                    }}
                >
                    {
                        <View
                            style={{
                            height: 10,
                            width: 10,
                            borderRadius: 10,
                            backgroundColor: isSelected ? Colors.lightGray : "black",
                            opacity: Number(!isSelected)
                        }} >
                        </View>
                    }
                    
                </TouchableOpacity>
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
