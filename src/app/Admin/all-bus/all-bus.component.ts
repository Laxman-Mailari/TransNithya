import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-all-bus',
  templateUrl: './all-bus.component.html',
  styleUrls: ['./all-bus.component.css']
})
export class AllBusComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] ;
  dataSource;
  result;

  displayedColumns: string[] = ['busNumber', 'routeNumber', 'runningDate', 'speed','startTime'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.getAllBuses();
  }

  getAllBuses(){
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    this.http.get('http://localhost:8080/api/v1/bus/getAllBuses',{"headers": header,observe: 'response'})
    .subscribe((res)=>{
      //console.log(res);
      this.result = res.body;
      this.ELEMENT_DATA = [];
      //console.log(this.result);
      for(var i=0;i<this.result.length;i++){
        this.ELEMENT_DATA.push({
          busNumber: this.result[i].busNumber,
          routeNumber: this.result[i].routeNumber,
          runningDate: this.result[i].runningDate,
          speed: this.result[i].speed,
          startTime: this.result[i].startTime
        }) 
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }

  public getDate(date:number){
    return moment(date*1000).format("DD/MM/YYYY");
  }
}

export interface PeriodicElement {
  busNumber: string
  routeNumber: string,
  runningDate: number,
  speed: number,
  startTime: string
}
