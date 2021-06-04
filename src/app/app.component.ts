import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AuthService } from './auth/auth-service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'TransThird';
  isCollapsed = true;
  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  userName: string = localStorage.getItem("currentUser");

  constructor(private dialog: MatDialog,private service: AuthService){

  }


  onLoginClicked(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "500px";
    this.dialog.open(LoginComponent,dialogConfig);
  }

  onLogoutClicked(){
    this.service.logout();
  }

  isLoggedIn(){
    if(localStorage.getItem("currentUser") != undefined){
      return true;
    }else{
      return false;
    } 
  }

  isAdmin(){
    let temp =localStorage.getItem("currentUser");
    if(temp != undefined && temp == "laxman@gmail.com"){
      return true;
    }
    else{
      return false;
    }
  }

  getProfileName(){
    if(this.isLoggedIn()){
      return localStorage.getItem("currentUserName");
    }
    return "SignIn";
  }
  
}
