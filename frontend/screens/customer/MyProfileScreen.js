import React,{useState,useRef} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity, ScrollView} from 'react-native'
import * as Icons from '@expo/vector-icons'

import Colors from '../../globals/Colors';

import Backdrop from '../../components/Backdrop';
import BlankDivider from '../../components/BlankDivider';
import ShadowCard from '../../components/ShadowCard';
import ExpantionArrow from '../../components/ExpantionArrow';

const AddressCard = (name,address) => {
  return (
    <ShadowCard>
      <View style={{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8
      }}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{name}</Text>
          <Text style={{fontSize: 14}}>{address}</Text>
        </View>
        <View style={{flexDirection:'row', alignSelf: 'center'}}>
          <TouchableOpacity
            style={{marginHorizontal: 8}}
            onPress={() => console.log('pressed edit address')}
          >
            <Icons.FontAwesome5 name="edit" size={18} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 8}}
            onPress={() => console.log('pressed delete address')}
          >
            <Icons.FontAwesome5 name="trash" size={18} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </ShadowCard>
  );
};

const Order = (kitchen,contents,status,price,date,img) => {
  return (
    <View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8}}>
      <View style={{flexDirection: 'row'}}>
        <Image style={{ height: 80, width: 80, borderRadius: 10, marginRight: 16}} source={{uri: img}}/>
        
        <View>
          <Text style={{fontSize: 18}}>{kitchen}</Text>
          {contents.length > 0 ? <Text style={{fontSize: 14, color: Colors.lightGray}}>{contents[0]}</Text> : null}
          {contents.length > 1 ? <Text style={{fontSize: 14, color: Colors.lightGray}}>{contents[1]}</Text> : null}
          {contents.length > 2 ? <Text style={{fontSize: 14, color: Colors.lightGray}}>...</Text> : null}
        </View>
      </View>

      <View style={{alignSelf: 'center'}}>
        {status !== null ? <Text style={{textAlign: 'center', fontSize: 14}}>Status: {status}</Text> : null}
        <Text style={{textAlign: 'center', fontSize: 14}}>${price}</Text>
        <Text style={{textAlign: 'center', fontSize: 14, color: Colors.lightGray}}>{date}</Text>
      </View>
    </View>

    <View style={{height:1, borderColor: Colors.lightGray, borderWidth: 0.5}}/>
    </View>
  );
};

const MyOrdersScreen = ({navigation}) => {
  const [expandRecentOrders, setExpandRecentOrders] = useState(true);
  let scroll_position = 0;
  const ScrollViewRef = useRef();
  
  return (
    <View style={{flex:1}}>
      <Backdrop text='My Profile' height={80}/>
      
      <ScrollView
        ref={ScrollViewRef}
        onScroll={event => scroll_position = event.nativeEvent.contentOffset.y}
        showsVerticalScrollIndicator={false}  
      >
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.title}>Hello John</Text>
          <Image style={styles.profileImage} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/John_Cena_July_2018.jpg/1200px-John_Cena_July_2018.jpg"}}/>
        </View>
        
        <BlankDivider height={32}/>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
          <Text style={styles.subtitle}>My Addresses</Text>
          <TouchableOpacity
            onPress={() => console.log('pressed add new address')}
          >
            <Icons.Feather name='plus' size={30} color='black'/>
          </TouchableOpacity>
        </View>
        
        {AddressCard('Home','Rothschild 100, Tel Aviv ')}
        {AddressCard('Office','HaShalom 17, Tel Aviv ')}

        <BlankDivider height={32}/>

        <Text style={styles.subtitle}>Active Orders</Text>
        {Order('Test Kitchen',['chocolate cupcake','white cupcake','birhday cupcake'],'Pending',60,'30/11/2021',"http://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg")}
        {Order('Test Kitchen',['chocolate cupcake','white cupcake'],'Pending',60,'30/11/2021',"http://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg")}

        <BlankDivider height={32}/>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.subtitle}>Recent Orders</Text>
          <ExpantionArrow
            onClick={() => {
              if (!expandRecentOrders){
                // 88 for each order we want to scroll + 16 of extra padding
                ScrollViewRef.current?.scrollTo({y: scroll_position + 2*88 + 16,animated: true,});
              }
              setExpandRecentOrders(!expandRecentOrders);
            }}
            isInitaialyExpanded={true}
          />
        </View>
        {expandRecentOrders
          ? <View>
            {Order('Test Kitchen',['chocolate cupcake','white cupcake','birhday cupcake'],null,60,'30/11/2021',"http://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg")}
            {Order('Test Kitchen',['chocolate cupcake','white cupcake'],null,60,'30/11/2021',"http://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg")}
          </View>
          : null
        }

        <BlankDivider height={16}/>
      </View>
      </ScrollView>
    </View>
  )
};

MyOrdersScreen.navigationOptions = (props) => {
  return {};  
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  contentContainer: {
    marginHorizontal: 16
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50/2
  }
});

export default MyOrdersScreen;