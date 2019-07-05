import { Component, OnInit } from '@angular/core';
import { BallService } from 'src/app/services/ball.service';


@Component({
  selector: 'app-ball-test',
  templateUrl: './ball-test.component.html',
  styleUrls: ['./ball-test.component.css']
})
export class BallTestComponent implements OnInit {

  constructor(private ball: BallService) { }

  ngOnInit() {
    console.log('init');
    this.ball.init();
    window['ball'] = this.ball;
  }

}
