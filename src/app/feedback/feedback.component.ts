import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
// import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  rating1: number = 0;
  rating2: number = 0;
  rating3: number = 0;
  rating4: number = 0;
  rating5: number = 0;

  starCount: number = 5;
  color: string = 'primary';

  constructor() {
  }
  ratingArr = [];

  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick1(rating:number) {
    this.rating1 = rating;
  }

  onClick2(rating:number) {
    this.rating2 = rating;
  }

  onClick3(rating:number) {
    this.rating3 = rating;
  }

  onClick4(rating:number) {
    this.rating4 = rating;
  }

  showIcon1(index:number) {
    if (this.rating1 >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showIcon2(index:number) {
    if (this.rating2 >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showIcon3(index:number) {
    if (this.rating3 >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showIcon4(index:number) {
    if (this.rating4 >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onSubmit(){
    
    window.alert("thank you :)");
    console.log(this.rating1+" "+this.rating2+" "+this.rating3+" "+this.rating4+" "+ document.getElementById("comment").innerHTML)
  }

}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
