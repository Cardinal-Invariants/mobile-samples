import axios from "axios";

export interface CityCoord {
    lon: number,
    lat: number
}
export interface CityData {
    id: number, 
    name: string,
    coord: CityCoord
}

export interface DayForecast {
    id: number,
    weather: {
        main: string,
        description: string,
    }[]
}

export interface Forecast {
    city: CityData    
    list: DayForecast[]
}

export class WeatherService {
    public static getWeather(): Promise<Forecast> {
        return axios.get('https://pro.openweathermap.org/data/2.5/forecast/climate?zip=94040,us&appid=b1b15e88fa797225412429c1c50c122a1')
                .then(resp => resp.data)
    }
}