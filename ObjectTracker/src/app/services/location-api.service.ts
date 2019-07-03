import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface City{
    Name: string,
    Country: string
}

export interface Cities{
    Cities: City[],
    StartingCity: City
}

const sendCitiesUrl = 'https://bbdvacmap.herokuapp.com/setCities';

@Injectable({
    providedIn: 'root'
})

export class LocationAPIService{

    constructor(private http: HttpClient) { }

    sendLocationInfo(city1: City, city2: City, city3: City, city4: City, city5: City, city6: City, city7: City, city8: City, city9: City, city10: City, start: City){
        var cities: City[] = [];
        cities.push(city1);

        if(city2.Name != ""){
            cities.push(city2);
        }

        if(city3.Name != ""){
            cities.push(city3);
        }

        if(city4.Name != ""){
            cities.push(city4);
        }

        if(city5.Name != ""){
            cities.push(city5);
        }

        if(city6.Name != ""){
            cities.push(city6);
        }

        if(city7.Name != ""){
            cities.push(city7);
        }

        if(city8.Name != ""){
            cities.push(city8);
        }

        if(city9.Name != ""){
            cities.push(city9);
        }

        if(city10.Name != ""){
            cities.push(city10);
        }
        
        const details: Cities = {Cities: cities, StartingCity: start};
        
        const postData = details;

        const options = {
            url: sendCitiesUrl,
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

        return this.http.request('POST', sendCitiesUrl, options);
    }
}