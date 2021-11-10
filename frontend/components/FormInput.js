import React,{useState} from 'react';
import {StyleSheet,TextInput,View} from 'react-native';

import Colors from '../globals/Colors';

const FormInput = ({onSubmit,updateOriginalValue,placeholder,isPassword=false,additionalStyle}) => {
    const [text,setText] = useState("");
    const [isActive,setIsActive] = useState(false);
   
    return (
        <View style={[styles.wrapper, additionalStyle, {borderWidth: isActive ? 2 : 1}]}>
            <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                    setText(txt);
                    updateOriginalValue(txt)
                }}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={Colors.lightGray}
                onFocus={() => {setIsActive(true)}}
                onBlur={() => {setIsActive(false)}}
                secureTextEntry={isPassword}
                autoCapitalize={"none"}
                autoCorrect={false}
                color={"black"}
                onSubmitEditing={onSubmit} // maybe not needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper:{
        borderRadius: 20,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        height: 32,
        width: 272,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    }
});

export default FormInput;