import React, {useState} from 'react';
import {View, TouchableOpacity, Platform, Text, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PickerDate = ({date, setDate, textColor, isActive}) => {
    const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showTimepicker = () => {
    setShow(isActive);
  };

  return (
    <View>
      <TouchableOpacity
          onPress={showTimepicker}
          style={{
            paddingHorizontal: 4,
            borderRadius: 8,
            borderColor: textColor,
            borderWidth: 1,
            width: Dimensions.get('window').width*0.3,
            alignItems: 'center'
          }}
        >
          <Text style={{fontSize: 16, color: textColor}}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
        </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          display="default"
          onChange={onChange}
          minimumDate = {new Date()}
        />
      )}
    </View>
  );
};

export default PickerDate