import React, {useState} from 'react';
import {View, TouchableOpacity, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PickerT = ({textColor, isActive, time, setTime}) => {
  const [date, setDate] = useState(new Date(2000,1,1,Number(time.slice(0,2)),Number(time.slice(3,5))));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTime(("0"+currentDate.getHours().toString()).slice(-2)+":"+("0"+currentDate.getMinutes().toString()).slice(-2));
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
          <Text style={{fontSize: 16, color: textColor}}>{time}</Text>
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