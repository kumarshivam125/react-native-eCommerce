import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import Toast from 'react-native-toast-message';
import SingleItem from './SingleItem';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
    const { cart } = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);
    async function updateCart() {
        const finalCart = cart.map(x => ({ id: x.id, qty: x.qty }));
        try {
            const token = JSON.parse(await AsyncStorage.getItem("userToken"));
            console.log("TOKEN in CART-", token);

            const { data } = await axios.post('http://10.190.129.16:4000/updateCart', { data: finalCart },
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            console.log("CART UPDATE Response--", data);
            // if (data.success) {
            // }
            // else
            //     Alert.alert("Error-", data.message)
        }
        catch (err) {
            console.log("Error in Update cart", err)
        }
    }
    useEffect(() => {
        const sum = cart.reduce((tot, curr) => tot + curr.price * curr.qty, 0);
        setTotal(sum);
        updateCart();
    }, [cart])
    // useEffect(() => {

    // }, [])
    const goToHome = () => {
        navigation.navigate('Home');
    };
    const goToDetailPage = (data) => {
        navigation.navigate('ProductDetail', data);
    };
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 60, fontWeight: "700", color: '#5D75FF' }}>Cart</Text>
            {
                total > 0 &&
                <View style={{ backgroundColor: '#FABC8A', padding: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontWeight: '900', fontSize: 20 }}>Total-</Text>
                    <Text style={{ fontWeight: '900', fontSize: 25 }}>{total.toFixed(2)} </Text>
                </View>
            }
            {
                cart.length == 0 &&
                <View>
                    <Text style={{ fontWeight: '500', fontSize: 20 }}>Cart is Empty!!!</Text>
                    <Pressable style={{ backgroundColor: '#F997C6', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, }}
                        onPress={goToHome}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Buy Now</Text>
                    </Pressable>
                </View>
            }
            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <SingleItem item={item} goToDetailPage={goToDetailPage} />
                )}
            />
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Light pink background
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})