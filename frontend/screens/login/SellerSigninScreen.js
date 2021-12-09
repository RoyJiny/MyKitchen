import React,{useState, useContext} from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';
import { SellerContext } from "../../contexts/SellerContext";

import {signin} from '../../api/google_signin';

import {BackButton,LogoButton,BlankDivider} from '../../components';

const SellerSigninScreen = ({navigation}) => {
  const {seller, setSeller} = useContext(SellerContext);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  return (
    <View style={{flex:1, paddingTop: 16, marginHorizontal: 8}}>
        <View style={{ flexDirection:'row'}}>
          <BackButton onClick={navigation.goBack}/>
        </View>

        <BlankDivider height={32}/>

        <Text style={{fontSize: 20, marginLeft: 24}}>First, Let's Create A User</Text>

        <BlankDivider height={32}/>

        <LogoButton
          isLoading={isLoadingGoogle}
          logoConf={{
            isIcon: false,
            imageLink:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
            size: 20            
          }}
          onClick={() => {
            setIsLoadingGoogle(true);
            signin(
              () => {setIsLoadingGoogle(false);navigation.navigate("KitchenBio");},
              () => setIsLoadingGoogle(false),
              true,
              (newData) => setSeller({...seller, user: {...seller.user, ...newData}})
            );
          }}
          borderColor='black'
          fillColor='white'
          text='Sign in with Google'
          textColor='black'
        />

    </View>
  )
};

SellerSigninScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

  })

export default SellerSigninScreen;