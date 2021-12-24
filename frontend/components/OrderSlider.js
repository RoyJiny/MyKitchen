import React,{useRef,useState} from "react";
import { Text, View, Animated,StyleSheet,Dimensions,TouchableOpacity,Linking} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { AirbnbRating } from 'react-native-ratings';

import Colors from "../globals/Colors";
import * as Icons from '@expo/vector-icons';

import BlankDivider from "./BlankDivider";
import { send_post_request } from "../utils/requests";

const HEADER_HEIGHT = 100;
const BACKGROUND = Colors.black;

const OrderSlider = ({order, close,navigateToChat}) => {
  const ref = useRef();
  const [showRating, setShowRating] = useState(!order.rated && order.status == "Done" );
  const [didRate,setDidRate] = useState(false);
  const [TOTAL_HEIGHT,setTOTAL_HEIGHT] = useState(400 + (showRating ? 100 : 0));

  // const draggableRange = { top: TOTAL_HEIGHT, bottom: HEADER_HEIGHT };
  const [draggableRange, setDraggableRange] = useState({ top: TOTAL_HEIGHT, bottom: HEADER_HEIGHT });
  const { top, bottom } = draggableRange;
  var draggedValue = new Animated.Value(HEADER_HEIGHT);
  const [wrapperHeight,setWrapperHeight] = useState(HEADER_HEIGHT);
  draggedValue.addListener(({value}) => setWrapperHeight(value));

  const sendRating = (orderid,rating) => {
    send_post_request("users/customer/rate_kitchen",{id: orderid, rating: rating})
      .then(() => {
        setDidRate(true);
      })
      .catch(err => {console.log(err);});
  }

  const textTranslateY = draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [0, 8],
    extrapolate: "clamp"
  });

  const textTranslateX = draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [0, -30],
    extrapolate: "clamp"
  });

  const textScale = draggedValue.interpolate({
    inputRange: [bottom, top],
    outputRange: [1, 0.8],
    extrapolate: "clamp"
  });

  return (
    <View style={[styles.wrapper, {height: wrapperHeight}]}>
      <SlidingUpPanel
        ref={ref}
        draggableRange={draggableRange}
        animatedValue={draggedValue}
        snappingPoints={[360]}
        height={TOTAL_HEIGHT}
        friction={5}
        backdropOpacity={0}
      >
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <View style={{
              height: 2,
              borderWidth: 2,
              borderColor: "#f8f9fa",
              width: 35,
              borderRadius: 25,
              alignSelf: 'center',
              marginBottom: 4,
              marginTop: 12
            }}/>

            <View style={styles.row}>
              <View>
                <Animated.View
                  style={{transform: [
                    { translateY: textTranslateY },
                      { translateX: textTranslateX },
                      { scale: textScale }
                  ]}}
                  >
                  <Text style={styles.textHeader}>Order from {order.kitchen.bio.name}</Text>
                </Animated.View>
              </View>
              <TouchableOpacity onPress={close}>
                <Icons.AntDesign name="closecircleo" size={18} color="white"/>
              </TouchableOpacity>
            </View>
            <View style={[styles.row, {marginTop: 8}]}>
              <Text style={styles.text}>₪ {order.price}</Text>
              <Text style={styles.text}>{order.date}</Text>
            </View>

          </View>
          
          <View style={styles.container} onLayout={(event) => setDraggableRange({...draggableRange, top:100+event.nativeEvent.layout.height}) && setTOTAL_HEIGHT(100+event.nativeEvent.layout.height)}>
            <Text style={styles.textBold}>Your Order:</Text>
            {order.items.map((item,idx) => <Text style={styles.subtext} key={idx}>{item.name}  x{item.quantity}</Text>)}
            <BlankDivider height={16}/>
            
            <View style={{marginBottom: 8, flexDirection: 'row'}}>
              <Text style={styles.textBold}>Delivery: </Text>
              <Text style={styles.text}>{order.deliveryAddress}</Text>
            </View>
            <BlankDivider height={16}/>
            
            <Text style={styles.textBold}>Kitchen Info:</Text>
            {order.status != 'Pending Approval' && <Text style={styles.subtext}>{order.kitchen.bio.street}, {order.kitchen.bio.city}</Text>}
            <Text style={styles.subtext}>{order.kitchen.bio.phone}</Text>
            <BlankDivider height={16}/>

            <View style={{marginBottom: 8, flexDirection: 'row'}}>
              <Text style={styles.textBold}>Order Status: </Text>
              <Text style={styles.text}>{order.status}</Text>
            </View>
            <BlankDivider height={16}/>

            <View style={[styles.row, {alignSelf: 'center', justifyContent: 'space-around', width: Dimensions.get('window').width}]}>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${order.kitchen.bio.phone}`)} style={{alignItems: 'center'}}>
                <Icons.FontAwesome name='phone' size={24} color='white' />
                <Text style={styles.subtext}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToChat} style={{alignItems: 'center'}}>
                <Icons.Entypo name='chat' size={24} color='white' />
                <Text style={styles.subtext}>Message</Text>
              </TouchableOpacity>
              {order.status !== 'Pending Approval' &&
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => Linking.openURL(`https://waze.com/ul?q=${order.kitchen.bio.street}, ${order.kitchen.bio.city}`)}>
                  <Icons.Ionicons name='md-navigate' size={24} color='white' />
                  <Text style={styles.subtext}>Navigate</Text>
                </TouchableOpacity>
              }
              {order.status === 'Waiting For Payment' &&
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {}}>
                  <Icons.MaterialIcons name='payment' size={24} color='white' />
                  <Text style={styles.subtext}>Pay</Text>
                </TouchableOpacity>
              }
            </View>
            <BlankDivider height={16}/>
            
            {showRating &&
              (didRate
              ? <Text style={[styles.text, {alignSelf: 'center', paddingBottom: 50}]}>Your rating was submitted</Text>
              : <View>
                <Text style={styles.text}>Rate {order.kitchen.bio.name}:</Text>
                <BlankDivider height={8} />
                <AirbnbRating
                  size={30}
                  showRating={false}
                  startingValue={3}
                  onFinishRating={(value) => sendRating(order._id,value)}
                />
                <BlankDivider height={8} />
              </View>)
            }

            <BlankDivider height={24}/>
          </View>
        </View>
      </SlidingUpPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,
    zIndex: 2
  },
  container: {
    backgroundColor: BACKGROUND,
    paddingHorizontal: 24
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    height: HEADER_HEIGHT,
    backgroundColor: BACKGROUND,
    paddingHorizontal: 24,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textHeader: {
    fontSize: 24,
    color: "white",
    fontWeight: 'bold'
  },
  textBold: {
    fontSize: 16,
    color: "white",
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  subtext: {
    fontSize: 14,
    color: "white",
    marginLeft: 8
  }
});

export default OrderSlider;
