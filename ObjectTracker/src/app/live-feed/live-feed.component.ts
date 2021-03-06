import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { City, LocationAPIService } from '../services/location-api.service';
import { CentralService } from '../services/central.service';
import { Distance } from '../../assets/js/distance';
import { BallService } from '../services/ball.service';
import { SensorService } from '../services/sensor.service';
import { SensorResponse } from '../models/sensor-response.model';
import { Sensor } from '../models/sensor.model';

declare var PixelDetector: any;
declare var Distance: any;

//Global variables describing the size of the video
const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 810;

//variable used to import different style sheets
declare var require: any;

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  // styleUrls: ['./live-feed.component.css']
})
export class LiveFeedComponent implements OnInit {

  title = 'pixel-tracker';
  private video: HTMLVideoElement;
  private canvas: HTMLCanvasElement;
  private pixelDetector: any;
  length = 0;

  mouseX = -1;
  mouseY = -1;

  destinationX = -1;
  destinationY = -1;

  //Getting all the orange cirlces
  @ViewChild("circle1", { static: true }) circle1: ElementRef;
  @ViewChild("circle2", { static: true }) circle2: ElementRef;
  @ViewChild("circle3", { static: true }) circle3: ElementRef;
  @ViewChild("circle4", { static: true }) circle4: ElementRef;
  @ViewChild("circle5", { static: true }) circle5: ElementRef;
  @ViewChild("circle6", { static: true }) circle6: ElementRef;
  @ViewChild("circle7", { static: true }) circle7: ElementRef;
  @ViewChild("circle8", { static: true }) circle8: ElementRef;
  @ViewChild("circle9", { static: true }) circle9: ElementRef;
  @ViewChild("circle10", { static: true }) circle10: ElementRef;

  //Getting all the paragraph elements to dynamically change the location
  @ViewChild("p1", { static: true }) p1: ElementRef;
  @ViewChild("p2", { static: true }) p2: ElementRef;
  @ViewChild("p3", { static: true }) p3: ElementRef;
  @ViewChild("p4", { static: true }) p4: ElementRef;
  @ViewChild("p5", { static: true }) p5: ElementRef;
  @ViewChild("p6", { static: true }) p6: ElementRef;
  @ViewChild("p7", { static: true }) p7: ElementRef;
  @ViewChild("p8", { static: true }) p8: ElementRef;
  @ViewChild("p9", { static: true }) p9: ElementRef;
  @ViewChild("p10", { static: true }) p10: ElementRef;

  //Getting the container divs for the paragraph elements to display them
  @ViewChild("p1_div", { static: true }) p1_div: ElementRef;
  @ViewChild("p2_div", { static: true }) p2_div: ElementRef;
  @ViewChild("p3_div", { static: true }) p3_div: ElementRef;
  @ViewChild("p4_div", { static: true }) p4_div: ElementRef;
  @ViewChild("p5_div", { static: true }) p5_div: ElementRef;
  @ViewChild("p6_div", { static: true }) p6_div: ElementRef;
  @ViewChild("p7_div", { static: true }) p7_div: ElementRef;
  @ViewChild("p8_div", { static: true }) p8_div: ElementRef;
  @ViewChild("p9_div", { static: true }) p9_div: ElementRef;
  @ViewChild("p10_div", { static: true }) p10_div: ElementRef;

  constructor(private router: Router, private service: CentralService, private sensorService: SensorService,
    private renderer: Renderer2, private ballService: BallService, private locationService: LocationAPIService) {

      window["loc"] = locationService;
      window["senors"] = sensorService;
      window["central"] = service;
    }

  loadLocations() {
    const circle_1 = this.circle1.nativeElement;
    const circle_2 = this.circle2.nativeElement;
    const circle_3 = this.circle3.nativeElement;
    const circle_4 = this.circle4.nativeElement;
    const circle_5 = this.circle5.nativeElement;
    const circle_6 = this.circle6.nativeElement;
    const circle_7 = this.circle7.nativeElement;
    const circle_8 = this.circle8.nativeElement;
    const circle_9 = this.circle9.nativeElement;
    const circle_10 = this.circle10.nativeElement;

    const p_1 = this.p1.nativeElement;
    const p_2 = this.p2.nativeElement;
    const p_3 = this.p3.nativeElement;
    const p_4 = this.p4.nativeElement;
    const p_5 = this.p5.nativeElement;
    const p_6 = this.p6.nativeElement;
    const p_7 = this.p7.nativeElement;
    const p_8 = this.p8.nativeElement;
    const p_9 = this.p9.nativeElement;
    const p_10 = this.p10.nativeElement;

    const p_1_div = this.p1_div.nativeElement;
    const p_2_div = this.p2_div.nativeElement;
    const p_3_div = this.p3_div.nativeElement;
    const p_4_div = this.p4_div.nativeElement;
    const p_5_div = this.p5_div.nativeElement;
    const p_6_div = this.p6_div.nativeElement;
    const p_7_div = this.p7_div.nativeElement;
    const p_8_div = this.p8_div.nativeElement;
    const p_9_div = this.p9_div.nativeElement;
    const p_10_div = this.p10_div.nativeElement;

    // var temp: City[] = [];
    // var city1: City = {Name: "Johannesburg", Country: "South Africa", ID: 1};
    // var city2: City = {Name: "Cape Town", Country: "South Africa", ID: 2};
    // var city3: City = {Name: "Durban", Country: "South Africa", ID: 3};
    // temp.push(city1);
    // temp.push(city2);
    // temp.push(city3);

    const cities = this.service.getCities();
    for (var i = 0; i < cities.length; i++) {
      cities[i].ID = i + 1;
    }

    // const cities = temp;
    length = cities.length;

    //Displaying the side directions based on the number of cities recieved
    if (length != 0) {
      var num = 0;
      this.renderer.setStyle(circle_1, 'display', 'block');
      this.renderer.setStyle(p_1_div, 'display', 'block');
      p_1.innerHTML = cities[num].Name;

      num += 1;
      if (num != length) {
        this.renderer.setStyle(circle_2, 'display', 'block');
        this.renderer.setStyle(p_2_div, 'display', 'block');
        p_2.innerHTML = cities[num].Name;

        num += 1;
        if (num != length) {
          this.renderer.setStyle(circle_3, 'display', 'block');
          this.renderer.setStyle(p_3_div, 'display', 'block');
          p_3.innerHTML = cities[num].Name;

          num += 1;
          if (num != length) {
            this.renderer.setStyle(circle_4, 'display', 'block');
            this.renderer.setStyle(p_4_div, 'display', 'block');
            p_4.innerHTML = cities[num].Name;

            num += 1;
            if (num != length) {
              this.renderer.setStyle(circle_5, 'display', 'block');
              this.renderer.setStyle(p_5_div, 'display', 'block');
              p_5.innerHTML = cities[num].Name;

              num += 1;
              if (num != length) {
                this.renderer.setStyle(circle_6, 'display', 'block');
                this.renderer.setStyle(p_6_div, 'display', 'block');
                p_6.innerHTML = cities[num].Name;

                num += 1;
                if (num != length) {
                  this.renderer.setStyle(circle_7, 'display', 'block');
                  this.renderer.setStyle(p_7_div, 'display', 'block');
                  p_7.innerHTML = cities[num].Name;

                  num += 1;
                  if (num != length) {
                    this.renderer.setStyle(circle_8, 'display', 'block');
                    this.renderer.setStyle(p_8_div, 'display', 'block');
                    p_8.innerHTML = cities[num].Name;

                    num += 1;
                    if (num != length) {
                      this.renderer.setStyle(circle_9, 'display', 'block');
                      this.renderer.setStyle(p_9_div, 'display', 'block');
                      p_9.innerHTML = cities[num].Name;

                      num += 1;
                      if (num != length) {
                        this.renderer.setStyle(circle_10, 'display', 'block');
                        this.renderer.setStyle(p_10_div, 'display', 'block');
                        p_10.innerHTML = cities[num].Name;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    //Changing the stylesheet according to the screen size
    if (window.innerWidth >= 1300 && window.innerWidth <= 1366) {
      require("style-loader!./../../assets/styles/large-live-feed.css");
    }
    else {
      require("style-loader!./live-feed.component.css");
    }

    this.webcam_init();
    this.loadLocations();
    //console.error("PixelDetector has been disabled!");
    this.pixelDetector = new PixelDetector();
    //this.pixelDetector.setConeCount(this.service.getCities().length);
    //this.service.setLocations(this.pixelDetector.identified_cones);

    this.pixelDetector.start();
    window["ball"] = this.ballService;
    this.main_logic();
  }

  initSensors() {
    // Sub to sensors
    this.sensorService.pollSensors().subscribe(
      (res: SensorResponse) => {
        console.log('Triggered: ' + res.SensorId);

        let nextCity  = this.service.getNextCity();
        console.log(nextCity);

        if (nextCity) {
          if (nextCity.ID == res.SensorId) {
            console.log("Visited city with sensor ID: " + res.SensorId);
            this.service.addVisited(res.SensorId);
          } else {
            console.log("Wrong city, ignoring");
          }
        }
      }
    );
  }

  main_logic(){
    this.initSensors();
    window['init'] = this.initSensors;
  }

  webcam_init() {
    this.video = <HTMLVideoElement>document.getElementById("video");
    this.video.width = VIDEO_WIDTH;
    this.video.height = VIDEO_HEIGHT;

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = VIDEO_WIDTH;
    this.canvas.height = VIDEO_HEIGHT;

    // TODO(egeldenhuys): Integrate object detection
    // let ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    // ctx.strokeStyle = "#FF0000";
    // ctx.fillRect(0, 0, 20, 20);

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "environment",
        }
      })
      .then(stream => {
        this.video.srcObject = stream;
        this.video.onloadedmetadata = () => {
          this.video.play();
        };
      });
  }

  returnHome() {
    //Navigating to the main page
    try {
      this.router.navigate(['']);
    } catch (err) {
      console.log("Could not redirect to live feed: " + err.message);
    }
  }

  onCanvasClick(ev: MouseEvent) {
    console.log("Destination:");
    console.log(`${ev.offsetX},${ev.offsetY}`);

    this.destinationX = ev.offsetX;
    this.destinationY = ev.offsetY;

    let ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.destinationX - 3, this.destinationY - 3, 6, 6);
  }

  onCanvasMouseMove(ev: MouseEvent) {
    this.mouseX = ev.offsetX;
    this.mouseY = ev.offsetY;

    let ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(this.mouseX, this.mouseY, 1, 1);

  }

  mouseTrapInit() {
    console.log("Starting mouseTrap...")
    console.log("Please hover mouse on ball. 5 Second before starting...");
    setTimeout(() => {this.mouseTrap();}, 5000);

    // TODO: Init ball...
  }

  mouseTrap() {
    console.log("Iterate...");

    console.log(`mouse = ${this.mouseX}, ${this.mouseY}`);

    let dist = Distance.distance(this.mouseX, this.mouseY, this.destinationX, this.destinationY) as number;
    console.log("Distance = " + dist);

    let angle = Distance.angle(this.mouseX, this.mouseY, this.destinationX, this.destinationY) - 90;
    console.log("Angle = " + dist);

    if (dist > 200) {
      this.ballService.roll(100, angle);
    } else {
      console.log("Ball has reached its destination");
      return;
    }

    setTimeout(() => {this.mouseTrap();}, 5000);
  }

}
