import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  @ViewChild("sensor1", {static: false}) sensor1: ElementRef;
  @ViewChild("sensor2", {static: false}) sensor2: ElementRef;
  @ViewChild("sensor3", {static: false}) sensor3: ElementRef;
  @ViewChild("sensor4", {static: false}) sensor4: ElementRef;
  @ViewChild("sensor5", {static: false}) sensor5: ElementRef;

  constructor() { }

  getFormInfo(){
    const sensor1_value = this.sensor1.nativeElement.value;
    const sensor2_value = this.sensor1.nativeElement.value;
    const sensor3_value = this.sensor1.nativeElement.value;
    const sensor4_value = this.sensor1.nativeElement.value;
    const sensor5_value = this.sensor1.nativeElement.value;
  }

  ngOnInit() {
  }

}
