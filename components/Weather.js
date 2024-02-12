import * as React from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'

const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

export default function Weather({ forecast}) {
  return (
     <View style={styles.container}>
          <Text>{forecast.hour}h</Text>
          <Image
          source={{ uri: getIcon(forecast?.icon) }}
          style={styles.image}
          />
          <Text style={styles.temp}>{forecast.temp}°C</Text>
        </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 140,
    width: 75,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 50
  },
  image: {
    width: 50,
    height: 50
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})