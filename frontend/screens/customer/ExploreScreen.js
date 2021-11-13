import React from 'react'
import {View,StyleSheet,ScrollView,Text} from 'react-native'

import Backdrop from '../../components/Backdrop';
import KitchenExploreCard from '../../components/KitchenExploreCard';

const ExploreScreen = ({navigation}) => {
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
                    <KitchenExploreCard
                        kitchenName="My Cakes"
                        subtitle="Tel Aviv"
                        onClick={() => navigation.navigate("KitchenPage")}
                        imgLink="data:image/jpeg;base64,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"
                    />
                    <KitchenExploreCard
                        kitchenName="The Jahnoon"
                        subtitle="Ramat Gan"
                        onClick={() => navigation.navigate("KitchenPage")}
                        imgLink="https://www.mastermatkonim.co.il/wp-content/uploads/2020/03/%D7%92%D7%97%D7%A0%D7%95%D7%9F-%D7%A2%D7%9C-%D7%91%D7%A1%D7%99%D7%A1-%D7%A9%D7%9E%D7%9F-%D7%9E%D7%90%D7%A1%D7%98%D7%A8-%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99%D7%9D.jpg"
                    />
                    <KitchenExploreCard
                        kitchenName="La Cupcake"
                        subtitle="Givataim"
                        onClick={() => navigation.navigate("KitchenPage")}
                        imgLink="https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/cupcakes_93722_16x9.jpg"
                    />
                </ScrollView>
                
                <Text style={styles.title}>Categories</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginBottom: 16, marginLeft: 8}}
                >
                    <KitchenExploreCard
                        kitchenName="Cakes"
                        onClick={() => console.log('press category')}
                        imgLink="https://img.taste.com.au/9isesBer/taste/2016/11/caramello-cake-105070-1.jpeg"
                    />
                    <KitchenExploreCard
                        kitchenName="Bread"
                        onClick={() => console.log('press category')}
                        imgLink="https://www.kingarthurbaking.com/sites/default/files/2020-02/the-easiest-loaf-of-bread-youll-ever-bake.jpg"
                    />
                    <KitchenExploreCard
                        kitchenName="Burekas"
                        onClick={() => console.log('press category')}
                        imgLink="https://shimrit.co.il/wp-content/uploads/2020/06/%D7%91%D7%95%D7%A8%D7%A7%D7%A1-%D7%92%D7%91%D7%99%D7%A0%D7%95%D7%AA-410x308.png"
                    />
                </ScrollView>
                
                <Text style={styles.title}>Favorites</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginBottom: 16, marginLeft: 8}}
                >
                    <KitchenExploreCard
                        kitchenName="My Pastry"
                        subtitle="Ramat Aviv"
                        onClick={() => navigation.navigate("KitchenPage")}
                        imgLink="https://www.lifeloveandsugar.com/wp-content/uploads/2018/03/Berries-And-Cream-Mini-Puff-Pastry-Cakes1.jpg"
                    />
                    <KitchenExploreCard
                        kitchenName="Home Cookie"
                        subtitle="Tel Aviv"
                        onClick={() => navigation.navigate("KitchenPage")}
                        imgLink="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202012-lofthousecookies-130-ls-1608834762.jpg"
                    />
                    <KitchenExploreCard
                        kitchenName="Cake Master"
                        subtitle="Tel Aviv"
                        onClick={() => navigation.navigate("KitchenPage")}
                        imgLink="https://thescranline.com/wp-content/uploads/2021/03/Chocolate-Cake.jpg"
                    />
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
    }
});

export default ExploreScreen;