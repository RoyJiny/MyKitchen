import React,{useState} from 'react';
import {StyleSheet,TextInput,View} from 'react-native';

import Colors from '../globals/Colors';

const MultilineInput = ({onSubmit,updateOriginalValue}) => {
  const [text,setText] = useState("");
  
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.textInput}
        onChangeText={txt => {
          setText(txt);
          updateOriginalValue(txt)
        }}
        value={text}
        autoCapitalize={"none"}
        autoCorrect={true}
        color={Colors.lightGray}
        onSubmitEditing={onSubmit}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:{
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 8,
    borderColor: Colors.lightGray
  },
  textInput: {
    height: 80,
    width: 300,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: 'top'
  }
});

export default MultilineInput;