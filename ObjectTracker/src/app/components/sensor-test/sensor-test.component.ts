import { Component, OnInit } from '@angular/core';
import { SensorService } from 'src/app/services/sensor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Sensor } from 'src/app/models/sensor.model';

@Component({
  selector: 'app-sensor-test',
  templateUrl: './sensor-test.component.html',
  styleUrls: ['./sensor-test.component.css']
})
export class SensorTestComponent implements OnInit {

  msg = '...';

  constructor(private sensorService: SensorService) { }

  foo(sensor2) {
    // console.log(sensor2);
    // this.sensorService.pollSensors(500).subscribe(
    //   (sen: Sensor) => {
    //     console.log(sen);
    //     this.sensorService.pollSensors(500).subscribe(
    //       (sensor) => {
    //         this.foo(sensor);
    //       }
    //     );
    //   }
    // );
  }

  ngOnInit() {
    let sensor: Sensor = {
      IP: '192.168.47.37',
      Port: 5000,
      ID: 1,
      City: 'PTA',
      socket: null,
    };
    let sensor2: Sensor = {
      IP: '192.168.46.106',
      Port: 8080,
      ID: 2,
      City: 'JHB',
      socket: null,
    };


    this.sensorService.setSensors([sensor, sensor2]);

    this.sensorService.connectSensors();

    this.sensorService.pollSensors(1000).subscribe(
      (sen: Sensor) => {
        console.log(sen);
      }
    );

  }

}
