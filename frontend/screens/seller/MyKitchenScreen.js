import React,{useContext,useEffect,useState} from 'react';
import {View,StyleSheet,Dimensions,Text} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import {MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
import { SellerContext } from "../../contexts/SellerContext";

import { send_get_request,send_post_request } from '../../utils/requests';

import {Backdrop,KitchenCard,Button} from '../../components';
 
const MyKitchenScreen = ({navigation,signoutCB}) => {
  const [isTemporarilyClose, setIsTemporarilyClose] = useState(false);
  const {seller, setSeller} = useContext(SellerContext);

  useEffect(() => {
    send_get_request("users/me/seller")
      .then(data => {
        setSeller(data);
        setIsTemporarilyClose(data.kitchen.isTemporarilyClose)
      })
      .catch(err => {console.log(err);});
  },[]);

  const changeTemporarilyClose = (val) => {
    setIsTemporarilyClose(val);
    send_post_request('users/seller/edit/set_temp_close',{close: val, id: seller.kitchen._id})
      .then(() => {})
      .catch(err => console.log(err));
  };

  const widthPhone = Dimensions.get('window').width
  const tableSpaces = widthPhone*0.03
  const logoSize = widthPhone*0.2
  return (
    <View style={{flex:1}}>
      <Backdrop text='My Kitchen' height={80}/>
      <View style={{justifyContent: 'space-between', flex:0.95}}>
        <View style={{alignItems:"center", marginTop: widthPhone*0.1}}>
          <View style={{flexDirection:"row", justifyContent:"space-evenly", marginBottom:tableSpaces}}>
            <KitchenCard
              onClick={() => navigation.navigate("EditMenu")}
              logo = {<MaterialIcons name="restaurant-menu" size={logoSize} color="black" />}
              description="Edit Menu"
            />
            <View style={{marginRight:tableSpaces}}></View>
            <KitchenCard
              onClick={() => navigation.navigate("EditBio")}
              logo = {<Ionicons name="information-circle-sharp" size={logoSize} color="black" />}
              description="Edit Bio"
            />
          </View>
          <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
            <KitchenCard
              onClick={() => navigation.navigate("EditLogistics")}
              logo = {<FontAwesome5 name="user-clock" size={logoSize} color="black" />}
              description="Edit Logistics"
            />
            <View style={{marginRight:tableSpaces}}></View>
            <KitchenCard
              onClick={() => navigation.navigate("KitchenPreview",{seller})}
              logo = {<MaterialCommunityIcons name="chef-hat" size={logoSize} color="black" />}
              description="Kitchen Preview"
            />
          </View>
          <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center', marginTop: 24}}>
              <Text style={{fontSize: 16}}>Temporarily Close: </Text>
              <ToggleSwitch style={{marginRight: 16}}
                isOn={isTemporarilyClose}
                onColor='#7CC0FA'
                offColor="lightgray"
                size="small"
                onToggle={(isOn) => changeTemporarilyClose(isOn)}
              />
            </View>
        </View>

        <Button
          onClick={signoutCB}
          treatAsAsync={true}
          asyncStopLoading={false}
          text="Sign Out"
          fillColor="white"
          textColor="black"
          height={40}
          width={150}
        />
      </View>
    </View>
  )
};

MyKitchenScreen.navigationOptions = (props) => {
  return {};  
};

const styles = StyleSheet.create({

});

export default MyKitchenScreen;