import { Component, OnInit } from '@angular/core';

declare var Distance: any;

@Component({
  selector: 'app-distance-test',
  templateUrl: './distance-test.component.html',
  styleUrls: ['./distance-test.component.css']
})
export class DistanceTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(Distance.distance(1, 5, 10, 20));
  }

}
