declare var cv: any;

import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-opencv-test',
  templateUrl: './opencv-test.component.html',
  styleUrls: ['./opencv-test.component.css']
})
export class OpencvTestComponent implements OnInit {

  @ViewChild('webcam', { static: true }) 
  webcam: ElementRef<HTMLCanvasElement>;

    // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    let canvasFrame = document.getElementById("canvasFrame"); // canvasFrame is the id of <canvas>
    let context = canvasFrame.getContext("2d");
    let src = new cv.Mat(height, width, cv.CV_8UC4);
    let dst = new cv.Mat(height, width, cv.CV_8UC1);
    const FPS = 30;
    function processVideo() {
        let begin = Date.now();
        context.drawImage(video, 0, 0, width, height);
        src.data.set(context.getImageData(0, 0, width, height).data);
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.imshow("canvasOutput", dst); // canvasOutput is the id of another <canvas>;
        // schedule next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }
    // schedule first one.
    setTimeout(processVideo, 0);

  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
}

  // doStuff() {
  //   let video = document.getElementById('videoInput');
  //   let cap = new cv.VideoCapture(video);

  //   // take first frame of the video
  //   let frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  //   cap.read(frame);

  //   // hardcode the initial location of window
  //   let trackWindow = new cv.Rect(150, 60, 63, 125);

  //   // set up the ROI for tracking
  //   let roi = frame.roi(trackWindow);
  //   let hsvRoi = new cv.Mat();
  //   cv.cvtColor(roi, hsvRoi, cv.COLOR_RGBA2RGB);
  //   cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);
  //   let mask = new cv.Mat();
  //   let lowScalar = new cv.Scalar(30, 30, 0);
  //   let highScalar = new cv.Scalar(180, 180, 180);
  //   let low = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), lowScalar);
  //   let high = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), highScalar);
  //   cv.inRange(hsvRoi, low, high, mask);
  //   let roiHist = new cv.Mat();
  //   let hsvRoiVec = new cv.MatVector();
  //   hsvRoiVec.push_back(hsvRoi);
  //   cv.calcHist(hsvRoiVec, [0], mask, roiHist, [180], [0, 180]);
  //   cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX);

  //   // delete useless mats.
  //   roi.delete(); hsvRoi.delete(); mask.delete(); low.delete(); high.delete(); hsvRoiVec.delete();

  //   // Setup the termination criteria, either 10 iteration or move by atleast 1 pt
  //   let termCrit = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 1);

  //   let hsv = new cv.Mat(video.height, video.width, cv.CV_8UC3);
  //   let hsvVec = new cv.MatVector();
  //   hsvVec.push_back(hsv);
  //   let dst = new cv.Mat();
  //   let trackBox = null;

  //   const FPS = 30;
  //   function processVideo() {
  //       try {
  //           if (!streaming) {
  //               // clean and stop.
  //               frame.delete(); dst.delete(); hsvVec.delete(); roiHist.delete(); hsv.delete();
  //               return;
  //           }
  //           let begin = Date.now();

  //           // start processing.
  //           cap.read(frame);
  //           cv.cvtColor(frame, hsv, cv.COLOR_RGBA2RGB);
  //           cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);
  //           cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);

  //           // apply camshift to get the new location
  //           [trackBox, trackWindow] = cv.CamShift(dst, trackWindow, termCrit);

  //           // Draw it on image
  //           let pts = cv.rotatedRectPoints(trackBox);
  //           cv.line(frame, pts[0], pts[1], [255, 0, 0, 255], 3);
  //           cv.line(frame, pts[1], pts[2], [255, 0, 0, 255], 3);
  //           cv.line(frame, pts[2], pts[3], [255, 0, 0, 255], 3);
  //           cv.line(frame, pts[3], pts[0], [255, 0, 0, 255], 3);
  //           cv.imshow('canvasOutput', frame);

  //           // schedule the next one.
  //           let delay = 1000/FPS - (Date.now() - begin);
  //           setTimeout(processVideo, delay);
  //       } catch (err) {
  //           utils.printError(err);
  //       }
  //   };

  //   // schedule the first one.
  //   setTimeout(processVideo, 0);

  // }
}
