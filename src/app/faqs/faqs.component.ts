import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

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
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    },
    {
      question: "what are advantages of online booking?",
      answer: "There are many advantages of online bus ticket booking."
    }
  ];

}
