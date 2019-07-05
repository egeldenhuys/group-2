import { Component, OnInit } from '@angular/core';
import { SensorService } from 'src/app/services/sensor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Sensor } from 'src/app/models/sensor.model';
import { SensorResponse } from 'src/app/models/sensor-response.model';

@Component({
  selector: 'app-sensor-test',
  templateUrl: './sensor-test.component.html',
  styleUrls: ['./sensor-test.component.css']
})
export class SensorTestComponent implements OnInit {

  msg = '...';

  constructor(private sensorService: SensorService) { }

  ngOnInit() {
   
    this.sensorService.connect();

    this.sensorService.pollSensors().subscribe(
      (sen: SensorResponse) => {
        console.log('Sensor Says: ' + sen);
      }
    );

    window['sensors'] = this.sensorService;

  }

}
