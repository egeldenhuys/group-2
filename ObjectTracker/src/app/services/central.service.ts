import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SensorService } from '../services/sensor.service';
import { LocationAPIService, Cities, City, LocationAPI } from '../services/location-api.service';
import { Sensor } from '../models/sensor.model';

var visited: City[] = [];       //Array of cities that have been visited starting with the start city
var cities: City[] = [];        //Array of cities in the order in which they need to be visitsed
var sensors: Sensor[] = [];     //Array os sensors in the order in which they need to be visited

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

    setVisisted(data: City){
        visited.push(data);
    }

    sendVisisted(){}

    sendNextCity(){}
}