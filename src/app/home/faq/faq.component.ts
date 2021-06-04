import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  title = 'FAQ';

  @Input()
  multi = false;

  @Input()
  displayMode = 'default'; // or flat

  @Input()
  faqList = [
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking.You can choose your preferred seats. \
      Online bus ticket booking keeps you away from the long queues of the offline ticket counters.\
      You can view plenty of buses and choose an appropriate bus for your travel considering the amenities, reviews, ratings and bus images available.\
      You can choose the preferred bus type (Volvo Bus, AC or Non AC) and also pickup and dropping point and timings.\
      Your tickets can be booked at a reasonable price with multiple payment options."
    },
    {
      question: "Do I need to create an account to book bus ticket on TransNithya?",
      answer: "Yes."
    },
    {
      question: "Can i cancel my ticket at any time?",
      answer: "No"
    },
    {
      question: "what are the payment options that TransNithya accepts?",
      answer: "We accept all payment options to complete your booking like Debit card, Credit card, Net banking and UPI."
    }
  ];
  faqList2 = [
    {
      question: "how many passengers can booked in single trasaction?",
      answer: "Maximum 20 passengers can be booked in single tracsaction"
    },
    {
      question: "Is ID Proof Required for Booking?",
      answer: "No. However it is mandatory to carry one Govt. id card having the same name on ticket"
    },
    {
      question: "Can we change/modify dates after booking?",
      answer: "No. In such cases booking needs to be cancelled and to be rebooked."
    },
    {
      question: "What if i miss the bus? Will i get refund",
      answer: "Refund will not be initialted if you miss the bus. refund is initiated if bus operator is cancel the bus"
    }
  ]
}