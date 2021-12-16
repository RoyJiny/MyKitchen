import React, {useContext, useState, useEffect} from 'react';
import {View,StyleSheet,Text,Alert,Keyboard,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SellerContext } from "../../contexts/SellerContext";
import * as Animatable from 'react-native-animatable';

import {BackButton,Button2,BlankDivider,Dish} from '../../components';
import { send_post_request, send_get_request, upload_image } from '../../utils/requests';
import { ServerBase } from '../../globals/globals';

const EditMenuScreen = ({navigation}) => {

  const {seller, setSeller} = useContext(SellerContext);

  useEffect(() => {
    send_get_request("users/me/seller")
      .then(data => {setSeller(data);})
      .catch(err => {console.log(err);});
  },[]);

  const [dishItems, setDishItems] = useState(seller.kitchen.menu.map((item, index) => ({...item, key: index})));
  const [alerted, setAlerted] = useState(false);
  const [firstTime, setfirstTime] = useState(true);
  const [checkValid, setcheckValid] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i <= dishItems.length; i++) {
        let isIn = false;
        for (let j = 0; j < dishItems.length; j++) {
            if(dishItems[j].key==i){isIn=true}
        }
        if(!isIn) {setDishItems([{key: i, name: '', description: '', price: '', img: 'https://pixsector.com/cache/d69e58d4/avbfe351f753bcaa24ae2.png'}, ...dishItems]); break;}
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
    itemsCopy[index].img=url;
    setDishItems(itemsCopy)
  }

  const checkEmptyDish = () => {
    let item = {key: 0, name: '', description: '', price: '', img: 'https://pixsector.com/cache/d69e58d4/avbfe351f753bcaa24ae2.png'}
    let itemsCopy = [...dishItems];
    for (let i = 0; i < itemsCopy.length; i++) {
      item = itemsCopy[i]
      if(item.name == '' || item.price == ''){
        return false
      }
    }
    return true
  }

  const sendData = async () => {
    var menu_to_send = dishItems.map(dish => {
      if (dish.img.startsWith('file') || dish.img.startsWith('http')) {
        let {img, ...dish_copy} = dish;
        return dish_copy;
      }
      return dish
    });
    
    const {dish_ids} = await send_post_request("users/seller/edit/menu",{id: seller.kitchen._id, menu: menu_to_send});
      
    var upload_promises = dishItems.map(async (dish,idx) => {
      if (dish.img.startsWith('file') || dish.img.startsWith('http')) {
        await upload_image(dish.img, 'dishImg', seller.kitchen._id, dish_ids[idx]);
      }
    });
    await Promise.all(upload_promises);
  }

  return (
      <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: 16 }}>
          <BackButton onClick={navigation.goBack}/>
          <TouchableOpacity onPress={()=>{setfirstTime(false),setcheckValid(true)}}>
          <Button2
            onClick={sendData}
            asyncCB={() => {
              setSeller({...seller, ...{kitchen: {...seller.kitchen, menu: dishItems}}});
              navigation.navigate("MyKitchenInternal");
            }}
            fillColor = "white"
            text ="Done"
            textColor = "black"
            disable = { checkEmptyDish()==true && dishItems.length > 0 ? false : true }
          />
          </TouchableOpacity>
        </View>

        <BlankDivider height={16}/>
        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{fontSize: 20, marginLeft: 24}}>Let's Add Some Dishes</Text>
          <TouchableOpacity
            onPress={() => {handleAdd(),setcheckValid(false)}}
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
          { firstTime==true || dishItems.length > 0 ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.validation}>Please add dishes to your kitchen</Text>
            </Animatable.View>
          }
          { firstTime==true || checkValid==false || checkEmptyDish()==true ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.validation}>Please add name and price for each dish</Text>
            </Animatable.View>
          }
          <BlankDivider height={8}/>
          {
            dishItems.map((item, index) => {
              return (
                <Dish key={item.key}
                  deleteFunc= {() => deleteDish(index)} 
                  moveUp= {() => moveUp(index)} 
                  moveDown= {() => moveDown(index)} 
                  imgLink= {item.img.startsWith('file')||item.img.startsWith('https') ? item.img : `${ServerBase}/images/${item.img}`}
                  onChangeImage= {(url) => changeDishImage(index,url)}
                  name= {item.name}
                  onChangeName= {(text) => changeDishName(index,text)}
                  desc= {item.description}
                  onChangeDesc= {(text) => changeDishDesc(index,text)}
                  pricing= {String(item.price)}
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
  validation: {
    color: "red",
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 2,
  },
});

export default EditMenuScreen;