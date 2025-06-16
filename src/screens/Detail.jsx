import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Detail = ({ route }) => {
  // console.log("Route->", route.params);
  const { title, description, image } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: image }}
          style={{ width: 300, height: 300, borderRadius: 20, borderWidth: 1 }}
        />
        <Text style={{ fontWeight: '900', fontSize: 25 }}>{title}</Text>
        <Text style={{ fontWeight: '500', fontSize: 20, color: '#0c2d2d' }}>{description}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Detail

const styles = StyleSheet.create({
  container: {
    padding: 30,
    // backgroundColor: 'red',
  },
})