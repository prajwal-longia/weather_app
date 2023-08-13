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
  time?: string;
  sunrise?: string;
  sunset?: string;
  unixSunrise?: Date;
  unixSunset?: Date;
  conditionImageUrl = "../assets/weather_icons/01d.png"
  isDay = true;
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
        this.getMonthName(this.dateTime.month);
        this.time = this.timeFormater(this.dateTime.hour, this.dateTime.minute);
        this.checkDay();
        this.getImageUrl(this.description!.icon);
        console.log(response);
      }
    });
    
  }

  getImageUrl(id:string){
    /* if( this.between(this.dateTime!.hour, 0, this.unixSunrise!.getHours()-1) || this.between(this.dateTime!.hour,this.unixSunset!.getHours(),23) ){
      this.conditionImageUrl = `../assets/weather_icons/${id}n.png`
      return;
    }
    this.conditionImageUrl = `../assets/weather_icons/${id}d.png` */
    this.conditionImageUrl = `../assets/weather_icons/${id}.png`
    return;
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
        this.unixSunrise = new Date(this.weatherData.sys.sunrise * 1000);
        this.unixSunset = new Date(this.weatherData.sys.sunset * 1000);
        this.sunrise = this.timeFormater(this.unixSunrise.getHours(),this.unixSunrise.getMinutes());
        this.sunset = this.timeFormater(this.unixSunset.getHours(),this.unixSunset.getMinutes())
        console.log(response);
      }
    })
}
timeFormater(H:number,M:number){
  return  `${(H%12<10?'0':'')+H%12}:${(M<10?'0':'')+M} ${H<12?'AM':'PM'}`;
}

between (x:number, min:number, max:number) {
  return x >= min && x <= max;
};

checkDay(){
  if (this.between(this.dateTime!.hour ,this.unixSunrise!.getHours()-1, this.unixSunset!.getHours())){
    this.isDay = false;
  }
  return;
}

}