import React from 'react'
import { Text, View } from 'react-native'
import { RadioButton } from 'react-native-paper';
import PickerT from './PickerT';

import Colors from '../globals/Colors';

const ToggleText = ({text, isSelected, setIsSelected, startTime, setStartTime, endTime, setEndTime}) => {
    
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <RadioButton
                    status={ isSelected ? 'checked' : 'unchecked' }
                    color="black"
                    uncheckedColor={Colors.lightGray}
                    onPress= {() => setIsSelected(!isSelected)}
                />
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
