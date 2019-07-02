import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SensorService } from '../services/sensor.service';
import { LocationAPIService, Cities, City } from '../services/location-api.service';
import { Sensor } from '../models/sensor.model';

var visited: City[] = [];       //Array of cities that have been visited starting with the start city
var cities: City[] = [];        //Array of cities in the order in which they need to be visitsed
var sensors: Sensor[] = [];     //Array of sensors in the order in which they need to be visited

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

    //Adding cities that have been visited to the array
    setVisisted(data: City){
        visited.push(data);
    }

    //Send array of visited cities to team 4
    sendVisisted(){
        const postData = visited;

        const options = {
            method: 'POST',
            // url: authenticateFABIAdminURL,
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"*",
                'Accept': 'application/json'
            },
            body: postData,
            json: true
        };

        return this.http.request('POST', 'url', options);
    }

    //Send directions of next city to team 1
    sendNextCity(){}
}