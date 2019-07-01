import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  @ViewChild("sensor1") sensor1: ElementRef;

  sensor1_value: string;
  sensor2: string;
  sensor3: string;
  sensor4: string;
  sensor5: string;

  constructor() { }

  getFormInfo(){

  }

  ngOnInit() {
  }

}
