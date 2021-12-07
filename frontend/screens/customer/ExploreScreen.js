import React,{useState, useContext} from 'react'
import {View,StyleSheet,ScrollView,Text} from 'react-native'
import { UserContext } from "../../contexts/UserContext";

import Backdrop from '../../components/Backdrop';
import KitchenExploreCard from '../../components/KitchenExploreCard';

const ExploreScreen = ({navigation}) => {
    const {user, setUser} = useContext(UserContext);
    const [pastKitchens, setPastKitchens] = useState([]); // get from DB
    return (
        <View style={{flex:1}}>
            <Backdrop text='Explore' height={80}/>
            <ScrollView>
                <Text style={styles.title}>Order Again</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginBottom: 16, marginLeft: 8}}
                >
                    {
                    pastKitchens.length == 0? <Text style={styles.subTitle}>make your first order</Text> : 
                    pastKitchens.map((item, index) => {
                            return (
                                <KitchenExploreCard key={index} kitchenName={item.bio.name} subtitle={item.bio.city} imgLink={kitchen.bio.coverImg ? `${ServerBase}/images/${kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}/>
                            )})
                    }
                </ScrollView>
                
                <Text style={styles.title}>Categories</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginBottom: 16, marginLeft: 8}}
                >
                    <KitchenExploreCard
                        kitchenName="Cakes"
                        onClick={() => navigation.navigate("Search",{screen:"SearchInternal",params:{category:"Cakes"}})}
                        imgLink="https://img.taste.com.au/9isesBer/taste/2016/11/caramello-cake-105070-1.jpeg"
                    />
                    <KitchenExploreCard
                        kitchenName="Bread"
                        onClick={() => navigation.navigate("Search",{screen:"SearchInternal",params:{category:"Bread"}})}
                        imgLink="https://www.kingarthurbaking.com/sites/default/files/2020-02/the-easiest-loaf-of-bread-youll-ever-bake.jpg"
                    />
                    <KitchenExploreCard
                        kitchenName="Burekas"
                        onClick={() => navigation.navigate("Search",{screen:"SearchInternal",params:{category:"Burekas"}})}
                        imgLink="https://shimrit.co.il/wp-content/uploads/2020/06/%D7%91%D7%95%D7%A8%D7%A7%D7%A1-%D7%92%D7%91%D7%99%D7%A0%D7%95%D7%AA-410x308.png"
                    />
                </ScrollView>
                
                <Text style={styles.title}>Favorites</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginBottom: 16, marginLeft: 8}}
                >
                    {
                    user.favourites.length == 0? <Text style={styles.subTitle}>add kitchens to your favourites</Text> : 
                        user.favourites.map((item, index) => {
                            return (
                                <KitchenExploreCard key={index} kitchenName={item.bio.name} subtitle={item.bio.city} imgLink={kitchen.bio.coverImg ? `${ServerBase}/images/${kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'} />
                            )})
                    }
                    
                </ScrollView>
            </ScrollView>
        </View>
    )
};

ExploreScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        marginBottom: 16,
    },
    subTitle: {
        fontSize: 20,
        marginLeft: 16,
        marginBottom: 16,
    }
});

export default ExploreScreen;