import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Weather App';
  location = "New Delhi";
  weatherData?: WeatherData;
  constructor(private weatherService:WeatherService){

  }

  ngOnInit(): void {
      this.weatherService.getWeather(this.location);
  }

  onSubmit(){
    this.onGetWeather(this.location);
    this.location = '';

  }

  onGetWeather(location: string){
    this.weatherService.getWeather(location)
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(response);
      }
    })
}
}