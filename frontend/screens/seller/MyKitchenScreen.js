import React,{useContext} from 'react';
import {View,StyleSheet,Dimensions} from 'react-native'
import {MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
import { SellerContext } from "../../contexts/SellerContext";

import { deleteAuthToken } from '../../api/async_storage';

import {Backdrop,KitchenCard,Button} from '../../components';
 
const MyKitchenScreen = ({navigation,signoutCB}) => {
  const {seller, setSeller} = useContext(SellerContext);
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
              onClick={() => navigation.navigate("KitchenPreview")}
              logo = {<MaterialCommunityIcons name="chef-hat" size={logoSize} color="black" />}
              description="Kitchen Preview"
            />
          </View>
        </View>

        <Button
          onClick={signoutCB}
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