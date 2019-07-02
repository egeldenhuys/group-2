import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

const VIDEO_WIDTH = 1400;
const VIDEO_HEIGHT = 1065;

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.css']
})
export class LiveFeedComponent implements OnInit {

  title = 'pixel-tracker';
  private video: HTMLVideoElement;

  // @ViewChild("small_image", {static: false}) small_image: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
    this.webcam_init();

    // const draw_canvas = this.small_image.nativeElement;
    // var ctx = draw_canvas.getContect('2d');
    
    // var base_image = new Image();
    // base_image.src = '../../assets/images/location.png';
    // base_image.onload = function(){
    //   ctx.drawImage(base_image, 0, 0, 200, 200);
    // }
  }

  webcam_init() {
    this.video = <HTMLVideoElement>document.getElementById("video");
    this.video.width = VIDEO_WIDTH;
    this.video.height = VIDEO_HEIGHT;

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        }
      })
      .then(stream => {
        this.video.srcObject = stream;
        this.video.onloadedmetadata = () => {
          this.video.play();
        };
      });
  }

  returnHome(){
    //Navigating to the live stream
    try {
      this.router.navigate(['']);
    } catch(err) {
      console.log("Could not redirect to live feed: " + err.message);
    }
  }
}
