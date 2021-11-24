import React,{useState} from 'react';
import {StyleSheet,TextInput,View} from 'react-native';

import Colors from '../globals/Colors';

const FormInput = ({textInit,placeholder,additionalStyle,setState,multi=false}) => {
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
                multiline={multi}
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
         // remove? todo
        width: 256,
        paddingVertical: 2,
        paddingHorizontal: 10,
        fontSize: 16,
    }
});

export default FormInput;