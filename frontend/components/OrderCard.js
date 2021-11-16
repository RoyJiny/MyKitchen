import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../globals/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShadowCard from './ShadowCard';

const OrderCard = ({ onClick, orderNumber, orderStatus, orderDate, customer, price }) => {
    return (
        <TouchableOpacity onPress={onClick} style={{ marginHorizontal: 4 }}>
            <ShadowCard>
                <View style={{ flexDirection: "row", flex:1,marginHorizontal: 4, alignItems:"center" }}>
                    <View style={{ flex:6}}>
                        <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
                            <Text style={styles.numberReady}>{"Order #" + orderNumber}</Text>
                            <Text style={getTextStyle(orderStatus)}>{"  "+orderStatus}</Text>
                            <Text style={styles.price}>{"$" + price}</Text>
                        </View>
                        <Text style={styles.date}>{orderDate}</Text>
                        <Text style={styles.customer}>{customer}</Text>
                    </View>
                    <View style={{flex:1}}></View>
                    <Icon
                        name="angle-right"
                        size={40}
                        color="black"
                        underlayColor="blue"
                        style={{marginRight:4}}
                        >
                    </Icon>
                </View>
            </ShadowCard>
        </TouchableOpacity>
    );
};
getTextStyle = (stat) => {
    if (stat == "ready") {
        return {
            color: "#00ff00",
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 'bold',
        }
    } else {
        return {
            color: "#FFA505",
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 'bold',
        }
    }
}
const styles = StyleSheet.create({
    numberReady: {
        color: "black",
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',

    },
    numberWaiting: {
        color: "#FFA505",
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',

    },
    date: {
        color: "#808080",
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
    },

    customer: {
        color: Colors.black,
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        color: Colors.black,
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 15,
        paddingLeft: 20,
    },
});

export default OrderCard;
