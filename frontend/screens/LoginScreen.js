import React from 'react'
import {View,StyleSheet} from 'react-native'

import LogoButton from '../components/LogoButton';
import Backdrop from '../components/Backdrop';
import BlankDivider from '../components/BlankDivider';

const LoginScreen = ({navigation, loginCB}) => {
    return (
        <View style={{flex:1}}>
            <Backdrop text='Google App' height={120}/>
            <View style={{flex:1, alignSelf: 'stretch', justifyContent: 'center'}}>
                <LogoButton
                    imageLink='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
                    onClick={loginCB}
                    borderColor='black'
                    fillColor='white'
                    text='Sign in with Google'
                    textColor='black'
                />
                <BlankDivider height={35}/>
                <LogoButton
                    imageLink='data:image/png;base64,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'
                    onClick={async () => {
                        function sleep(ms) {
                            return new Promise(resolve => setTimeout(resolve, ms));
                        }
                        await sleep(1000)
                        console.log('button2 pressed');
                    }}
                    borderColor='black'
                    fillColor='white'
                    text='Create a Seller Account'
                    textColor='black'
                />
            </View>
        </View>
    )
};

LoginScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default LoginScreen;