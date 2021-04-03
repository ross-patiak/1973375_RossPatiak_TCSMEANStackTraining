import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Question } from '../../question';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

    question:Question;
    parentForm:FormGroup;
  

  constructor(private dataService: DataService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    //initialize all question variables
    this.parentForm = this.fb.group({
      questionText: '',
      op1:'',
      op2:'',
      op3:'',
      op4:'',
      correctAns: false
    });
    
  }

  onSubmit() {
    //get all question variables from user input
    const [ questionText, op1, op2, op3, op4, correctAns ] = Object.values(this.parentForm.value);

    //turn question input to a Question object
    this.question = { 
      question: questionText,
      answer:[{option:op1, correct:false}, {option:op2, correct:false}, {option:op3, correct:false}, {option:op4, correct:false}]
    }

    //pick the correct answer
    this.question.answer[Number(correctAns)].correct = true;

    //post question onto full list
    this.dataService.postQuestion(this.question)

    //redirect to homepage to see added question
    this.router.navigateByUrl('/');
  }

}
