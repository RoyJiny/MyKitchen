import React, {useContext, useState} from 'react';
import {View,StyleSheet,Text,Alert,Keyboard,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { UserContext } from "../../contexts/UserContext";

import {BackButton,Button2,BlankDivider,Dish} from '../../components';

const EditMenuScreen = ({navigation}) => {
  const {user, setUser} = useContext(UserContext);
  const [dishItems, setDishItems] = useState(user.kitchen.menu);
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

  const changeDishName = (index,text) => {
    let itemsCopy = [...dishItems];
    itemsCopy[index].name=text;
    setDishItems(itemsCopy)
  }

  const changeDishDesc = (index,text) => {
    let itemsCopy = [...dishItems];
    itemsCopy[index].description=text;
    setDishItems(itemsCopy)
  }

  const changeDishPrice = (index,text) => {
    let itemsCopy = [...dishItems];
    itemsCopy[index].price=text;
    setDishItems(itemsCopy)
  }

  const changeDishImage = (index,url) => {
    let itemsCopy = [...dishItems];
    itemsCopy[index].imgLink=url;
    setDishItems(itemsCopy)
  }

  return (
      <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: 16 }}>
          <BackButton onClick={navigation.goBack}/>
          <Button2
            onClick={() => {setUser({...user, ...{kitchen: {...user.kitchen, menu: dishItems}}});navigation.navigate("MyKitchenInternal");}} //here use global args from all forms
            fillColor = "white"
            text ="Done"
            textColor = "black"
          />
        </View>

        <BlankDivider height={16}/>
        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{fontSize: 20, marginLeft: 24}}>Let's Add Some Dishes</Text>
          <TouchableOpacity
            onPress={() => handleAdd()}
            style={{
                borderRadius: 24,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                width: 40,
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
                <Text style={{ textAlign:'center',color: (dishItems.length >= 20) ? 'gray' : '#7CC0FA', fontSize: 24}} >
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
                  imgLink= {item.imgLink}
                  onChangeImage= {(url) => changeDishImage(index,url)}
                  name= {item.name}
                  onChangeName= {(text) => changeDishName(index,text)}
                  desc= {item.description}
                  onChangeDesc= {(text) => changeDishDesc(index,text)}
                  pricing= {item.price}
                  onChangePricing= {(text) => changeDishPrice(index,text)}
                />
            )
            })
          }

        <BlankDivider height={16}/>
        </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
};

EditMenuScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default EditMenuScreen;