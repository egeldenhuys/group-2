import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SensorService } from '../services/sensor.service';
import { LocationAPIService, Cities, City, LocationAPI } from '../services/location-api.service';
import { Sensor } from '../models/sensor.model';

var visited: City[] = [];
var cities: City[] = [];
var sensors: Sensor[] = [];

@Injectable({
    providedIn: 'root'
})

export class CentralService{

    constructor(private http: HttpClient) { }

    setSensors(data: Sensor[]){
        sensors = data;
    }

    setCities(data: City[]){
        cities = data;
    }
}