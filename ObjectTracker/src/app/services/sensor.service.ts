import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../models/sensor.model';
import { Observable } from 'rxjs';
import { SensorResponse } from '../models/sensor-response.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  sensors: Sensor[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Add a new sensor to be watched
   * @param sensor 
   */
  addSensor(sensor: Sensor) {
    // TODO(egeldenhuys): Handle duplicates?
    this.sensors.push(sensor);
  }

  /**
   * Return an observable that long polls all sensors.
   * The observable returns an array of sensors that are triggered.
   * 
   * @param sensor How long (seconds) to wait before long polling
   * a trigger sensor.
   * 
   */
  getSensorObservable(sleepTime: number) {
    // TODO(egeldenhuys): Implement.
  }

  querySensor(sensor: Sensor): Observable<SensorResponse> {
    return this.http.get<SensorResponse>('http://' + sensor.IP + ':' + sensor.Port);
  }

}
