import React,{useState} from 'react';
import {StyleSheet,TextInput,View} from 'react-native';

import Colors from '../globals/Colors';

const Input = ({onSubmit,updateOriginalValue,placeholder,icon,isPassword=false,additionalStyle}) => {
    const [text,setText] = useState("");
    const [isActive,setIsActive] = useState(false);
   
    return (
        <View style={[styles.wrapper, additionalStyle, {borderColor: isActive ? Colors.lightGray : "black"}]}>
            <icon.component
                name={icon.name}
                size={20}
                color={isActive ? "white" : Colors.lightGray}
                style={{marginLeft: 8}}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                    setText(txt);
                    updateOriginalValue(txt)
                }}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={isActive ? "white" : Colors.lightGray}
                onFocus={() => {setIsActive(true)}}
                onBlur={() => {setIsActive(false)}}
                secureTextEntry={isPassword}
                autoCapitalize={"none"}
                autoCorrect={false}
                color={isActive ? "white" : Colors.lightGray}
                onSubmitEditing={onSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper:{
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        height: 45,
        width: 300,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    }
});

export default Input;