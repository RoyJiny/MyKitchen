import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import Colors from '../../globals/Colors';
import {BlankDivider,ItemPreview,BackButton,Button2} from '../../components';

const OrderPreviewScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [st, setSt] = useState(item.order.status);

  const getButton = (i) => {
    var j = getJ(st);
    if (i == j) {
      return <Button2 borderColor="black"
        fillColor="white"
        text="Update"
        textColor="black" style={getButtonStyle} onClick={() => { updateStat() }} />;
    }
    else {
      return;
    }
  }

  const updateStat = () => {
    switch (st) {
      case "Pending Approval":
        setSt("Waiting For Payment");
        break;
      case "Waiting For Payment":
        setSt("In the Making");
        break;
      case "In the Making":
        setSt("Ready for Customer");
        break;
      case "Ready for Customer":
        setSt("Done");
        break;
      case "Done":
        setSt("");
        break;
      default:
        setSt("");
        break;
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <BlankDivider height={12} />
      <View>
        <View style={styles.body}>
          <BackButton onClick={navigation.goBack} />

          <Text style={styles.orderNum}>{"Order #" + item.order.id}</Text>
        </View>
        <BlankDivider height={20} />
        <View style={{ paddingHorizontal: 16, }}>
          <View style={{ marginBottom: 20, }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.title}>Order:</Text>
              <Text style={styles.date}>{item.order.date}</Text>
            </View>
          </View>
          <ScrollView>{
            item.order.items.map((i, index) => {
              return (
                <ItemPreview key={index} OrderName={i.name} number={i.quantity} imgLink={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPVgeegVDlt8YwrzQDHsno8GY0cQ4LV0eMQ&usqp=CAU"} />
              )
            })
          }
          </ScrollView>
          <Text style={styles.title}>Comments:</Text>
          <View>
            <Text style={{ padding: 4, }}>{item.order.comments}</Text>
          </View>
          <View style={{ height: 1, borderWidth: 0.5, borderColor: Colors.lightGray, marginVertical: 16 }} />

          <Text style={styles.title}>Customer Info:</Text>
          <Text style={styles.general}>Name: {item.customer.name}</Text>
          <Text style={styles.general}>Address: {item.order.deliveryAddress}</Text>
          <Text style={styles.general}>Phone: {item.customer.phone}</Text>

          <View style={{ height: 1, borderWidth: 0.5, borderColor: Colors.lightGray, marginVertical: 16 }} />

          <Text style={styles.title}>Delivery Date:</Text>
          <Text style={styles.general}>{item.order.dueDate}</Text>

          <View style={{ height: 1, borderWidth: 0.5, borderColor: Colors.lightGray, marginVertical: 16 }} />

          <Text style={styles.title}>Status:</Text>
          <BlankDivider height={8} />
          <View style={{ flexDirection: 'row', paddingVertical: 8, }}>
            <View style={{ flex: 1, }}>
              <Entypo name="stopwatch" size={28} style={getIconStatus(st, 0)} />
            </View>
            <Text style={getStatusStyle(st, 0)}>Pending Approval</Text>
            <View style={{ flex: 2, height: 36, }}>
              {
                getButton(0)
              }
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 8, }}>
            <View style={{ flex: 1, }}>
              <MaterialIcons name="payment" size={28} style={getIconStatus(st, 1)} />
            </View>
            <Text style={getStatusStyle(st, 1)}>Waiting For Payment</Text>
            <View style={{ flex: 2, height: 36, }}>
              {
                getButton(1)
              }
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 8, }}>
            <View style={{ flex: 1, }}>
              <MaterialCommunityIcons name="chef-hat" size={28} style={getIconStatus(st, 2)} />
            </View>
            <Text style={getStatusStyle(st, 2)}>In the Making</Text>
            <View style={{ flex: 2, height: 36, }}>
              {
                getButton(2)
              }
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 8, }}>
            <View style={{ flex: 1, }}>
              <MaterialCommunityIcons name="bike-fast" size={28} style={getIconStatus(st, 3)} />
            </View>
            <Text style={getStatusStyle(st, 3)}>Ready for Customer</Text>
            <View style={{ flex: 2, height: 36, }}>
              {
                getButton(3)
              }
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 8, }}>
            <View style={{ flex: 1, }}>
              <FontAwesome name="flag-checkered" size={28} style={getIconStatus(st, 4)} />
            </View>
            <Text style={getStatusStyle(st, 4)}>Done</Text>
            <View style={{ flex: 2, height: 36, }}>
              {
                getButton(4)
              }
            </View>
          </View>
        </View>
        <View>
          <BlankDivider height={12} />
        </View>
      </View>
    </ScrollView>
  )
};
const getJ = (stat) => {
  switch (stat) {
    case "Pending Approval":
      return 0;
      break;
    case "Waiting For Payment":
      return 1;
      break;

    case "In the Making":
      return 2;
      break;
    case "Ready for Customer":
      return 3;
      break;
    case "Done":
      return 4;
      break;
    default:
      return 5;
      break;
  }
}

const getStatusStyle = (stat, i) => {
  var j = getJ(stat);
  if (i < j) {
    return {
      color: "#3CB371",
      textAlign: 'left',
      fontSize: 20,
      flex: 4,
    }
  }
  else {
    if (i > j) {
      return {
        color: "#D3D3D3",
        textAlign: 'left',
        fontSize: 20,
        flex: 4,
      }
    }
    return {
      color: "#FFD700",
      textAlign: 'left',
      fontSize: 20,
      flex: 4,
    }
  }

}

const getIconStatus = (stat, i) => {
  var j = getJ(stat);
  if (i < j) {
    return {
      color: "#3CB371",
      flex: 1,
      height: 28,
    }
  }
  else {
    if (i > j) {
      return {
        color: "#D3D3D3",
        flex: 1,
        height: 28,
      }
    }
    return {
      color: "#FFD700",
      flex: 1,
      height: 28,
    }
  }

}

const getButtonStyle = (stat, i) => {
  var j = getJ(stat);
  if (i !== j) {
    return {
      color: "#D3D3D3",
    }
  }
  else {
    return {
      color: "#3CB371"
    }
  }
}




OrderPreviewScreen.navigationOptions = (props) => {
  return {};
};


const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  orderNum: {
    fontSize: 32,
    marginLeft: 8,
  },
  title: {
    //fontWeight: 'bold',
    fontSize: 24,
    alignSelf: "flex-start",
  },
  date: {
    color: "#808080",
    alignSelf: 'flex-end',
    fontSize: 24,
  },
  general: {
    fontSize: 16,
  }
});

export default OrderPreviewScreen;