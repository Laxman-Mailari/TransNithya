import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/auth-service';
import { DRMRoute, Seat, SeatStatus, Station, Voyage } from './entities.service';

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
  selector: 'app-master-search',
  templateUrl: './master-search.component.html',
  styleUrls: ['./master-search.component.css']
})
export class MasterSearchComponent implements OnInit {

  public displayedColumns: string[] =
    ['departureDate', 'departureStation', 'arrivalStation'];

  public searchForm: FormGroup;
  public departureDate = '';
  public arrivalStation = '';
  public departureStation = '';

  myTrans: myTransaction;
  ELEMENT_DATA: PeriodicElement[] ;
  dataSource;

  constructor(private service: AuthService) {
  }

  ngOnInit() {
    this.getAllTransactions();
    this.searchFormInit();
    /* Filter predicate used for filtering table per different columns
    *  */
    //this.dataSource.filterPredicate = this.getFilterPredicate();
  }

  getAllTransactions(){
    this.service.getTransactions().then((res: myTransaction)=>{
      this.myTrans = res;
      //console.log(this.myTrans.mailId);
      this.ELEMENT_DATA = [];
      for(var i=0;i<this.myTrans.transaction.length;i++){
        //console.log(this.myTrans.transaction[i]);
        this.ELEMENT_DATA.push({
          paymentId: this.myTrans.transaction[i].paymentId,
          source: this.myTrans.transaction[i].source,
          destination: this.myTrans.transaction[i].destination,
          date: this.myTrans.transaction[i].date,
          busNumber: this.myTrans.transaction[i].busNumber,
          status: this.myTrans.transaction[i].status,
          seatNumbers: this.myTrans.transaction[i].seatNumbers
        }) 
        //console.log(this.ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      }
    },
    (err)=>{
      console.log(err);
    })
  }

  searchFormInit() {
    this.searchForm = new FormGroup({
      arrivalStation: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      departureStation: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      departureDate: new FormControl('')
    });
  }

  /* this method well be called for each row in table  */
  getFilterPredicate() {
    return (row: Voyage, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const departureDate = filterArray[0];
      const departureStation = filterArray[1];
      const arrivalStation = filterArray[2];

      const matchFilter = [];

      // Fetch data from row
      const columnDepartureDate = row.departureDate;
      const columnDepartureStation = row.route.departureStation.name;
      const columnArrivalStation = row.route.arrivalStation.name;

      // verify fetching data by our searching values
      const customFilterDD = columnDepartureDate.toDateString().toLowerCase().includes(departureDate);
      const customFilterDS = columnDepartureStation.toLowerCase().includes(departureStation);
      const customFilterAS = columnArrivalStation.toLowerCase().includes(arrivalStation);

      // push boolean values into array
      matchFilter.push(customFilterDD);
      matchFilter.push(customFilterDS);
      matchFilter.push(customFilterAS);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  applyFilter() {
    const date = this.searchForm.get('departureDate').value;
    const as = this.searchForm.get('arrivalStation').value;
    const ds = this.searchForm.get('departureStation').value;

    this.departureDate = (date === null || date === '') ? '' : date.toDateString();
    this.arrivalStation = as === null ? '' : as;
    this.departureStation = ds === null ? '' : ds;

    // create string of our searching values and split if by '$'
    const filterValue = this.departureDate + '$' + this.departureStation + '$' + this.arrivalStation;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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