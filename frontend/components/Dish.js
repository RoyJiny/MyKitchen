import React, {useState} from 'react'
import { View, StyleSheet, TextInput, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import ImChange from './ImChange';

const Dish = ({text, price, imgLink, deleteFunc}) => {
    const [inEdit, setInEdit] = useState(true);
    const [name, onChangeName] = useState(text);
    const [desc, onChangeDesc] = useState("");
    const [pricing, onChangePricing] = useState(price);
    const [selectedSym, setSelectedSym] = useState();
    
    return (
        <View
            style={{
                width: 340,
                borderRadius: 16,
                borderColor: 'black',
                backgroundColor: 'white',
                borderWidth: 1,
                marginBottom: 16,
                marginHorizontal: 16,
                alignSelf: 'center',
                justifyContent: 'space-between'
            }}
        >
            <View style={{ flexDirection:'row'}}>
            {
                <>
                <View  style={{flexDirection:'row'}}>
                    <ImChange isActive={inEdit} imLink={imgLink}/>
                    <View style={{}}>
                        <TextInput 
                            style={{
                                color: 'black', 
                                fontSize: 16,
                                width: 180,
                                borderWidth: 1,
                                borderColor: 'transparent',
                                borderBottomColor: inEdit ? 'black' : 'transparent', 
                            }}
                            autoFocus={true}
                            placeholder="Dish Name"
                            editable={inEdit}
                            onChangeText={onChangeName}
                            value= {name}
                        />
                         
                        <View  style={{flexDirection:'row', alignItems: 'center'}}>
                            {/*<Picker
                                style={{ height:10, width: 75, borderWidth: 1, borderColor: 'black' }}
                                selectedValue={selectedSym}
                                onValueChange={(itemValue, itemIndex) => setSelectedSym(itemValue)}
                                enabled={inEdit}
                                mode='dropdown'
                            >
                                <Picker.Item label="₪" value="₪" style={{ fontSize: 14 }} />
                                <Picker.Item label="$" value="$" style={{ fontSize: 14 }} />
                                <Picker.Item label="€" value="€" style={{ fontSize: 14 }} />
                                <Picker.Item label="£" value="£" style={{ fontSize: 14 }} />
                            </Picker>*/}

                            <Text>₪ </Text>

                            <TextInput 
                                style={{ 
                                    color: 'black', 
                                    fontSize: 14, 
                                    height: 24,
                                    maxWidth: 80,
                                    borderWidth: 1,
                                    borderColor: 'transparent',
                                    borderBottomColor: inEdit ? 'black' : 'transparent', 
                                    marginBottom: 8
                                }}
                                editable={inEdit}
                                onChangeText={onChangePricing}
                                value={pricing}
                                keyboardType="numeric"
                            />
                            
                        </View>
                    </View>
                </View>
                <View style={{justifyContent: 'space-around', paddingVertical: 16, marginRight: inEdit ? 14 : 16, marginLeft: 20}}>
                    <Icon style={{}}
                        name={inEdit ? "check" : "pencil"}
                        size={15}
                        color="black"
                        underlayColor="blue"
                        onPress={() => {setInEdit(!inEdit)}}>
                    </Icon>
                    <Icon style={{}}
                        name="trash-o"
                        size={15}
                        color="black"
                        underlayColor="blue"
                        onPress={deleteFunc}>
                    </Icon>
                </View>
                
                </>
            }
            </View>
            <TextInput 
                style={{
                    color: 'black', 
                    fontSize: 16,
                    height: 72,
                    padding: 8,
                    textAlignVertical: 'top'
                }}
                multiline={true}
                placeholder="Desciption"
                editable={inEdit}
                onChangeText={onChangeDesc}
                value= {desc}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
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
