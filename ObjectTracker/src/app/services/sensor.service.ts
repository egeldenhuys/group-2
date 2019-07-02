import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Sensor } from '../models/sensor.model';
import { Observable, timer } from 'rxjs';
import { SensorResponse } from '../models/sensor-response.model';

@Injectable({
  providedIn: 'root'
})

export class SensorService {
  sensors: Sensor[] = [];

  constructor(private http: HttpClient) { }

  setSensors(sensors: Sensor[]) {
    this.sensors = sensors;
  }

  // DEPRECATED: Only query the sensors for verification
  // /**
  //  * Poll all sensors and return the first one that fired.
  //  * Upon subsequent calls, sensors subscriptions are delayed if
  //  * they recently fired.
  //  */
  // pollSensors(sleepTime: number): Observable<Sensor> {
  //   return new Observable((observer) => {

  //     this.sensors.forEach((element) => {
  //       // Create obs for each sensor if it does not exist
  //       if (element.Poller === null) {
  //         element.Poller = this.querySensor(element);
  //       }

  //       // Reinit sensors that have been triggered

  //       if (Date.prototype.getTime() - element.LastTrigger > this.sensorSleep) {
  //         timer()
  //       } else {
  //         // Can do in one step...
  //         element.Poller = this.querySensor(element);
  //         element.Poller.subscribe(
  //           (res: SensorResponse) => {
  //             element.LastTrigger = Date.prototype.getTime();
  //             observer.next(element);
  //           },
  //           (err: HttpErrorResponse) => {
  
  //           }
  //         );
  //       }

  //       // Subscribe to each sensor observable

       
  //     });

  //     // 'this' is not defined
  //     // // Function to be executed when the sensor returns
  //     // function handler(sensor: Sensor) {
  //     //   // Emit result
  //     //   observer.next(sensor);

  //     //   // NOTE(egeldenhuys): Uses recursion, I think.
  //     //   timer(sleepTime).subscribe(
  //     //     () => {
  //     //       sensor.Poller = this.querySensor(sensor);
  //     //       sensor.Poller.subscribe(
  //     //         (res: SensorResponse) => {
  //     //           sensor.Distance = res.Distance;
  //     //           handler(sensor);
  //     //         },
  //     //         (err: HttpErrorResponse) => {
  //     //           console.error(sensor);
  //     //           console.error(err);
  //     //           observer.error(err);
  //     //         }
  //     //       );
  //     //   });
  //     // }

  //     // // Bootstrap sensors
  //     // this.sensors.forEach(element => {
  //     //   // Attach observable to sensor
  //     //   element.Poller = this.querySensor(element);

  //     //   // Subscribe to each observable
  //     //   element.Poller.subscribe(
  //     //     (res: SensorResponse) => {
  //     //       element.Distance = res.Distance;
  //     //       handler(element);
  //     //     },
  //     //     (err: HttpErrorResponse) => {
  //     //       console.error(element);
  //     //       console.error(err);
  //     //     }
  //     //   );
  //     // });

  //     // TODO(egeldenhuys): Cleanup properly
  //     // When the consumer unsubscribes, clean up data ready for next subscription.
  //     return {unsubscribe() { }};
  //   });
  // }

  querySensor(sensor: Sensor): Observable<SensorResponse> {
    return this.http.get<SensorResponse>('http://' + sensor.IP + ':' + sensor.Port);
  }

}
