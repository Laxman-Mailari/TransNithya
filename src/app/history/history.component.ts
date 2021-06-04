import { startOfDay } from 'date-fns';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../auth/auth-service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';

interface Transaction{
  paymentId: string,
  source: string,
  destination: string,
  date: number,
  busNumber: string,
  status: string,
  seatNumbers: number[];
}

interface myTransaction {
  mailId: string,
  transaction: Transaction[]
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {

  myTrans: myTransaction;
  ELEMENT_DATA: PeriodicElement[] ;
  datasource;
  updateTrans: any;
  constructor(private service: AuthService,private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions(){
    this.service.getTransactions().then((res: myTransaction)=>{
      this.myTrans = res;
      this.ELEMENT_DATA = [];
      for(var i=0;i<this.myTrans.transaction.length;i++){
        this.ELEMENT_DATA.push({
          paymentId: this.myTrans.transaction[i].paymentId,
          source: this.myTrans.transaction[i].source,
          destination: this.myTrans.transaction[i].destination,
          date: this.myTrans.transaction[i].date,
          busNumber: this.myTrans.transaction[i].busNumber,
          status: this.myTrans.transaction[i].status,
          seatNumbers: this.myTrans.transaction[i].seatNumbers
        }) 

        this.datasource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;

        const sortState: Sort = {active: 'date', direction: 'desc'};
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      }
    },
    (err)=>{
      console.log(err);
    })
  }

    

  public getDate(date:number){
    return moment(date*1000).format("DD/MM/YYYY HH:mm:ss");
  }
  
  public startOfDay(date:number){
    return moment(moment(date*1000).startOf('day'), "MM/DD/YYYY HH:mm").valueOf()/1000;
  }

  displayedColumns: string[] = ['paymentId', 'source', 'destination', 'date','busNumber','totalSeats','status','cancel'];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    // this.datasource.paginator = this.paginator;
  }

  onCancel(element){
    //window.alert(this.startOfDay(element.date));
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    this.http.post('http://localhost:8080/api/v1/bus/cancelTicket',{busNumber: element.busNumber, travelDate: this.startOfDay(element.date), seatNumbers: element.seatNumbers},{"headers": header, observe: 'response', responseType: "text"})
    .subscribe((res)=>{
      window.alert("success" + res);
      this.updateTrans = {
        mailId: localStorage.getItem("currentUser"),
        transaction : [
          {
            paymentId: element.paymentId,
            date: element.date,
            source: element.source,
            destination: element.destination,
            busNumber: element.busNumber,
            status: "canceled",
            seatNumbers : element.seatNumbers
          }
        ]
      };
      this.http.post('http://localhost:8080/api/v1/bus/updateTransaction',this.updateTrans,{"headers": header, observe: 'response', responseType: "text"})
      .subscribe((res)=>{
        console.log(res);
        this.ngOnInit();
      });

      var myEvent = {
        mailId: localStorage.getItem("currentUser"),
        events: [{
          source: element.source,
          destination: element.destination,
         start: element.date,
         end: element.date,
         title: "TransNithya Ticket"
        }]
      }

      this.http.post('http://localhost:8080/api/v1/user/removeCalendarEvent',myEvent,{"headers": header, observe: 'response', responseType: "text"})
      .subscribe((res)=>{
        console.log(res);
        this.ngOnInit();
      });
    },
    (err)=>{
      window.alert("error" +err);
    });
  }

  isDisabled(element){
    let today = moment().startOf('day'); 
    var epoch = moment(today, "MM/DD/YYYY HH:mm").valueOf()/1000;
    //console.log(element.status + " " + element.date);
    if(element.status === "canceled" || element.date <= epoch){
      return true;
    }
    return false;
  }

  isPastJourney(element){
    let today = moment().startOf('day'); 
    var epoch = moment(today, "MM/DD/YYYY HH:mm").valueOf()/1000;
    if(element.date > epoch){
      return true;
    }
    return false;
  }

  isCanceled(element){
    if(element.status === "canceled"){
      return false;
    }
    return true;
  }
}

export interface PeriodicElement {
  paymentId: string,
  source: string,
  destination: string,
  date: number,
  busNumber: string,
  status: string,
  seatNumbers: number[]
}


