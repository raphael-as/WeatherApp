import * as React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { isSameDay } from 'date-fns'

const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

export default function CurrentWeather({ data }) {
  const [currentWeather, setCurrentWeather] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const currentW = data.list.filter(forecast => {
        const today = new Date().getTime() + Math.abs(data.city.timezone * 1000);
        const forecastDate = new Date(forecast.dt * 1000);
        return isSameDay(today, forecastDate);
      });

      setCurrentWeather(currentW[0]);
    };

    fetchData();
  }, [data]);

  if (!currentWeather) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.city} >{data?.city?.name}</Text>
      <Text style={styles.today }>Aujourd'hui</Text>

      {currentWeather.weather && currentWeather.weather[0] && currentWeather.weather[0].icon && (
        <Image
          source={{ uri: getIcon(currentWeather?.weather[0].icon) }}
          style={styles.image}
        />
      )}

      <Text style={styles.temp} >{Math.round(currentWeather?.main.temp)}°C</Text>
      <Text style={styles.description} >{currentWeather?.weather[0].description}</Text>
    </View>
  );
}

const COLOR = "#54565B"
const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: 'center',
    height: '65%'
  },
  city:  {
    fontSize: 36,
    fontWeight: '500',
    color: COLOR
  },
  today: {
    fontSize: 24,
    fontWeight: '300',
    color: COLOR
  },
  image: {
     width: 150, 
     height: 150,
     marginVertical: 20
  },
  temp: {
    fontSize: 80,
    fontWeight: 'bold',
    color: COLOR
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR
  }
})
