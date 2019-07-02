import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { City, LocationAPI, LocationAPIService } from '../location-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  //Retrieve the input object from the HTML page
  @ViewChild("sensor1", {static: false}) sensor1: ElementRef;
  @ViewChild("sensor2", {static: false}) sensor2: ElementRef;
  @ViewChild("sensor3", {static: false}) sensor3: ElementRef;
  @ViewChild("sensor4", {static: false}) sensor4: ElementRef;
  @ViewChild("sensor5", {static: false}) sensor5: ElementRef;

  //Retirve the radio button value for the start city
  @ViewChild("start1", {static: false}) start1: ElementRef;
  @ViewChild("start2", {static: false}) start2: ElementRef;
  @ViewChild("start3", {static: false}) start3: ElementRef;
  @ViewChild("start4", {static: false}) start4: ElementRef;
  @ViewChild("start5", {static: false}) start5: ElementRef;

  //Chosen start city
  start: City;

  constructor(private service: LocationAPIService) {}

  getFormInfo(){
    //Getting the input values
    const sensor1_value = this.sensor1.nativeElement.value;
    const sensor2_value = this.sensor1.nativeElement.value;
    const sensor3_value = this.sensor1.nativeElement.value;
    const sensor4_value = this.sensor1.nativeElement.value;
    const sensor5_value = this.sensor1.nativeElement.value;

    //Creating the City Objects
    var temp = sensor1_value.split(',');
    const details1: City = { Name: temp[0], Country: temp[1]};

    var temp = sensor2_value.split(',');
    const details2: City = { Name: temp[0], Country: temp[1]};

    var temp = sensor3_value.split(',');
    const details3: City = { Name: temp[0], Country: temp[1]};

    var temp = sensor4_value.split(',');
    const details4: City = { Name: temp[0], Country: temp[1]};

    var temp = sensor5_value.split(',');
    const details5: City = { Name: temp[0], Country: temp[1]};

    if(this.start1.nativeElement.value == true){
      this.start = details1;
    }
    else if(this.start2.nativeElement.value == true){
      this.start = details2;
    }
    else if(this.start3.nativeElement.value == true){
      this.start = details3;
    }
    else if(this.start4.nativeElement.value == true){
      this.start = details4;
    }
    else{
      this.start = details5;
    }

    //Sending the information to the data service to be posted
    this.service.sendLocationInfo(details1, details2, details3, details4, details5, this.start).subscribe((response: any) => {
      if(response.success == "true"){
        //Recieve array of Cities in order
      }
      else{

      }
    });
  }

  ngOnInit() {
  }

}
