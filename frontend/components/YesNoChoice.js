import React, {useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import Colors from '../globals/Colors';

const YesNoChoice = ({category, units, Ycomment, Ncomment}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [YColor,setYColor] = useState(Colors.lightGray);
    const [NColor,setNColor] = useState('black');
    const [number, onChangeNumber] = React.useState(null);
    
    return (
        <View style={{marginLeft: 16, marginTop: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity
                    onPress={() => {
                        setIsSelected(true);
                        setYColor("black")
                        setNColor(Colors.lightGray)
                    }}
                    style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: YColor,
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
                            backgroundColor: YColor,
                            opacity: Number(isSelected)
                        }} >
                        </View>
                    }
                    
                </TouchableOpacity>
                <Text 
                    style={{
                        textAlign:'center',
                        color: YColor,
                        fontSize: 14,
                    }}
                >
                        {"Yes"}
                </Text>
                <Text 
                    style={{
                        marginLeft: 8,
                        textAlign:'center',
                        color: YColor,
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
                        color: YColor,
                        fontSize: 14,
                    }}
                >
                        {category}
                </Text>
                <TextInput
                    style={{height: 24,
                        margin: 12,
                        borderWidth: 1,
                        borderColor: YColor,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        color: YColor
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
                        color: YColor,
                        fontSize: 14
                    }}
                >
                        {units}
                </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity
                    onPress={() => {
                        setIsSelected(false);
                        setNColor("black")
                        setYColor(Colors.lightGray)
                    }}
                    style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: NColor,
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
                            backgroundColor: NColor,
                            opacity: Number(!isSelected)
                        }} >
                        </View>
                    }
                    
                </TouchableOpacity>
                <Text 
                    style={{
                        textAlign:'center',
                        color: NColor,
                        fontSize: 14,
                    }}
                >
                        {"No"}
                </Text>
                <Text 
                    style={{
                        marginLeft: 8,
                        textAlign:'center',
                        color: NColor,
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
