import { ActivityIndicator, Button, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { calculateNewMassToMatchDuration } from 'react-native-reanimated/lib/typescript/animation/springUtils';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from 'react-native-toast-notifications';
import SingleItem from './SingleItem';
// import arr1 from '../../data';
import { setCart, setCatalog } from '../redux/cartSlice';
import { setUser } from '../redux/userSlice';



const Main = ({ navigation }) => {
  const { catalog } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  //FOR NODE 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const resp=await fetch('http://localhost:4000/hello');  //This line will NOT WORK
        // YOU Need to mention IP ADDRESS OF COMPUTER at place of LOCALHOST...
        const resp = await fetch('http://10.190.129.16:4000/getData');
        const resp1 = await resp.json();
        console.log("Data Recieved", resp1);
        let newCatalog = [];
        for (let i = 0; i < resp1.length; i++) {
          const copy = { ...resp1[i] };
          newCatalog.push(copy);
        }
        const x = await AsyncStorage.getItem("userData");
        let x1 = JSON.parse(x);
        x1.cart = x1.cart.map(obj => JSON.parse(obj));
        console.log("USER DATA In MAIN.jsx--", x1);
        const ids = x1.cart.map(x => x.id);
        const qtys = x1.cart.map(x => x.qty);
        const newCart = [];
        for (let i = 0; i < ids.length; i++) {
          const one = resp1.find(x => x.id == ids[i]);
          one.qty = qtys[i];
          newCart.push(one);;
          newCatalog = newCatalog.map(x => x.id == ids[i] ? { ...x, qty: qtys[i] } : x);
        }
        console.log("NEW CART -", newCart);
        console.log("NEW Catalog-", newCatalog);
        dispatch(setUser(x1));
        dispatch(setCatalog(newCatalog));
        dispatch(setCart(newCart));
      }
      catch (err) {
        console.log("ERROR in frontend", err)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    console.log("IN MAIN-", userData)
  }, [userData])
  const goToDetailPage = (data) => {
    navigation.navigate('ProductDetail', data);
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, fontWeight: "700", color: '#5D75FF' }}>Home</Text>
      <FlatList
        data={catalog}
        renderItem={({ item }) => (
          <SingleItem item={item} goToDetailPage={goToDetailPage} />
        )}
      />
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', // Light pink background
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
})



