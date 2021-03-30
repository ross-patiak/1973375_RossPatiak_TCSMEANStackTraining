import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { Question } from '../../question';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  questions:Question[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.questions = this.dataService.getQuestions();
  }

}
