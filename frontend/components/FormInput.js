import React,{useState} from 'react';
import {TextInput} from 'react-native';

import Colors from '../globals/Colors';

const FormInput = ({textInit,placeholder,additionalStyle,setState,multi=false}) => {
    const [isActive,setIsActive] = useState(false);

    return (
        <TextInput
            style={{...{
                borderWidth: isActive ? 2 : 1,
                borderColor: "black",
                borderRadius: 20,
                marginTop: 15,
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 2,
                color: "black"
            },
            ...additionalStyle
            }}
            onChangeText={txt => {
                setState(txt);
            }}
            value={textInit}
            placeholder={placeholder}
            placeholderTextColor={Colors.lightGray}
            onFocus={() => {setIsActive(true)}}
            onBlur={() => {setIsActive(false)}}
            multiline={multi}
        />
    );
};

export default FormInput;