import React,{useState} from 'react';
import {TouchableOpacity} from 'react-native';
import * as Icons from '@expo/vector-icons'

const ExpantionArrow = ({onClick,isInitaialyExpanded}) => {
  const [isExpanded, setExpanded] = useState(isInitaialyExpanded);
  
  return (
    <TouchableOpacity onPress={() => {onClick(); setExpanded(!isExpanded)}}>
      {isExpanded
        ? <Icons.MaterialIcons name="expand-less" size={18} color='black'/>
        : <Icons.MaterialIcons name="expand-more" size={18} color='black'/>
      }
    </TouchableOpacity>
  );
};

export default ExpantionArrow