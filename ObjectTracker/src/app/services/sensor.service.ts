import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Sensor } from '../models/sensor.model';
import { Observable, timer } from 'rxjs';
import { SensorResponse } from '../models/sensor-response.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {


  constructor(private http: HttpClient) {
    this.socketCloseListener(null);
  }

  private url = 'ws://192.168.47.197:8080';
  private ws: WebSocket;

  info(msg: string) {
    console.log(`[INFO] [SensorService] ${msg}`);
  }

  error(msg: string) {
    console.error(`[ERROR] [SensorService] ${msg}`);
  }

  // Source: https://stackoverflow.com/questions/13797262/how-to-reconnect-to-websocket-after-close-connection
  // I wrote it myself first but the observable returned still had the old
  // websocket reference

  socketMessageListener = (event) => {
    this.info('Sensor say: ' + event.data);
  };

  socketOpenListener = (event) => {
    this.info('Connected');
    this.ws.send('c');
  };

  socketCloseListener = (event) => {
    if (this.ws) {
      this.error('Disconnected.');
    }
    this.ws = new WebSocket(this.url);
    this.ws.addEventListener('open', this.socketOpenListener);
    // this.ws.addEventListener('message', this.socketMessageListener);
    this.ws.addEventListener('close', this.socketCloseListener);
  };

  // onmessage(event) {
  //   this.info(event.data); // What is Event? Don't worry.. It just works. Trust
  // }

  // NOTE: This might not be reliable error handling
  connect() {
    // console.log("Connecting to sensors...");
    // this.ws = new WebSocket(this.url);

    // this.ws.onopen = () => {
    //   this.info('Socket opened');
    //   this.ws.send("c");
    // };

    // this.ws.onclose = ev => {
    //   this.info('Socket Closed');
    //   this.info(ev.reason);
    //   this.connect();
    // };

    // this.ws.onerror = () => {
    //   this.error('Socket Closed');

    //   setTimeout(() => {
    //     console.log("Reconnecting...");
    //     this.connect();
    //   }, 1000);
    // };

  }

  // TODO: Assign wc.onmessage again after reconnect?
  pollSensors(): Observable<SensorResponse> {
    return new Observable<SensorResponse>((observer) => {
      this.ws.onmessage = (event: MessageEvent) => {
        // console.log("RAW:" + event.data);
        let obj = JSON.parse(event.data);
        // console.log(obj);
        // console.log(event.data as SensorResponse);
        observer.next(obj as SensorResponse);
      };
    });
  }
}
