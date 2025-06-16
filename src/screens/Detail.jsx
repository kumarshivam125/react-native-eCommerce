import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
const Detail = ({ route }) => {
  // console.log("Route->", route.params);
  const { title, description, image } = route.params;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={{ width: 300, height: 300, borderRadius: 20, borderWidth: 1 }}
      />
      <Text style={{ fontWeight: '900' ,fontSize:25}}>{title}</Text>
      <Text style={{ fontWeight: '500' ,fontSize:22,color:'#EF7A1B'}}>{description}</Text>
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  container: {
    padding: 30
  },
})