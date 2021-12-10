import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../globals/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderCard = ({ onClick, orderNumber, orderStatus, orderDate, price }) => {
    return (
        <TouchableOpacity onPress={onClick} style={{ marginHorizontal: 4 }}>
            <View style={{ flexDirection: "row", flex: 1, marginHorizontal: 4, alignItems: "center" }}>
                <View style={{ flex: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.number}>{"Order #" + orderNumber}</Text>
                    </View>
                    <Text style={{color: "#808080",textAlign: 'left',fontSize: 16}}>{orderStatus}</Text>
                    <Text style={styles.date}>{orderDate}</Text>
                </View>
                <View>
                    <Text style={styles.price}>{"$" + price}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <Icon
                    name="angle-right"
                    size={40}
                    color="black"
                    underlayColor="blue"
                    style={{ marginRight: 4 }}
                >
                </Icon>
            </View>
        </TouchableOpacity>
    );
};
getTextStyle = (stat) => {
    switch (stat) {
        case "Pending Approval":
            return {
                color: "#808080",
                textAlign: 'left',
                fontSize: 20,
    
            };
            break;
        case "Waiting For Payment":
            return {
                color: "#808080",
                textAlign: 'left',
                fontSize: 20,
    
            };
            break;
        case "In the Making":
            return {
                color: "#FFD700",
                textAlign: 'left',
                fontSize: 20,
    
            };
            break;
        case "Ready for Customer":
            return {
                color: "#32CD32",
                textAlign: 'left',
                fontSize: 20,
    
            };
            break;
        case "Done":
            return {
                color: "#32CD32",
                textAlign: 'left',
                fontSize: 20,
    
            };
            break;
        default:
            return {
                color: "#32CD32",
                textAlign: 'left',
                fontSize: 20,
    
            }
            break;
    }
    
};

const styles = StyleSheet.create({
    number: {
        color: "black",
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        color: "#808080",
        textAlign: 'left',
        fontSize: 16,

    },
    price: {
        color: Colors.black,
        textAlign: 'left',
        fontSize: 18,
        paddingRight: 15,
        paddingLeft: 20,
    },
});

export default OrderCard;
