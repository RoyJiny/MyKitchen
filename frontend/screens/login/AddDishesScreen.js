import React, {useState} from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,TouchableOpacity, ScrollView, Dimensions} from 'react-native';

import BackButton from '../../components/BackButton';
import Button2 from '../../components/Button2';
import BlankDivider from '../../components/BlankDivider';
import Dish from '../../components/Dish';

const AddDishesScreen = ({navigation}) => {

  const [dishItems, setDishItems] = useState([]);

  const handleAdd = () => {
    for (let i = 0; i <= dishItems.length; i++) {
        let isIn = false;
        for (let j = 0; j < dishItems.length; j++) {
            if(dishItems[j].key==i){isIn=true}
        }
        if(!isIn) {setDishItems([{key: i, name: '', description: '', price: '', imgLink: 'https://pixsector.com/cache/d69e58d4/avbfe351f753bcaa24ae2.png'}, ...dishItems]); break;}
    }
  }

  const deleteDish = (index) => {
    let itemsCopy = [...dishItems];
    itemsCopy.splice(index, 1);
    setDishItems(itemsCopy)
  }

  const moveUp = (index) => {
    let itemsCopy = [...dishItems];
    if(!(index==0)) {[itemsCopy[index], itemsCopy[index-1]] = [itemsCopy[index-1], itemsCopy[index]];}
    setDishItems(itemsCopy)
  }

  const moveDown = (index) => {
    let itemsCopy = [...dishItems];
    if(!(index==dishItems.length-1)) {[itemsCopy[index], itemsCopy[index+1]] = [itemsCopy[index+1], itemsCopy[index]];}
    setDishItems(itemsCopy)
  }

  return (
    <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={-180}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
        <View style={{ flexDirection:'row'}}>
          <BackButton onClick={navigation.goBack}/>
        </View>

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
                <Dish key={item.key}
                  isRegistration= {true}
                  deleteFunc= {() => deleteDish(index)} 
                  moveUp= {() => moveUp(index)} 
                  moveDown= {() => moveDown(index)} 
                  imgLink= "https://pixsector.com/cache/d69e58d4/avbfe351f753bcaa24ae2.png"
                  dishName= {item.name}
                  description= {item.description}
                  price= {item.price}
                />
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
        <BlankDivider height={16}/>
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