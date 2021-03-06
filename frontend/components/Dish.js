import React from 'react'
import { View, StyleSheet, TextInput, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Icons from '@expo/vector-icons'
import ImChange from './ImChange';

import Colors from '../globals/Colors';

const Dish = ({name, onChangeName, pricing, onChangePricing, desc, onChangeDesc, imgLink, onChangeImage, deleteFunc, moveUp, moveDown, setAllergy, allergy}) => {
  
  return (
    <View
      style={{
        width: 340,
        borderRadius: 16,
        borderColor: 'black',
        backgroundColor: 'white',
        marginBottom: 16,
        marginHorizontal: 16,
        alignSelf: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
      }}
    >
      <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
      
      <View  style={{flexDirection:'row'}}>
        <ImChange isActive={true} image={imgLink} setImage={onChangeImage}/>
        
        <View style={{ marginLeft: 8 }}>
          <TextInput 
            style={{
              color: 'black', 
              fontSize: 16,
              width: 180,
              borderWidth: 1,
              borderColor: 'transparent'
            }}
            autoFocus={true}
            placeholder="Dish Name"
            onChangeText={onChangeName}
            value= {name}
            maxLength={20}
          />          
          <View  style={{flexDirection:'row', alignItems: 'center', paddingTop: 8}}>
            <Text>₪ </Text>
            <TextInput 
              style={{ 
                color: 'black', 
                fontSize: 14, 
                height: 24,
                width: 80,
                borderWidth: 1,
                borderColor: 'transparent'
              }}
              onChangeText={onChangePricing}
              value={pricing}
              keyboardType="numeric"
              placeholder="price"
              maxLength={10}
            />
          </View>
        </View>

      </View>
      <View style={{marginRight: 16, marginTop: 12, alignItems: 'center'}}>
        <Icon style={{marginBottom: 8}}
          name="trash-o"
          size={15}
          color="darkred"
          underlayColor="blue"
          onPress={deleteFunc}>
        </Icon>
        <Icon style={{}}
          name="angle-up"
          size={20}
          color="black"
          underlayColor="blue"
          onPress={moveUp}>
        </Icon>
        <Icon style={{}}
          name="angle-down"
          size={20}
          color="black"
          underlayColor="blue"
          onPress={moveDown}>
        </Icon>
      </View>        
        
      </View>
      <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
        <TextInput 
          style={{
            color: 'black', 
            fontSize: 16,
            height: 72,
            width: 294,
            padding: 8,
            textAlignVertical: 'top'
          }}
          multiline={true}
          placeholder="Desciption"
          onChangeText={onChangeDesc}
          value= {desc}
          maxLength={100}
        />
      </View>
      
      <View style={{ flexDirection:'row', justifyContent: 'space-between', marginBottom: 4, alignSelf: 'center' }}>
        <Icons.MaterialCommunityIcons
          color={allergy.gluten ? Colors.black : "#E2E2E2"}
          size={20}
          name="bread-slice-outline"
          style={{marginHorizontal: 8, padding: 2}}
          onPress={() => {setAllergy("gluten", !allergy.gluten)}}
        />
        <Icons.MaterialCommunityIcons
          color={allergy.dairy ? Colors.black : "#E2E2E2"}
          size={20}
          name="baby-bottle-outline"
          style={{marginHorizontal: 8, padding: 2}}
          onPress={() => {setAllergy("dairy", !allergy.dairy)}}
        />
        <Icons.MaterialCommunityIcons
          color={allergy.nuts ? Colors.black : "#E2E2E2"}
          size={20}
          name="peanut-outline"
          style={{marginHorizontal: 8, padding: 2}}
          onPress={() => {setAllergy("nuts", !allergy.nuts)}}
        />
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
});

export default Dish
