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
    Start: City
}

export interface LocationAPI{
    Cities: City[],
    Visited: City[]
}

@Injectable({
    providedIn: 'root'
})

export class LocationAPIService{

    constructor(private http: HttpClient) { }

    sendLocationInfo(city1: City, city2: City, city3: City, city4: City, city5: City, start: City){
        const details: Cities = {Cities: [city1, city2, city3, city4, city5], Start: start};
        const postData = details;

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
}