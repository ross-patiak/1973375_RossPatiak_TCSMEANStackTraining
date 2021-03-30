import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


import { Question } from '../../question';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  questions:Question[] = [];
  parentForm:FormGroup;
  testState:Object = {};
  corrAns:number = 0;
  totalQuestions = -1;

  constructor(private dataService: DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
    //gets questions list from dataService then passes this.questions as input for question component
    this.questions = this.dataService.getQuestions();

    this.questions.forEach((question, i) => {
      this.testState['question'+i] = '';
    })

    this.parentForm = this.fb.group(this.testState);
  }

  onSubmit() {
    //returns array of values
    let answers = Object.values(this.parentForm.value);
    this.totalQuestions = answers.length;

    //filters all the correct answers into 1 array
    answers = answers.filter(answer => answer['correct'] === true);

    //outputs score 
    this.corrAns = answers.length;
  }

  onCheck():void {
    console.log(this.parentForm.value);
  }
}
