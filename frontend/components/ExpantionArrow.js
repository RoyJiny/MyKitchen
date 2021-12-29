import React,{useState} from 'react';
import {TouchableOpacity,Text} from 'react-native';
import * as Icons from '@expo/vector-icons'

const ExpantionArrow = ({onClick,isInitaialyExpanded,text='',fontSize=16}) => {
  const [isExpanded, setExpanded] = useState(isInitaialyExpanded);
  
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
      onPress={() => {onClick(); setExpanded(!isExpanded)}}
    >
      <Text style={{fontSize: fontSize,fontWeight: 'bold',marginLeft: 16}}>{text}</Text>
      {isExpanded
        ? <Icons.MaterialIcons name="expand-less" size={18} color='black'/>
        : <Icons.MaterialIcons name="expand-more" size={18} color='black'/>
      }
    </TouchableOpacity>
  );
};

export default ExpantionArrow