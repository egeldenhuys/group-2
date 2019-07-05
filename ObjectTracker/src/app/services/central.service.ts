import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { SensorService } from '../services/sensor.service';
import { LocationAPIService, Cities, City } from '../services/location-api.service';
import { Sensor } from '../models/sensor.model';

var visited: City[] = [];       //Array of cities that have been visited starting with the start city
var cities: City[] = [];        //Array of cities in the order in which they need to be visitsed
var all_cities: City[] = [];
var sensors: Sensor[] = [];     //Array of sensors in the order in which they need to be visited
var locations = [];
var num: number = 0;

//Defines an object to be able to send the visited array as a json
export interface Visited{
    Visited: City[]
}

const sendVisitedUrl = 'https://bbdvacmap.herokuapp.com/cityReached';

@Injectable({
    providedIn: 'root'
})

export class CentralService{

    constructor(private http: HttpClient) { }

    setSensors(data: Sensor[]){
        sensors = data;
    }

    setCities(data: City[], data2: City[]){
        cities = data;
        all_cities = data2;
    }

    //Adding cities that have been visited to the array
    setVisisted(data: City){
        visited.push(data);     //add the visited city to the array
    }

    addVisited(data: number){
        num += 1;

        if(num == data){
            for(var i = 0; i < cities.length; i++){
                if(data == cities[i].ID){
                    visited.push(cities[i]);
                    cities.shift();         //removes the visited city from the array

                    //Send the array of visited cities to team 4 everytime a visited city is added
                    this.sendVisited();
                }
            }
        }
    }

    setLocations(locations: []){
        locations = locations;
    }

    getCities(){
        return all_cities;
    }

    getVisited(){
        return visited;
    }

    //Send array of visited cities to team 4
    sendVisited(){
        console.log("sendVisited");
        const postData: Visited = {Visited: visited};

        const options = {
            url: sendVisitedUrl,
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"*",
                'Accept': 'application/json'
            },
            method: 'POST',
            body: postData,
            json: true
        };

        return this.http.request('POST', sendVisitedUrl, options);
    }

    //Returns next city to visit
    getNextCity(){
        if(cities.length != 0){
            return cities[0];
        }else{
            return false;
        }
    }

    getNextLocation(){
      if(cities.length != 0){
          return locations[0];
      }else{
          return false;
      }
    }
}
