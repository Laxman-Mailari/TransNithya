import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @Output() loggedIn = new EventEmitter<boolean>();
  hide = true;
  loginForm: FormGroup;
  token: string;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<any>,
    private service: AuthService) {

  }

  ngOnInit(){
    this.loginForm = new FormGroup({
      'credentials': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'password' : new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit(credentials:{username: string, password: string}){
    this.service.login(credentials).then((onFullfillment)=>{
      //window.alert(onFullfillment);
      //this.loggedIn.emit(true)
    },
    (onReject)=>{
      window.alert(onReject);
    });
    this.onClose();
  }

  onClose(){
    this.loginForm.reset();
    this.dialogRef.close();
  }

}
