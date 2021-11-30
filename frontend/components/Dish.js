import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TextInput, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImChange from './ImChange';

const Dish = ({name, onChangeName, pricing, onChangePricing, desc, onChangeDesc, imgLink, onChangeImage, deleteFunc, moveUp, moveDown}) => {
    
    return (
        
        <View
            style={{
                width: 340,
                borderRadius: 16,
                borderColor: 'black',
                backgroundColor: 'white',
                marginBottom: 16,
                marginHorizontal: 16,
                alignSelf: 'center',
                justifyContent: 'space-between',
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 10,
                    }}
        >
            <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
            {
                <>
                <View  style={{flexDirection:'row'}}>
                    <ImChange isActive={true} image={imgLink} setImage={onChangeImage}/>
                    <View style={{}}>
                        <TextInput 
                            style={{
                                color: 'black', 
                                fontSize: 16,
                                width: 180,
                                borderWidth: 1,
                                borderColor: 'transparent'
                            }}
                            autoFocus={true}
                            placeholder="Dish Name"
                            onChangeText={onChangeName}
                            value= {name}
                        />
                         
                        <View  style={{flexDirection:'row', alignItems: 'center', paddingTop: 8}}>

                        <Text>₪ </Text>{/*pricing == '' ? null : <Text>₪ </Text>*/}

                            <TextInput 
                                style={{ 
                                    color: 'black', 
                                    fontSize: 14, 
                                    height: 24,
                                    width: 80,
                                    borderWidth: 1,
                                    borderColor: 'transparent'
                                }}
                                onChangeText={onChangePricing}
                                value={pricing}
                                keyboardType="numeric"
                                placeholder="price"
                            />
                        </View>
                    </View>
                </View>
                <View style={{paddingVertical: 16, marginRight: 16, marginLeft: 20}}>
                    <Icon style={{}}
                        name="trash-o"
                        size={15}
                        color="darkred"
                        underlayColor="blue"
                        onPress={deleteFunc}>
                    </Icon>
                </View>
                
                </>
            }
            </View>
            <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
                <>
                <TextInput 
                    style={{
                        color: 'black', 
                        fontSize: 16,
                        height: 72,
                        width: 294,
                        padding: 8,
                        textAlignVertical: 'top'
                    }}
                    multiline={true}
                    placeholder="Desciption"
                    onChangeText={onChangeDesc}
                    value= {desc}
                />
                <View style={{justifyContent: 'space-around', paddingVertical: 16, marginRight: 16}}>
                    <Icon style={{}}
                        name="angle-up"
                        size={20}
                        color="black"
                        underlayColor="blue"
                        onPress={moveUp}>
                    </Icon>
                    <Icon style={{}}
                        name="angle-down"
                        size={20}
                        color="black"
                        underlayColor="blue"
                        onPress={moveDown}>
                    </Icon>
                </View>
                </>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    validate: {
        color: "red",
        textAlign: 'left',
        fontSize: 12,
        fontWeight: 'bold',
    },
    image: {
        height: 84,
        width: 84,
        borderRadius: 16,
        borderColor: 'black',
        borderWidth: 0.5,
        marginRight: 16
    }
});

export default Dish
