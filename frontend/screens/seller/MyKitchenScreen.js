import React from 'react'
import {View,StyleSheet,Dimensions} from 'react-native'
import {MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

import Backdrop from '../../components/Backdrop';
import KitchenCard from '../../components/KitchenCard';

const MyKitchenScreen = ({navigation}) => {
    const widthPhone = Dimensions.get('window').width
    const tableSpaces = widthPhone*0.03
    const logoSize = widthPhone*0.2
    return (
        <View style={{flex:1}}>
            <Backdrop text='My Kitchen' height={80}/>
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
        </View>
    )
};

MyKitchenScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default MyKitchenScreen;