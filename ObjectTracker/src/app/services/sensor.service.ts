import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Sensor } from "../models/sensor.model";
import { Observable, timer } from "rxjs";
import { SensorResponse } from "../models/sensor-response.model";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})

export class SensorService {
  sensors: Sensor[] = [];
  sensorSleep = 1000;

  constructor(private http: HttpClient) {}

  
  setSensors(sensors: Sensor[]) {
    this.sensors = sensors;
  }

  connectSensors() {
    this.sensors.forEach(element => {
      if (element.socket === null) {
        element.socket = io(element.IP + ":" + element.Port);

        element.socket.on('connect', () => {
          console.log("Created socket for sensor ID: " + element.ID);
        });
       
      }
    });
  }

  /**
   * Poll all sensors and return the first one that fired.
   * Upon subsequent calls, sensors subscriptions are delayed if
   * they recently fired.
   */
  pollSensors(sleepTime: number): Observable<Sensor> {

    return new Observable<Sensor>(observer => {
      // console.log('polling...');

      this.sensors.forEach((element) => {
        // Start all sensors
        // console.log(`Creating poller for sensor ${element.ID} (1)`);

        element.socket.emit("start", element.ID);
        element.socket.on("new-message", message => {
          // console.log(`Ssensor ${element.ID} Triggered (1)`);
          observer.next(element);
          observer.next(message);
          timer(sleepTime).subscribe(
            () => {
              // console.log(`Creating poller for sensor ${element.ID} (2)`);
              element.socket.emit("start", element.ID);
            }
          );
        });
      });
    });

    

    // Start all sensors


    // console.log('polling...');

    // return new Observable(observer => {
    //   this.sensors.forEach(element => {
    //     // Create obs for each sensor if it does not exist
    //     if (element.Poller === null) {
    //       console.log(`Creating poller for sensor ${element.ID}`);
    //       element.Poller = this.querySensor(element);
    //     }

    //     // Reinit sensors that have been triggered
    //     let d = new Date();
    //     let n = d.getTime();

    //     if (n - element.LastTrigger < sleepTime) {
    //       // TODO: Fix sleepTime
    //       console.log(`Sensor ${element.ID} is not finished sleeping`);
    //       timer(sleepTime).subscribe(() => {
    //         console.log(`Sensor ${element.ID} is set to sleep`);
    //         // Can do in one step...
    //         element.Poller = this.querySensor(element);
    //         element.Poller.subscribe(
    //           (res: any) => {
    //             console.log(`Sensor ${element.ID} has triggered (1)`);
    //             let d2 = new Date();
    //             let n2 = d2.getTime();
    //             element.LastTrigger = n2;
    //             observer.next(element);
    //           },
    //           (err: HttpErrorResponse) => {
    //             // TODO
    //           }
    //         );
    //         console.log(`Sensor ${element.ID} has been subscribed 1`);
    //       });
    //     } else {
    //       // Can do in one step...
    //       element.Poller = this.querySensor(element);
    //       element.Poller.subscribe(
    //         (res: any) => {
    //           console.log(`Sensor ${element.ID} has triggered (2)`);
    //           element.LastTrigger = n;
    //           observer.next(element);
    //         },
    //         (err: HttpErrorResponse) => {}
    //       );
    //       console.log(`Sensor ${element.ID} has been subscribed 2`);
    //     }

    //     // Subscribe to each sensor observable
    //   });

    //   // 'this' is not defined
    //   // // Function to be executed when the sensor returns
    //   // function handler(sensor: Sensor) {
    //   //   // Emit result
    //   //   observer.next(sensor);

    //   //   // NOTE(egeldenhuys): Uses recursion, I think.
    //   //   timer(sleepTime).subscribe(
    //   //     () => {
    //   //       sensor.Poller = this.querySensor(sensor);
    //   //       sensor.Poller.subscribe(
    //   //         (res: any) => {
    //   //           sensor.Distance = res.Distance;
    //   //           handler(sensor);
    //   //         },
    //   //         (err: HttpErrorResponse) => {
    //   //           console.error(sensor);
    //   //           console.error(err);
    //   //           observer.error(err);
    //   //         }
    //   //       );
    //   //   });
    //   // }

    //   // // Bootstrap sensors
    //   // this.sensors.forEach(element => {
    //   //   // Attach observable to sensor
    //   //   element.Poller = this.querySensor(element);

    //   //   // Subscribe to each observable
    //   //   element.Poller.subscribe(
    //   //     (res: any) => {
    //   //       element.Distance = res.Distance;
    //   //       handler(element);
    //   //     },
    //   //     (err: HttpErrorResponse) => {
    //   //       console.error(element);
    //   //       console.error(err);
    //   //     }
    //   //   );
    //   // });

    //   // TODO(egeldenhuys): Cleanup properly
    //   // When the consumer unsubscribes, clean up data ready for next subscription.
    //   return { unsubscribe() {} };
    //});
  }

  querySensor(sensor: Sensor) {
    // return this.http.get<any>(
    //   "http://" + sensor.IP + ":" + sensor.Port
    // );
    return new Observable(observer => {
      console.log(`Sensor ${sensor.ID} has been queried... waiting...`);
      sensor.socket.emit("start", "_start");
      sensor.socket.on("new-message", message => {
        observer.next(message);
      });
    });
  }
}
