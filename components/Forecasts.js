import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import Weather from './Weather';

export default function CurrentWeather({ data }) {
  const [forecasts, setForecasts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const forecastsData = data.list.map((f) => {
        const dt = new Date(f.dt * 1000);
        return {
          date: f.dt,
          hour: dt.getHours(),
          temp: Math.round(f.main.temp),
          icon: f.weather[0].icon,
          name: format(dt, 'EEEE', { locale: fr }),
        };
      });

      let newForcastsData = forecastsData.map(forecast => {
        return forecast.name
      }).filter((day, index, self) => {
        return self.indexOf(day) === index
      }).map((day) => {
        return {
          day,
          data: forecastsData.filter((forecast) => forecast.name === day)
        }
      })

      setForecasts(newForcastsData);
    };

    fetchData();
  }, [data]);

  if (forecasts.length === 0) {
    return null;
  }

  return (
    <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    style={styles.scroll}
    >
      {forecasts.map((f) => (
        <View>
          <Text style={styles.day}>{f.day.toUpperCase()}</Text>
          <View style={styles.container}>
          {f.data.map(w => <Weather forecast={w} />)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    height: '35%'
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5
  },
  container: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 15
  }
});
