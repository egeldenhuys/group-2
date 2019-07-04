import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { City, LocationAPIService } from '../services/location-api.service';
import { Sensor } from '../models/sensor.model';
import { SensorService } from '../services/sensor.service';
import { CentralService } from '../services/central.service';

//variable used to import different stylesheets
declare var require: any;
var style = '';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  // styleUrls: ['../../assets/styles/large.css']
  // styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  //Retrieve the input object from the HTML page
  @ViewChild("sensor1", {static: false}) sensor1: ElementRef;
  @ViewChild("sensor2", {static: false}) sensor2: ElementRef;
  @ViewChild("sensor3", {static: false}) sensor3: ElementRef;
  @ViewChild("sensor4", {static: false}) sensor4: ElementRef;
  @ViewChild("sensor5", {static: false}) sensor5: ElementRef;
  @ViewChild("sensor6", {static: false}) sensor6: ElementRef;
  @ViewChild("sensor7", {static: false}) sensor7: ElementRef;
  @ViewChild("sensor8", {static: false}) sensor8: ElementRef;
  @ViewChild("sensor9", {static: false}) sensor9: ElementRef;
  @ViewChild("sensor10", {static: false}) sensor10: ElementRef;

  //Retirve the radio button value for the start city
  @ViewChild("start1", {static: false}) start1: ElementRef;
  @ViewChild("start2", {static: false}) start2: ElementRef;
  @ViewChild("start3", {static: false}) start3: ElementRef;
  @ViewChild("start4", {static: false}) start4: ElementRef;
  @ViewChild("start5", {static: false}) start5: ElementRef;
  @ViewChild("start6", {static: false}) start6: ElementRef;
  @ViewChild("start7", {static: false}) start7: ElementRef;
  @ViewChild("start8", {static: false}) start8: ElementRef;
  @ViewChild("start9", {static: false}) start9: ElementRef;
  @ViewChild("start10", {static: false}) start10: ElementRef;

  //Error elements
  @ViewChild("errorCover", {static: false}) errorCover: ElementRef;
  @ViewChild("error", {static: false}) error: ElementRef;
  @ViewChild("errorMessage", {static: false}) errorMessage: ElementRef;

  //Chosen start city
  start: City;

  //Array of sensor objects
  sensors: Sensor[] = [];

  constructor(private location_service: LocationAPIService, private sensor_service: SensorService, private central_service: CentralService, 
    private renderer: Renderer2, private router: Router) {}

  getFormInfo(){

    //Getting the input values
    const sensor1_value = this.sensor1.nativeElement.value;
    const sensor2_value = this.sensor2.nativeElement.value;
    const sensor3_value = this.sensor3.nativeElement.value;
    const sensor4_value = this.sensor4.nativeElement.value;
    const sensor5_value = this.sensor5.nativeElement.value;
    const sensor6_value = this.sensor6.nativeElement.value;
    const sensor7_value = this.sensor7.nativeElement.value;
    const sensor8_value = this.sensor8.nativeElement.value;
    const sensor9_value = this.sensor9.nativeElement.value;
    const sensor10_value = this.sensor10.nativeElement.value;

    //Error checking
    if(sensor1_value == "" && sensor2_value == "" && sensor3_value == "" && sensor4_value == "" && sensor5_value == "" &&
        sensor6_value == "" && sensor7_value == "" && sensor8_value == "" && sensor9_value == "" && sensor10_value == ""){
      const cover = this.errorCover.nativeElement;
      const errors = this.error.nativeElement;
      const error_message = this.errorMessage.nativeElement;

      error_message.innerHTML = "Please make sure that you provide all the cities.";

      this.renderer.setStyle(cover, 'display', 'block');
      this.renderer.setStyle(errors, 'display', 'block');
    }
    else{
      //Creating the City Objects
      var temp = sensor1_value.split(',');
      const details1: City = { Name: temp[0], Country: temp[1], ID: 1};

      temp = sensor2_value.split(',');
      const details2: City = { Name: temp[0], Country: temp[1], ID: 2};

      temp = sensor3_value.split(',');
      const details3: City = { Name: temp[0], Country: temp[1], ID: 3};

      temp = sensor4_value.split(',');
      const details4: City = { Name: temp[0], Country: temp[1], ID: 4};

      temp = sensor5_value.split(',');
      const details5: City = { Name: temp[0], Country: temp[1], ID: 5};

      temp = sensor6_value.split(',');
      const details6: City = { Name: temp[0], Country: temp[1], ID: 6};

      temp = sensor7_value.split(',');
      const details7: City = { Name: temp[0], Country: temp[1], ID: 7};

      temp = sensor8_value.split(',');
      const details8: City = { Name: temp[0], Country: temp[1], ID: 8};

      temp = sensor9_value.split(',');
      const details9: City = { Name: temp[0], Country: temp[1], ID: 9};

      temp = sensor10_value.split(',');
      const details10: City = { Name: temp[0], Country: temp[1], ID: 10};

      var valid = true;

      //Setting the starting city
      if(this.start1.nativeElement.checked == true){
        this.start = details1;
      }
      else if(this.start2.nativeElement.checked == true){
        this.start = details2;
      }
      else if(this.start3.nativeElement.checked == true){
        this.start = details3;
      }
      else if(this.start4.nativeElement.checked == true){
        this.start = details4;
      }
      else if(this.start5.nativeElement.checked ==  true){
        this.start = details5;
      }
      else if(this.start6.nativeElement.checked == true){
        this.start = details6;
      }
      else if(this.start7.nativeElement.checked == true){
        this.start = details7;
      }
      else if(this.start8.nativeElement.checked == true){
        this.start = details8;
      }
      else if(this.start9.nativeElement.checked == true){
        this.start = details9;
      }
      else if(this.start10.nativeElement.checked == true){
        this.start = details10;
      }
      else{
        //No starting city was selected
        const cover = this.errorCover.nativeElement;
        const errors = this.error.nativeElement;
        const error_message = this.errorMessage.nativeElement;

        error_message.innerHTML = "Please make sure that you select a starting city.";

        this.renderer.setStyle(cover, 'display', 'block');
        this.renderer.setStyle(errors, 'display', 'block');

        valid = false;
      }

      if(valid == true){
        //Sending the information to the data service to be posted
        this.location_service.sendLocationInfo(details1, details2, details3, details4, details5, details6, details7, details8, details9, details10, this.start).subscribe((response: any) => {
          if(response.Success == true){
            //Recieve array of Cities in order
            const cities = response.Cities;

            //Sending the cities to the Central service
            this.central_service.setCities(cities, cities);

            //Setting the start city as visited
            this.central_service.setVisisted(this.start);

            //Navigating to the live stream
            try {
              this.router.navigate(['live-feed']);
            } 
            catch(err) {
              console.log("Could not redirect to live feed: " + err.message);
            }
          }
          else{
            //No route available
            const cover = this.errorCover.nativeElement;
            const errors = this.error.nativeElement;
            const error_message = this.errorMessage.nativeElement;

            error_message.innerHTML = "There is no current route available with the given locations. Please try again.";

            this.renderer.setStyle(cover, 'display', 'block');
            this.renderer.setStyle(errors, 'display', 'block');
          }
        });
      }
    }
  }

  removeErrorMessage(){
    const cover = this.errorCover.nativeElement;
    const errors = this.error.nativeElement;

    this.renderer.setStyle(cover, 'display', 'none');
    this.renderer.setStyle(errors, 'display', 'none');
  }

  ngOnInit() {
    //Changing the stylesheet according to the screen size
    if(window.innerWidth >= 1300 && window.innerWidth <= 1366){
      require("style-loader!./../../assets/styles/large.css");        //larger laptop screen
    }
    else{
      require("style-loader!./main.component.css");
    }
  }

}
