import React, {useState} from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import PickerT from './PickerT';

import Colors from '../globals/Colors';

const ToggleText = ({text, stateInit, startHour, startMin, endHour, endMin}) => {
    const [isSelected, setIsSelected] = useState(stateInit==true);
    const [bordColor,setBordColor] = useState(stateInit ? "black" : Colors.lightGray);
    
    
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity
                    onPress={() => {
                        setIsSelected(!isSelected);
                        isSelected ? setBordColor(Colors.lightGray) : setBordColor("black")
                    }}
                    style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: bordColor,
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
                            backgroundColor: bordColor,
                            opacity: Number(isSelected)
                        }} >
                        </View>
                    }
                    
                </TouchableOpacity>
                <Text 
                    style={{
                        textAlign:'center',
                        color: bordColor,
                        fontSize: 14,
                    }}
                >
                        {text}
                </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PickerT hourDef= {startHour} minuteDef= {startMin} textColor={bordColor} isActive={isSelected}/>
                <Text 
                    style={{
                        textAlign:'center',
                        color: bordColor,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginHorizontal: 5
                    }}
                >
                        {"-"}
                </Text>
                <PickerT hourDef= {endHour} minuteDef= {endMin} textColor={bordColor} isActive={isSelected}/>
            </View>
        </View>
        
        
    )
}

export default ToggleText
