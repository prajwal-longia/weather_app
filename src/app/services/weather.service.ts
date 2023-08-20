import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { WeatherData } from '../models/weather.model';
import { DateTime } from '../models/time.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient){ 

  }

  getWeather(name: string): Observable<WeatherData>{
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=aecb5cce2c7e5b33b69cb3f559989208&units=metric`)
  }

  getTime(lat:string,long:string): Observable<DateTime> {
    return this.http.get<DateTime>(`https://thingproxy.freeboard.io/fetch/https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${long}`)
  }

}
