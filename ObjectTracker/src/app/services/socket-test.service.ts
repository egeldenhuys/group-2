import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketTestService {

  private url = '192.168.47.37:5000';
  //private url = '127.0.0.1:5000';

  private socket;

  constructor() {
    this.socket = io(this.url);
    console.log(this.socket);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public sendMessage2(name, message) {
    this.socket.emit(name, message);
  }

  public getMessages = () => {
    return new Observable((observer) => {
        this.socket.on('new-message', (message) => {
            observer.next(message);
        });
    });
  }

}
