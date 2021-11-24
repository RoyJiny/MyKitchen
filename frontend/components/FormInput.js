import React,{useState} from 'react';
import {StyleSheet,TextInput,View} from 'react-native';

import Colors from '../globals/Colors';

const FormInput = ({textInit,placeholder,additionalStyle,setState}) => {
    const [isActive,setIsActive] = useState(false);
   
    return (
        <View style={[styles.wrapper, additionalStyle, {borderWidth: isActive ? 2 : 1}]}>
            <TextInput
                style={styles.textInput}
                onChangeText={txt => {
                    setState(txt);
                }}
                value={textInit}
                placeholder={placeholder}
                placeholderTextColor={Colors.lightGray}
                onFocus={() => {setIsActive(true)}}
                onBlur={() => {setIsActive(false)}}
                autoCorrect={false}
                color={"black"}
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