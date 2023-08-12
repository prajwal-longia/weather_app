import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { Weather, WeatherData } from './models/weather.model';
import { DateTime } from './models/time.model';
import { DateFormat } from './models/time.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Weather App';
  location = "Delhi";
  dateTime?: DateTime;
  weatherData?: WeatherData;
  description?: Weather;
  lat = '';
  long = '';
  date?: DateFormat;
  month?: string;
  constructor(private weatherService:WeatherService){

  }

  ngOnInit(): void {
      this.weatherService.getWeather(this.location);
      this.location = '';
  }

  onSubmit(){
    this.onGetWeather(this.location);
    this.location = '';

  }

  getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    this.month = date.toLocaleString('en-US', { month: 'long' });
    return;
  }

  onGetTime(lat:string, long:string){
    this.weatherService.getTime(lat,long)
    .subscribe({
      next: (response) => {
        this.dateTime = response;
       /*  this.date = {
          day: String(this.dateTime.day),
          month: String(this.dateTime.month),
          year: String(this.dateTime.year)
        };
        const date = new Date(`${this.date.year}-${this.date.month}-${this.date.day}`); */
        this.getMonthName(this.dateTime.month)
        console.log(response);
      }
    })
  }


  onGetWeather(location: string){
    this.weatherService.getWeather(location)
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        this.description = response.weather[0];
        this.lat = String(response.coord.lat);
        this.long = String(response.coord.lon);
        this.onGetTime(this.lat,this.long);
        console.log(response);
      }
    })
}
}