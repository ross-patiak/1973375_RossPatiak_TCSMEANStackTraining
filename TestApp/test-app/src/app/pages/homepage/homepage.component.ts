import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


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
  corrAns:number = -1;
  totalQuestions = -1;
  submitted:boolean = false;
  allAns:string[]=[];
  wrongAns:boolean[]=[];

  constructor(private dataService: DataService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    //gets questions list from dataService then passes this.questions as input for question component
    this.questions = this.dataService.getQuestions();
    
    //create keys for parentForm then initailize them
    this.questions.forEach((question, i) => {
      this.testState['question'+i] = '';
    })

    //finish initializing parentForm values 
    this.parentForm = this.fb.group(this.testState);
  
    this.questions.forEach(question => {
      let tmp = Object.values(question['answer']);
      tmp = tmp.filter(answer => answer['correct'] === true);

      this.allAns.push(tmp[0].option);
    });
    
  }

  onSubmit() {
    //returns array of values
    let answers = Object.values(this.parentForm.value);

    //track all wrong answers into wrongAns
    answers.forEach(answer => this.wrongAns.push(!answer['correct']));
    
    this.totalQuestions = answers.length;

    //filters all the correct answers into 1 array
    answers = answers.filter(answer => answer['correct'] === true);

    //outputs score 
    this.corrAns = answers.length;

    this.submitted = true;
  }

  //redirects to add-question form
  onAdd():void {
    this.router.navigateByUrl('/add-form');
  }


  //display result string
  resultString(i:number):string {
    if(this.wrongAns[i]) { 
      return "Correct Answer: " + this.allAns[i];
    }
    return "Correct!";

  }

  //conditionally assigns color to question result; wrong=red, right=green
  getStyles(i:number):string {
    if(this.wrongAns[i]) {
      return 'red';
    }
  
    return 'green';
  }
}//end of class
