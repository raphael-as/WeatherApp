import * as React from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'
import axios from 'axios'

import CurrentWeather from "./components/CurrentWeather"
import Forecasts from "./components/Forecasts"


const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4585be63b180c58ca4bd8f2d99855a90&lang=fr&units=metric`

export default function App() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const getCoordinates = async () => {
     const { status } = await Location.requestForegroundPermissionsAsync()
     if(status !== "granted") {
       return 
     }

    const userLocation = await Location.getCurrentPositionAsync()
    getWeather(userLocation)
    }

    getCoordinates()
  }, [])


  const getWeather = async (location) => {
    try{
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))
      setData(response.data, () => {
      setLoading(false);
    });
    } catch(e) {
      console.log("Erreur dans getWeather")
    }
    
  }

if(!loading) {
  return <View style={styles.container}>
   <ActivityIndicator />
    </View>
}

  return (
    <View style={styles.container}>
    <CurrentWeather data={data} />
    <Forecasts data={data} />
    <Text>By Raphael Abi Saad</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2E6E1',
    padding: 8,
  }
});
