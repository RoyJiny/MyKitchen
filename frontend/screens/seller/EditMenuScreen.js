import React, {useState} from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,TouchableOpacity, ScrollView} from 'react-native';

import BackButton from '../../components/BackButton';
import Button2 from '../../components/Button2';
import BlankDivider from '../../components/BlankDivider';
import Dish from '../../components/Dish';

const EditMenuScreen = ({navigation}) => {

  const [dishItems, setDishItems] = useState([{key: 0, name: 'Chocolate Cake', description: 'Made with love and chcolate!', price: '60', imgLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPVgeegVDlt8YwrzQDHsno8GY0cQ4LV0eMQ&usqp=CAU'}]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setIsAdded(true)
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
    <View style={{flex:1}}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={-180}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
            <BackButton onClick={navigation.goBack}/>
            <Button2
              onClick={() => navigation.navigate("MyKitchenInternal")}
              borderColor = "black"
              fillColor = "white"
              text ="Done"
              textColor = "black"
            />
          </View>

        <BlankDivider height={8}/>
        <Text style={{fontSize: 20, marginLeft: 24}}>Edit Your Kitchen's Menu</Text>
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
        
        {
        dishItems.map((item, index) => {
            return (
            <Dish key={item.key}
                isRegistration= {index==0? isAdded:false}
                deleteFunc= {() => deleteDish(index)} 
                moveUp= {() => moveUp(index)} 
                moveDown= {() => moveDown(index)} 
                imgLink= {item.imgLink}
                dishName= {item.name}
                description= {item.description}
                price= {item.price}
            />
            )
        })
        }

        </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </View>
    
  )
};

EditMenuScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default EditMenuScreen;