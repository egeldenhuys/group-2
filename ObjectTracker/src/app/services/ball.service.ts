import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BallService {
  private url = 'ws://192.168.47.226:8777/';
  private canSend = false;

  private ws: WebSocket;

  onopen() {
    this.canSend = true;
    console.log('Socket Opened');
  }

  onclose() {
    this.canSend = false;
    console.log('Socket Closed');
  }

  onmessage(event) {
    console.log('Ball: ' + event.data);
  }

  constructor() {

  }

  init() {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = this.onmessage;
    this.ws.onopen = this.onopen;
    this.ws.onclose = this.onclose;
  }


  sendMessage(msg: string) {
    if (this.canSend) {
      this.ws.send(msg.toUpperCase());
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
    this.sendMessage('`ROLL,${speed},${angle}`');
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
