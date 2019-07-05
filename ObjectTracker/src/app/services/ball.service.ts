import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BallService {
  constructor() {}

  private url = 'ws://marvelous-north-cascades-55646.herokuapp.com:80/';
  private canSend = false;

  private ws: WebSocket;
  info(msg: string) {
    console.log(`[INFO] [BallService]: ${msg}`);
  }

  error(msg: string) {
    console.error(`[ERROR] [SensorService] ${msg}`);
  }

  init() {
    this.info('Init');
    this.ws = new WebSocket(this.url);

    this.ws.onmessage = event => {
      this.info('Ball Says: ' + event.data);
    };

    this.ws.onopen = () => {
      this.canSend = true;
      this.info('Socket Opened');
    };

    this.ws.onerror = (ev) => {
      this.error('Socket closed');

      setTimeout(() => {
        console.log("Reconnecting...");
        this.init();
      }, 1000);
    }

    this.ws.onclose = () => {
      this.canSend = false;
      this.info('Socket Closed');

      this.init(); // Connect
    };
  }

  sendMessage(msg: string) {
    if (this.canSend) {
      this.info('Sending: ' + msg);
      this.ws.send(msg.toUpperCase());
    } else {
      this.info('Unable to send message (canSend = false)');
    }
  }

  connectBall() {
    console.log('CONNECT');
    this.sendMessage('CONNECT');
  }

  disconnectBall() {
    console.log('DISCONNECT');
    this.sendMessage('DISCONNECT');
  }

  stop() {
    console.log('STOP');
    this.sendMessage('STOP');
  }

  roll(speed: number, angle: number) {
    console.log(`ROLL(${speed},${angle})`);
    this.sendMessage(`ROLL,${speed},${angle}`);
  }

  rotate(angle: number) {
    console.log(`ROT(${angle})`);
    this.sendMessage(`ROT,${angle}`);
  }

  calibrate() {
    console.log('CAL');
    this.sendMessage('CAL');
  }
}
