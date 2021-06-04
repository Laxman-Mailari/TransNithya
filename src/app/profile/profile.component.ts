import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myUser: any;
  constructor(private http: HttpClient,private dialog: MatDialog) { }

  ngOnInit(): void {
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    this.http.get('http://localhost:8080/api/v1/user/getUser',{'headers':header,observe: 'response',params: {mailId: localStorage.getItem("currentUser")}})
    .subscribe((res)=>{
        console.log(res.body);
        //this.setFirstName(res.body);
        this.myUser = res.body;
    },
    (err)=>{
        console.log(err);
    })
  }

  onEdit(){
    
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = false;
    // dialogConfig.width = "500px";
    // this.dialog.open(LoginComponent,dialogConfig);
  }

}


