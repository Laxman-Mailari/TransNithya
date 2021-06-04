import { CalendarEvent } from 'angular-calendar';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { bus } from '../models/bus';
import { map } from 'rxjs/operators';

interface TripInfo{
    source:string,
    destination: string,
    travelDate: number,
    // busNumber: string
}

interface user{

    address: string,
    firstName: string,
    lastName: string,
    mailId: string,
    password: string,
    phoneNumber: string
}

@Injectable()
export class AuthService {

    private tripInfo: TripInfo = null;
    private selectedSeats: number[];
    private reservation: any ;
    private totalAmount: number;
    private username: string;
    private busNumber: string;
    User: user;

    startTime: number;
    endTime: number;

    constructor(private http: HttpClient){}

    public getToken(): string {
        return localStorage.getItem('jwt_token');
    }

    public getMailId(){
        return this.username;
    }

    public registerUser(userData:{
        firstName : string,
        lastName : string,
        address : string,
        mailId :string ,
        password : string,
        phoneNumber: string 
    }){
        return new Promise((resolve, reject) => {
            var header = new HttpHeaders()
            header = header.set('Authorization',localStorage.getItem('jwt_token'));
            this.http.post('http://localhost:8080/api/v1/user', userData,{'headers':header,observe: 'response',responseType: "text"})
            .subscribe((response)=> {
                console.log(response);
                resolve("registered");
            },
            (err) => {
                reject(err);
                console.log(err);
            })
        })
    }

    public login(loginData:{username: string, password: string}){
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:8080/login', loginData,{observe: 'response',responseType: "text"})
            .subscribe((response) => {
                const keys = response.headers.keys();
                const headers = keys.map(key =>
                    `${key}: ${response.headers.get(key)}`);
                
                localStorage.setItem('jwt_token',headers[0].split(":")[1]);
                localStorage.setItem("currentUser",loginData.username);
                localStorage.setItem("isLoggedIn", "true");
                var header = new HttpHeaders()
                header = header.set('Authorization',localStorage.getItem('jwt_token'));
                this.http.get('http://localhost:8080/api/v1/user/getUser',{'headers':header,observe: 'response',params: {mailId: localStorage.getItem("currentUser")}})
                .subscribe((res)=>{
                    //console.log(res.body);
                    this.setFirstName(res.body);
                },
                (err)=>{
                    console.log(err);
                })

                resolve("successfully logged in");
            },
            (err)=>{
                reject(err.message);
            });
        })
        
    }

    setFirstName(myUser: any){
        localStorage.setItem("currentUserName",myUser.firstName);
    }

    public logout(){
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("currentUser");
        localStorage.setItem("isLoggedIn","false");
    }

    public setTripinfo(searchData:{
        source: string,
        destination: string,
        travelDate: Moment
    }){ 
        return new Promise((resolve,reject) => {
            var epoch = moment(searchData.travelDate.toDate(), "MM/DD/YYYY HH:mm").valueOf()/1000;
            this.tripInfo = {source: searchData.source, destination: searchData.destination, travelDate: epoch} ;
            resolve("done");
        })
    }

    public getTripInfo(){
        if(this.tripInfo != null){
            return this.tripInfo;
        }
        return null;
    }

    public serachForBuses(){
        return new Promise((resolve, reject) => { 
            var header = new HttpHeaders()
            header = header.set('Authorization',localStorage.getItem('jwt_token'));
            this.http.post<bus[]>('http://localhost:8080/api/v1/bus/getAllBuses', this.tripInfo,{'headers':header,observe: 'response'})
            .subscribe((response) => {
                resolve(response.body);
            },
            (err)=>{
                reject(err);
                console.log(err);
            })
        })
    }

    public setSelectedSeats(seat:number[]){
        return new Promise((resolve,reject) => {
            this.selectedSeats = seat;
            resolve("done");
        })
    }

    public getSelectedSeats(){
        return this.selectedSeats;
    }

    public reserveSeats(){
        return new Promise((resolve, reject) => { 
            var header = new HttpHeaders()
            header = header.set('Authorization',localStorage.getItem('jwt_token'));
            console.log(this.reservation);
            this.http.post('http://localhost:8080/api/v1/bus/reserveSeats/'+this.tripInfo.travelDate, this.reservation,{'headers':header,observe: 'response',responseType: "text"})
            .subscribe((response) => {
                resolve(response.body);
            },
            (err)=>{
                reject(err);
                console.log(err);
            })
        })
    }

    public updateReservationInfo(details: {
        source: string,
        destination: string,
        mailId: string,
        phoneNumber: number,
        busNumber: string
        passaengers:{
          seatNumber: number,
          name: string,
          gender: string,
          age: number
        }}){
            this.reservation = details;
        }

    public getReservationInfo(){
        return this.reservation;
    }

    public updateTotalAmount(amount){
        this.totalAmount = amount;
    }

    public getTotalAmount(){
        return this.totalAmount;
    }

    public addTransaction(transaction:{
        mailId: string,
        paymentId: string,
        date: number,
        source: string,
        destination: string,
        busNumber: string,
        numberOfSeats: number
    }){
        return new Promise((resolve, reject) => { 
            var header = new HttpHeaders()
            header = header.set('Authorization',localStorage.getItem('jwt_token'));
            this.http.post('http://localhost:8080/api/v1/bus/transaction', transaction,{'headers':header,observe: 'response',responseType: "text"})
            .subscribe((response) => {
                resolve(response.body);
            },
            (err)=>{
                reject(err);
                console.log(err);
            })
        })
    }

    addCalendarEvent(event: {
        mailId: string,
        events: [{
            source: string,
            destination:string,
            start: number,
            end: number,
            title: string
        }]
    }){
        return new Promise((resolve, reject) => { 
            var header = new HttpHeaders()
            header = header.set('Authorization',localStorage.getItem('jwt_token'));
            this.http.post(
                'http://localhost:8080/api/v1/user/calendarEvent', 
                event,
                {'headers':header,observe: 'response',responseType: "text"})
            .subscribe((response) => {
                resolve(response.body);
            },
            (err)=>{
                reject(err);
                console.log(err);
            })
        })
    }

    getCalendarEvent(){
        return new Promise((resolve, reject) => { 
            var header = new HttpHeaders()
            header = header.set('Authorization',localStorage.getItem('jwt_token'));
            const params = new HttpParams().set('mailId',localStorage.getItem("currentUser"));

            this.http.get('http://localhost:8080/api/v1/user/calendarEvent',{'headers':header,observe: 'response',params: params})
            .subscribe((response) => {
                resolve(response);
            },
            (err)=>{
                reject(err);
            })
        })
    }

    updateBusNumber(busNumber){
        this.busNumber = busNumber;
    }

    getBusNumber(){
        return this.busNumber;
    }

    getTransactions(){
        return new Promise((resolve, reject) => { 
            var header = new HttpHeaders()
            header = header.set('Authorization',localStorage.getItem('jwt_token'));
            this.http.get('http://localhost:8080/api/v1/bus/transaction',{'headers':header,observe: 'response',params: {mailId: localStorage.getItem("currentUser")}})
            .subscribe((response) => {
                resolve(response.body);
            },
            (err)=>{
                reject(err);
            })
        })
    }

    updateTime(t1,t2){
        this.startTime = t1;
        this.endTime = t2;
    }

    getStartTime(){
        return this.startTime;
    }
    getEndTime(){
        return this.endTime;
    }
}