import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-requested-bus',
  templateUrl: './requested-bus.component.html',
  styleUrls: ['./requested-bus.component.css']
})
export class RequestedBusComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] ;
  dataSource;
  result;

  displayedColumns: string[] = ['mailId', 'source', 'destination', 'date','requiredSeats'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllRFB();
  }

  getAllRFB(){
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    this.http.get('http://localhost:8080/api/v1/bus/requestForBus',{"headers": header,observe: 'response'})
    .subscribe((res)=>{
      
      this.result = res.body;
      this.ELEMENT_DATA = [];
      //console.log(this.result);
      for(var i=0;i<this.result.length;i++){
        this.ELEMENT_DATA.push({
          mailId: this.result[i].mailId,
          source: this.result[i].source,
          destination: this.result[i].destination,
          date: this.result[i].travelDate,
          requiredSeats: this.result[i].numberOfSeats
        }) 
        console.log(this.ELEMENT_DATA);
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      const sortState: Sort = {active: 'date', direction: 'desc'};
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      
    })
  }

  public getDate(date:number){
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
  }

}

export interface PeriodicElement {
  mailId: string
  source: string,
  destination: string,
  date: number,
  requiredSeats: number
}