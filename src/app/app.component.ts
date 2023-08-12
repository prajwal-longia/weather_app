import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { WeatherService } from './services/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather App';
  constructor(private weatherService:WeatherService){

  }
  onGetWeather(form:NgForm){
    if(form.invalid){
      return;
    }
    this.weatherService.getWeather(form.value.location);
  }

}
