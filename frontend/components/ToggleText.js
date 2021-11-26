import React, {useState} from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import PickerT from './PickerT';

import Colors from '../globals/Colors';

const ToggleText = ({text, isSelected, setIsSelected, startTime, setStartTime, endTime, setEndTime}) => {
    
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity
                    onPress={() => {
                        setIsSelected(!isSelected);
                    }}
                    style={{
                        height: 18,
                        width: 18,
                        borderRadius: 18,
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
                            height: 13,
                            width: 13,
                            borderRadius: 13,
                            backgroundColor: isSelected ? "black" : 'transparent',
                            opacity: isSelected ? 1 : 0
                        }} >
                        </View>
                    }
                    
                </TouchableOpacity>
                <Text 
                    style={{
                        textAlign:'center',
                        color: isSelected ? "black" : Colors.lightGray,
                        fontSize: 16,
                    }}
                >
                        {text}
                </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <PickerT textColor={isSelected ? "black" : Colors.lightGray} isActive={isSelected} time={startTime} setTime={setStartTime}/>
                <Text 
                    style={{
                        textAlign:'center',
                        color: isSelected ? "black" : Colors.lightGray,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginHorizontal: 5
                    }}
                >
                        {"-"}
                </Text>
                <PickerT textColor={isSelected ? "black" : Colors.lightGray} isActive={isSelected} time={endTime} setTime={setEndTime}/>
            </View>
        </View>
        
        
    )
}

export default ToggleText
