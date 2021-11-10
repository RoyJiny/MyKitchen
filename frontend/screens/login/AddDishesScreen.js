import React, {useState} from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import * as Icons from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../globals/Colors';

import Button from '../../components/Button';
import Button2 from '../../components/Button2';
import BlankDivider from '../../components/BlankDivider';
import Dish from '../../components/Dish';

const AddDishesScreen = ({navigation}) => {

  const [dishItems, setDishItems] = useState([]);

  const handleAdd = () => {
    for (let i = 0; i <= dishItems.length; i++) {
      if(!dishItems.includes(i)) {setDishItems([i, ...dishItems]); break;}
    }
  }

  const deleteDish = (index) => {
    let itemsCopy = [...dishItems];
    itemsCopy.splice(index, 1);
    setDishItems(itemsCopy)
  }

  return (
    <View style={{flex:1}}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={-180}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
        <Icon style={{marginLeft: 16, marginRight: 350}}
              name="angle-left"
              size={40}
              color="black"
              underlayColor="blue"
              onPress={() => navigation.navigate("KitchenBio")}>
        </Icon>

        <BlankDivider height={8}/>
        <Text style={{fontSize: 20, marginLeft: 24}}>Let's Add Some Dishes</Text>
        <BlankDivider height={8}/>

        <TouchableOpacity
            onPress={() => handleAdd()}
            style={{
                borderRadius: 24,
                borderColor: 'black',
                backgroundColor: 'white',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                width: 120,
                alignSelf: 'center'
            }}
        >
            {
              <Text style={{ textAlign:'center',color: 'black', fontSize: 20, }} >
                      {"Add +"}
              </Text>
            }
        </TouchableOpacity>
        <BlankDivider height={16}/>
        
        <ScrollView style={{maxHeight: Dimensions.get('window').height*0.7}} contentContainerStyle={{flexGrow: 1}}>
          {
            dishItems.map((item, index) => {
              return (
                <Dish key={item} deleteFunc= {() => deleteDish(index)} imgLink= "https://icon-library.com/images/upload-image-icon/upload-image-icon-15.jpg"/>
              )
            })
          }
        </ScrollView>

        <BlankDivider height={16}/>
        <Button2
          onClick={() => navigation.navigate("Logistics")} //here use global args from all forms
          fillColor = "white"
          text ="Next"
          textColor = "black"
        />
        </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </View>
    
  )
};

AddDishesScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default AddDishesScreen;