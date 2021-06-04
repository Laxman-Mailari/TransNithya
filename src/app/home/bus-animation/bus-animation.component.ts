import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus-animation',
  templateUrl: './bus-animation.component.html',
  styleUrls: ['./bus-animation.component.css']
})
export class BusAnimationComponent implements OnInit {

  bus1 = '../assets/img/Bus3.png';
  bus2 = '../assets/img/Bus3.png';

  constructor() { }

  ngOnInit(): void {
  }

}
