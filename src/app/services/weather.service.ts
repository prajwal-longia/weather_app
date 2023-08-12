import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient){ 

  }

  getWeather(name: string): Observable<WeatherData>{
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid={API key}&units=metric`)
  }
  
}
