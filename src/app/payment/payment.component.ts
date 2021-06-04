import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface paymentDetails{
  sUrl: string,
  fUrl: string,
  key: string,
  hash: string,
  txnId: string
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payuform: any = {};
  disablePaymentButton: boolean = true;
  
  constructor(private http: HttpClient) { }

  confirmPayment() {
    const paymentPayload = {
      email: this.payuform.email,
      name: this.payuform.firstname,
      phone: this.payuform.phone,
      productInfo: this.payuform.productinfo,
      amount: this.payuform.amount,
    }
    var header = new HttpHeaders()
    header = header.set('Authorization',localStorage.getItem('jwt_token'));
    return this.http.post<any>('http://localhost:8080/payment/payment-details', paymentPayload, {'headers':header,observe: 'response'})
    .subscribe((data) => {
      console.log(data);
      this.payuform.txnid = data.body.txnId;
      this.payuform.surl = data.body.surl;
      this.payuform.furl = data.body.furl;
      this.payuform.key = data.body.key;
      this.payuform.hash = data.body.hash;
      this.payuform.service_provider = "payu_paisa";
      this.disablePaymentButton = false;
    }, error1 => {
        console.log(error1);
      })
  }

  ngOnInit(): void {
  }



}
