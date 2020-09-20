import React, { useState } from 'react';
import { Button, FlatList, Text, View } from "react-native";
import MapView, { LatLng, Marker } from 'react-native-maps';
import { DayForecast, WeatherService } from '../services/weather.service';
import { styles } from './weather-view.styles';

export interface WeatherViewOptions { }


export function WeatherView({}: WeatherViewOptions) {
    const [weatherData, setWeatherData] = useState<DayForecast[]>([])
    const [cityCoord, setCityCoord] = useState<LatLng>()
    
    function onGetWeatherClicked() {
        WeatherService.getWeather().then((resp) => {
            setWeatherData(resp.list.map((item, index) => {
                item.id = index
                return {...item}
            })); 

            const coordinates: LatLng = {
                latitude: resp.city.coord.lat,
                longitude: resp.city.coord.lon
            }
            setCityCoord(coordinates);
        })
    }

    return (
    <View style={styles.container}>
    
    <MapView
        style={styles.map}
        region={{
          latitude: cityCoord?.latitude || 0,
          longitude: cityCoord?.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
    >
        {cityCoord !=null &&  <Marker coordinate={cityCoord}/>}
    </MapView>

    
    <View style={styles.toolbar}>
        <Button title={"Get weather"} onPress={onGetWeatherClicked}></Button>
    </View>
    

    <View
        style={styles.list}>
            
        <FlatList 
            data={weatherData} 
            renderItem={(item) => 
                <Text style={styles.listItem}>
                    {item.item.id + " " + item.item.weather[0].description}
                </Text>
            }
            keyExtractor={(item) => item.id.toString()}
            extraData={weatherData}/>
 
    </View>
       
    </View>
    )
}