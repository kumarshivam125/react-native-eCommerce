import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const Profile = ({ setIsAuthenticated }) => {
  const {userData}=useSelector(state=>state.user);
  const logout = async () => {
    Toast.show({ type: 'success', text1: 'Logged Out Successfully', })
    let keys = await AsyncStorage.getAllKeys();
    console.log("LOG OUT page-- ALL KEYS Before-",keys);
    // await AsyncStorage.clear();
    // // await AsyncStorage.removeItem('userData');
    // keys = await AsyncStorage.getAllKeys();
    // console.log("LOG OUT page-- ALL KEYS after-",keys);
    console.log("LOG OUT page-- KEY/VALUE pair -",AsyncStorage.multiGet(keys));
    await AsyncStorage.removeItem("userToken");
    setIsAuthenticated(false);
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'green' }}>Hi! </Text>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{userData?.name}</Text>
      <Image
        style={{ width: 100, height: 100 }}
        source={require('../assets/user.webp')}
      />
      <Text style={{ fontSize: 25, fontWeight: '500' }}>Email-{userData?.email}</Text>
      <Pressable style={{ backgroundColor: '#a9fa79', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 }} onPress={logout}>
        <Text style={{ fontWeight: 'bold' }}>Log Out</Text>
      </Pressable>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
})