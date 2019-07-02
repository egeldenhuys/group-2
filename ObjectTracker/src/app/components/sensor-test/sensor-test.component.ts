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

  ngOnInit() {
    this.sensorService.setSensors([{ID: 1, IP: '192.168.47.37', Port: 5000, City: 'PTA'}]);

    this.sensorService.querySensor(this.sensorService.sensors[0])
    .subscribe((res) => {
      this.msg = res.Distance.toString();
    },
    (err: HttpErrorResponse) => {
      this.msg = err.message;
      console.log(err);
    });

  }

}
