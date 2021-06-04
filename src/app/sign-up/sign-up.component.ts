import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true;
  signUpForm: FormGroup;

  @Input() token:string;

  constructor(private http: HttpClient, private service: AuthService) { 
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'firstName' : new FormControl(null,[Validators.required]),
        'lastName' : new FormControl(null,[Validators.required]),
        'address' : new FormControl(null,[Validators.required]),
        'mailId' : new FormControl(null,[Validators.required]),
        'password' : new FormControl(null,[Validators.required]),
        'phoneNumber' : new FormControl(null,[Validators.required])
      }) 
    })
  }

  ngOnInit(): void {
  }

  onSubmit(postData:{
        firstName : string,
        lastName : string,
        address : string,
        mailId :string ,
        password : string,
        phoneNumber: string 
  }){
    this.service.registerUser(postData).then(
      (onFullfillment)=>{
      window.alert(onFullfillment);
    },
    (onReject)=>{
      window.alert(onReject.error.message);
    });
  }
}
