import { Component, OnInit } from '@angular/core';
import { SocketTestService } from 'src/app/services/socket-test.service';

@Component({
  selector: 'app-socket-test',
  templateUrl: './socket-test.component.html',
  styleUrls: ['./socket-test.component.css']
})
export class SocketTestComponent implements OnInit {

  messages: string[] = [];

  values = '';
  onKey(value: string) {
    this.values = value;
  }

  constructor(private socketService: SocketTestService) { }

  ngOnInit() {

    console.log('gello');
    this.socketService
      .getMessages()
      .subscribe((message: string) => {
        console.log(message);
        this.messages.push(message);
  });

  }

  start() {
    this.socketService.sendMessage2('start', 'ok');

  }

  sendMessage() {
    this.socketService.sendMessage(this.values);
  }


}
