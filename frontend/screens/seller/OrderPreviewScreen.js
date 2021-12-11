import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { send_post_request } from '../../utils/requests';
import Colors from '../../globals/Colors';
import {BlankDivider,ItemPreview,BackButton,Button} from '../../components';
import { send_get_request } from '../../utils/requests';

const OrderPreviewScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [st, setStatus] = useState(item.status);

  const getButton = (i) => {
    var j = getJ(st);
    var text = ["Approve","Received","Ready","Delivered","Complete"][j];
    
    if (i == j) {
      return <Button
        onClick={() => { updateStatus() }}
        textColor="#3CB371"
        text={text}
        fillColor="white"
        height={30}
        width={90}
      />;
    }
    else {
      return;
    }
  }

  const get_data_from_server = () => {
    send_get_request('orders/seller/get_orders')
      .then(data => setStatus(data.status))
      .catch(err => {console.log(err);setStatus("Pending Approval")});
  }

  const updateStatusDB = (new_status) => {
    console.log(item._id)
    console.log(new_status)
    send_post_request('orders/seller/update_status',{
      id: item._id,
      status: new_status
    })
    .then()
    .catch(err => {console.log(err); kitchen.distance=0 ; setIsLoading(false);});

    get_data_from_server();
  }

 

  const updateStatus = () => {
    switch (st) {
      case "Pending Approval":
        setStatus("Waiting For Payment");
        updateStatusDB("Waiting For Payment");
        break;
      case "Waiting For Payment":
        setStatus("In the Making");
        updateStatusDB("In the Making");
        break;
      case "In the Making":
        setStatus("Ready for Customer");
        updateStatusDB("Ready for Customer");
        break;
      case "Ready for Customer":
        setStatus("Done");
        updateStatusDB("Done");
        break;
      case "Done":
        setStatus("");
        updateStatusDB("");
        break;
      default:
        setStatus("");
        updateStatusDB("");
        break;
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <BlankDivider height={12} />
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:16,alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <BackButton onClick={navigation.goBack} />
            <Text style={styles.orderNum}>{"Order #" + item._id}</Text>
          </View>

          <Text style={styles.date}>{item.date}</Text>
        </View>
        
        <BlankDivider height={20} />
        
        <View style={{ paddingHorizontal: 16, }}>
          <Text style={styles.title}>Items:</Text>
          <ScrollView>
            {
              item.items.map((i, index) => {
                return (
                  <ItemPreview key={index} OrderName={i.name} number={i.quantity} imgLink={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPVgeegVDlt8YwrzQDHsno8GY0cQ4LV0eMQ&usqp=CAU"} />
                )
              })
            }
          </ScrollView>

          <BlankDivider height={16} />
          
          {item.comments !== "" && <Text style={styles.textStyle}>Comments: {item.comments}</Text>}

          <View style={{ height: 1, borderWidth: 0.5, borderColor: Colors.lightGray, marginVertical: 16 }} />

          <Text style={styles.title}>Customer Info:</Text>
          <Text style={styles.textStyle}>Name: {item.customer.name}</Text>
          <Text style={styles.textStyle}>Address: {item.deliveryAddress}</Text>
          <Text style={styles.textStyle}>Phone: {item.customer.phone}</Text>

          <View style={{ height: 1, borderWidth: 0.5, borderColor: Colors.lightGray, marginVertical: 16 }} />

          <Text style={styles.title}>Delivery Date:</Text>
          <Text style={styles.textStyle}>{item.dueDate}</Text>

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
        
        <BlankDivider height={12} />
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
      fontSize: 18,
      flex: 4,
    }
  }
  else {
    if (i > j) {
      return {
        color: "#D3D3D3",
        textAlign: 'left',
        fontSize: 18,
        flex: 4,
      }
    }
    return {
      color: "#f59c02",
      textAlign: 'left',
      fontSize: 18,
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
      color: "#f59c02",
      flex: 1,
      height: 28,
    }
  }

}


OrderPreviewScreen.navigationOptions = (props) => {
  return {};
};


const styles = StyleSheet.create({
  orderNum: {
    fontSize: 32,
    marginLeft: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  date: {
    color: "#808080",
    fontSize: 18,
  },
  textStyle: {
    fontSize: 16,
  }
});

export default OrderPreviewScreen;