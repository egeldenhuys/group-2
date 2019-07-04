import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Sensor } from '../models/sensor.model';
import { Observable, timer } from 'rxjs';
import { SensorResponse } from '../models/sensor-response.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  constructor(private http: HttpClient) {}

  private url = 'ws://192.168.47.197:8080';
  sensors: Sensor[] = [];
  private ws: WebSocket;

  info(msg: string) {
    console.log(`[INFO] [SensorService] ${msg}`);
  }

  error(msg: string) {
    console.error(`[ERROR] [SensorService] ${msg}`);
  }

  setSensors(sensors: Sensor[]) {
    this.sensors = sensors;
  }

  // onmessage(event) {
  //   this.info(event.data); // What is Event? Don't worry.. It just works. Trust
  // }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.info('Socket opened');
      this.ws.send("c");
    };

    this.ws.onclose = ev => {
      this.info('Socket Closed');
      this.info(ev.reason);
    };

    this.ws.onerror = () => {
      this.error('Socket Closed');
    };

    // handled by pollSensors()
    // this.ws.onmessage = (event: any) => {
    //   this.info(event.data);
    // };
  }

  pollSensors(): Observable<SensorResponse> {
    return new Observable<SensorResponse>(observer => {
      this.ws.onmessage = event => {
        observer.next(event.data as SensorResponse);
      };
    });
  }
}
