import { Injectable } from '@angular/core';
import { Question } from '../question';
import { QUESTIONS } from '../question-list';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getQuestions():Question[] {
    return QUESTIONS;
  }
}
