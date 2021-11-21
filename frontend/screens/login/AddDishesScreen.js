import React, {useState} from 'react';
import {View,StyleSheet,Text,Alert,Keyboard,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BackButton from '../../components/BackButton';
import Button2 from '../../components/Button2';
import BlankDivider from '../../components/BlankDivider';
import Dish from '../../components/Dish';

const AddDishesScreen = ({navigation}) => {

  const [dishItems, setDishItems] = useState([]);
  const [alerted, setAlerted] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i <= dishItems.length; i++) {
        let isIn = false;
        for (let j = 0; j < dishItems.length; j++) {
            if(dishItems[j].key==i){isIn=true}
        }
        if(!isIn) {setDishItems([{key: i, name: '', description: '', price: '', imgLink: 'https://pixsector.com/cache/d69e58d4/avbfe351f753bcaa24ae2.png'}, ...dishItems]); break;}
    }
    if(dishItems.length >= 19 && !alerted) { Alert.alert(`Max amount of dishes reached, please delete older ones to add`); setAlerted(true);}
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
      <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
        <View style={{ flexDirection:'row'}}>
          <BackButton onClick={navigation.goBack}/>
        </View>

        <BlankDivider height={16}/>
        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{fontSize: 20, marginLeft: 24}}>Let's Add Some Dishes</Text>
          <TouchableOpacity
            onPress={() => handleAdd()}
            style={{
                borderRadius: 24,
                borderColor: (dishItems.length >= 20) ? 'black' : 'black',
                backgroundColor: (dishItems.length >= 20) ? 'lightgrey' : 'lightgreen',
                borderWidth: 0,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                width: (dishItems.length >= 20) ? 40 : 40,
                alignSelf: 'center',
                marginRight: 24,
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 10,
            }}
            disabled={dishItems.length >= 20}
          >
              {
                <Text style={{ textAlign:'center',color: 'black', fontSize: 24}} >
                  {'+'}
                </Text>
              }
          </TouchableOpacity>
        </View>
        <BlankDivider height={16}/>

          {
            dishItems.map((item, index) => {
              return (
                <Dish key={item.key}
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


        <BlankDivider height={16}/>
        <Button2
          onClick={() => navigation.navigate("Logistics")} //here use global args from all forms
          fillColor = "white"
          text ="Next"
          textColor = "black"
        />
        <BlankDivider height={32}/>
        </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
};

AddDishesScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default AddDishesScreen;