import React,{useRef,useState,useCallback} from "react";
import { Text, View, Animated,StyleSheet,Dimensions,TouchableOpacity,Linking,Alert} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { AirbnbRating } from 'react-native-ratings';
import ImageWithIndicator from './ImageWithIndicator';

import Colors from "../globals/Colors";
import * as Icons from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as Clipboard from 'expo-clipboard';

import BlankDivider from "./BlankDivider";
import { send_post_request } from "../utils/requests";

const HEADER_HEIGHT = 100;
const BACKGROUND = Colors.black;

const OpenURLButton = ({ url, text, img}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      // for some reason title appears rtl so i am using only message text
      Alert.alert('', `Failed to open link:\n${url}\n\nYou can copy it and try manually.`, [{text: 'close', onPress: () => {}}, {text: 'copy', onPress: () => {Clipboard.setString(url);}, style: 'cancel'}], { cancelable: true});
    }
  }, [url]);

  return (
          <>
          <TouchableOpacity style={{marginVertical: 8, alignItems: 'center'}} onPress={handlePress}>
            <>
            <ImageWithIndicator imageStyle={{height: 60, width: 60}} imgLink={img}/>
            <Text style={{textAlign: 'center', fontSize: 18, color:'black'}}>{text}</Text>
            </>
          </TouchableOpacity>
          </>
          )
};

const OrderSlider = ({order, close,navigateToChat}) => {
  const ref = useRef();
  const [showRating, setShowRating] = useState(!order.rated && order.status == "Done" );
  const [showLinks, setShowLinks] = useState(false);
  const [didRate,setDidRate] = useState(false);
  const [TOTAL_HEIGHT,setTOTAL_HEIGHT] = useState(400 + (showRating ? 100 : 0));

  const [draggableRange, setDraggableRange] = useState({ top: TOTAL_HEIGHT, bottom: HEADER_HEIGHT });
  const { top, bottom } = draggableRange;
  var draggedValue = new Animated.Value(TOTAL_HEIGHT);
  const [wrapperHeight,setWrapperHeight] = useState(TOTAL_HEIGHT);
  draggedValue.addListener(({value}) => setWrapperHeight(value));

  const sendRating = (orderid,rating) => {
    send_post_request("users/customer/rate_kitchen",{id: orderid, rating: rating})
      .then(() => {
        setDidRate(true);
        order.rated = true;
      })
      .catch(err => {console.log(err);});
  }

  const handleHeightEvent = event => {
    setDraggableRange({...draggableRange, top:100+event.nativeEvent.layout.height});
    setTOTAL_HEIGHT(100+event.nativeEvent.layout.height);
    draggedValue.setValue(100+event.nativeEvent.layout.height);
    setWrapperHeight(100+event.nativeEvent.layout.height);
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
      <Modal isVisible={showLinks} onBackdropPress={() => setShowLinks(false)}>
        <View style={{alignSelf:'center', width: Dimensions.get('window').width*0.8, backgroundColor: 'white', borderRadius: 10}}>
          <Text style={{fontSize: 24, alignSelf: 'center', marginVertical: 8}}>Payments Options</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            {order.kitchen.logistics.paymentLinks[0] !== '' && 
              <OpenURLButton url={order.kitchen.logistics.paymentLinks[0]} text={'bit'} img={'data:image/jpeg;base64,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'}/>
            }
            {order.kitchen.logistics.paymentLinks[1] !== '' && 
              <OpenURLButton url={order.kitchen.logistics.paymentLinks[1]} text={'PayBox'} img={'data:image/png;base64,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'}/>
            }
          </View>
          <View style={{flexDirection: 'row', marginVertical: 12}}>
            <Icons.SimpleLineIcons
              name='info'
              style={{marginHorizontal: 8}}
              size={20}
            />
            <Text style={{fontSize: 14, alignSelf: 'center', color: 'gray', width: Dimensions.get('window').width*0.7}}>
              {'You can also contact the seller directly, via phone or chat to sort the payment.'}
            </Text>
          </View>
        </View>
      </Modal>

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
                <Icons.AntDesign name="closecircleo" size={24} color="white"/>
              </TouchableOpacity>
            </View>
            <View style={[styles.row, {marginTop: 8}]}>
              <Text style={styles.text}>₪ {order.price}</Text>
              <Text style={styles.text}>{order.date}</Text>
            </View>

          </View>
          
          <View style={styles.container} onLayout={(event) => handleHeightEvent(event)}>
            <Text style={styles.textBold}>Your Order:</Text>
            {order.items.map((item,idx) => <Text style={styles.subtext} key={idx}>{item.name}  x{item.quantity}</Text>)}
            <BlankDivider height={16}/>
            
            <View style={{marginBottom: 8, flexDirection: 'row'}}>
              <Text style={styles.textBold}>Delivery: </Text>
              <Text style={styles.text}>{order.deliveryAddress} ({order.dueDate})</Text>
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
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {setShowLinks(true)}}>
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
                  startingValue={0}
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
