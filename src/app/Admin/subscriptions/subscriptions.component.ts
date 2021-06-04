import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] ;
  dataSource;
  result;

  displayedColumns: string[] = ['mailId','busNumber', 'source', 'destination', 'date','noOfpeople','noOfDays'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllRFB();
  }

  getAllRFB(){
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    this.http.get('http://localhost:8080/api/v1/bus/subscription',{"headers": header,observe: 'response'})
    .subscribe((res)=>{
      //console.log(res.body);
      this.result = res.body;
      this.ELEMENT_DATA = [];
      //console.log(this.result); ticketEvent startDate
      for(var i=0;i<this.result.length;i++){
        this.ELEMENT_DATA.push({
          mailId: this.result[i].reserveSeat.mailId,
          busNumber: this.result[i].reserveSeat.busNumber,
          source: this.result[i].reserveSeat.source,
          destination: this.result[i].reserveSeat.destination,
          date: this.result[i].startDate,
          noOfpeople: this.result[i].reserveSeat.passengers.length,
          noOfDays: this.result[i].ticketEvent.events.length
        }) 
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      
    })
  }

  public getDate(date:number){
    return moment(date*1000).format("DD/MM/YYYY");
  }

}

export interface PeriodicElement {
  mailId: string,
  busNumber: string,
  source: string,
  destination: string,
  date: number,
  noOfpeople: number,
  noOfDays: number
}
