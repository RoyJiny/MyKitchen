import React, {useState} from 'react';
import {View, TouchableOpacity, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PickerT = ({hourDef, minuteDef, textColor, isActive}) => {
  const [date, setDate] = useState(new Date(2000,1,1,hourDef,minuteDef));
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
            width: 64,
            alignItems: 'center'
          }}
        >
          <Text style={{fontSize: 16, color: textColor}}>{("0" + date.getHours()).slice(-2)}:{("0" + date.getMinutes()).slice(-2)}</Text>
        </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default PickerT