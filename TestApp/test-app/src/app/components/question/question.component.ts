import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question:Question;
  @Input() index:number;
  @Input() key:string;
  @Input() parentForm:FormGroup;
  @Output() correctAns = new EventEmitter<any>();
  answers:any;

  
  constructor() { }

  ngOnInit(): void {

    this.answers = Object.values(this.question['answer']);
    this.answers = this.answers.filter(answer => answer['correct'] === true);

    this.correctAns.emit(this.answers[0].option);
    
  }

}
