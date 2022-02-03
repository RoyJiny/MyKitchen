import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';

import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import moment from 'moment';

const PickerDate = ({date, setDate, textColor, isActive, inactiveDays = []}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0,0,0,0);
  // for inactiveDays - 0 is monday and 7 is sunday

  const [show, setShow] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  
  // And don't forget to disabled the "first" dates on init : 
  useEffect(() => {
    const dateInfo = date.split("/");
    getDisabledDays(
      Number(dateInfo[1]) - 1,
      Number(dateInfo[2]),
      inactiveDays
    );
  }, [date]);

  const transformStringDate = (date) => {
    const dateInfo = date.split("/");
    return dateInfo[2]+"-"+("0"+dateInfo[1]).slice(-2)+"-"+("0"+dateInfo[0]).slice(-2);
  };
  const transformDate = (date) => {
    return date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2);
  };

  const getDisabledDays = (month, year, daysIndexes) => {
    let pivot = moment().month(month).year(year).startOf('month');
    pivot.add(-7, 'days'); // fixes first week update bug
    const end = moment().month(month).year(year).endOf('month');
    end.add(7, 'days'); // fixes last week update bug
    let dates = {
      [transformStringDate(date)]: {
        selected: true,
        disableTouchEvent: false,
      }
    };
    const disabled = { disabled: true, disableTouchEvent: true };
    while (pivot.isBefore(end)) {
      daysIndexes.forEach((day) => {
        const copy = moment(pivot);
        dates[copy.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }
    setMarkedDates(dates);
    return dates;
  };

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(String(currentDate.day)+"/"+String(currentDate.month)+"/"+String(currentDate.year));
  };

  const showTimepicker = () => {
    const dateInfo = date.split("/");
    getDisabledDays(
      Number(dateInfo[1]) - 1,
      Number(dateInfo[2]),
      inactiveDays
    );
    setShow(isActive);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={showTimepicker}
        style={{
          borderRadius: 8,
          borderBottomColor: textColor,
          borderBottomWidth: 1,
          alignItems: 'center',
        }}
      >
        <Text style={{fontSize: 16, color: textColor,paddingHorizontal: 12}}>{date}</Text>
      </TouchableOpacity>

      {show && (
        <Modal isVisible={show} onBackdropPress={() => setShow(false)}>
          <Calendar
            current={transformStringDate(date)}
            minDate={transformDate(tomorrow)}
            markedDates={markedDates}
            onDayPress={onChange}
            onMonthChange={(date) => {getDisabledDays(date.month - 1, date.year, inactiveDays);}}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
          />
        </Modal>
      )}
    </View>
  );
};

export default PickerDate