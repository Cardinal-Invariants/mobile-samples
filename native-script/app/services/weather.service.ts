import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
    providedIn: 'root',
})
export class WeatherService {

    constructor(private httpClient: HttpClient) {

    }

    public getWeather(): Observable<Forecast> {
        return this.httpClient
                   .get<Forecast>('https://pro.openweathermap.org/data/2.5/forecast/climate?zip=94040,us&appid=b1b15e88fa797225412429c1c50c122a1')
    }

}