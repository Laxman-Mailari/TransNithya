import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-bus',
  templateUrl: './delete-bus.component.html',
  styleUrls: ['./delete-bus.component.css']
})
export class DeleteBusComponent implements OnInit {

  busNumber: string;
  routeNumber: string;
  mailId: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
