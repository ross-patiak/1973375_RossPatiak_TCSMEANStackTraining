import { Component, OnInit, Input } from '@angular/core';
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

  
  constructor() { }

  ngOnInit(): void {

    
  }

}
