import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-crud-operations',
  templateUrl: './crud-operations.component.html',
  styleUrls: ['./crud-operations.component.css']
})
export class CrudOperationsComponent implements OnInit {

  busInfo: FormGroup;
  busAndRouteInfo: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.busInfo = fb.group({
      busNumber: [],
      speed: [],
      runningDate: []
    }),
    this.busAndRouteInfo = fb.group({
      routeNumber: [],
      busNumber: [],
      runningDate: []
    })
   }

  ngOnInit(): void {
  }

  onAddBusSubmit(){
    //console.log(this.busInfo.value);
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    var epoch = moment(this.busInfo.value.runningDate.toDate(), "MM/DD/YYYY HH:mm").valueOf()/1000;
    this.http.post('http://localhost:8080/api/v1/bus',{busNumber: this.busInfo.value.busNumber, speed: this.busInfo.value.speed, runningDate: epoch},{'headers': header, observe: "response",responseType: 'text'})
    .subscribe((res)=>{
      console.log(res);
    })
  }

  onAddRouteSubmit(){
    console.log("route is added");
  }

  onAddRouteToBusSubmit(){
    //console.log(this.busAndRouteInfo.value);
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    var epoch = moment(this.busAndRouteInfo.value.runningDate.toDate(), "MM/DD/YYYY HH:mm").valueOf()/1000;
    this.http.post('http://localhost:8080/api/v1/bus/assignRouteToBus',{routeNumber: this.busAndRouteInfo.value.routeNumber,busNumber: this.busAndRouteInfo.value.busNumber, runningDate: epoch, startTime: "10:00"},{'headers': header, observe: "response",responseType: 'text'})
    .subscribe((res)=>{
      console.log(res);
    })
  }
}
