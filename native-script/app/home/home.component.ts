import { Component, OnInit } from "@angular/core";
import { WeatherService, DayForecast } from '../services/weather.service';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    weatherData: DayForecast[];

    onButtonTap(): void {
        this.weatherService.getWeather().subscribe(
            x => this.weatherData = x.list
        );
    }


    constructor(
        private weatherService: WeatherService
    ) { }

    ngOnInit(): void {
    }
}
