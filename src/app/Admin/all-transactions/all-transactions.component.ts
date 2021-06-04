import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth-service';

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
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {

  myTrans: myTransaction;
  ELEMENT_DATA: PeriodicElement[] ;
  datasource;
  updateTrans: any;

  displayedColumns: string[] = ['paymentId', 'source', 'destination', 'date','busNumber','totalSeats','status'];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
