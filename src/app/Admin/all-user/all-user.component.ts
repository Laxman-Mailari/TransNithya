import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] ;
  dataSource;
  result;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['firstName', 'lastName', 'mailId', 'password','phoneNumber'];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    this.http.get('http://localhost:8080/api/v1/user/getAllUser',{"headers": header,observe: 'response'})
    .subscribe((res)=>{
      console.log(res);
      this.result = res.body;
      this.ELEMENT_DATA = [];
      //console.log(this.result);
      for(var i=0;i<this.result.length;i++){
        this.ELEMENT_DATA.push({
          firstName: this.result[i].firstName,
          lastName: this.result[i].lastName,
          mailId: this.result[i].mailId,
          password: this.result[i].password,
          phoneNumber: this.result[i].phoneNumber
        }) 
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      const sortState: Sort = {active: 'firstName', direction: 'asc'};
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
    })
  }

}

export interface PeriodicElement {
  firstName: string,
  lastName: string,
  mailId: string,
  password: string,
  phoneNumber: string
}
