import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/question';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  @Input() question: Question;

  constructor() { }

  ngOnInit(): void {
    
  }

}
