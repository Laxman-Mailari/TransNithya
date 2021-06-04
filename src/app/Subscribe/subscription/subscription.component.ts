import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClicked(){
    this.router.navigate(['/search-for-bus']);
  }

}
