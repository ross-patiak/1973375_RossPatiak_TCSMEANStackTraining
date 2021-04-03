import { Injectable } from '@angular/core';
import { Question } from '../question';
import { QUESTIONS } from '../question-list';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //gets questions to display for quiz, as well as adds it to sessionStorage to track state
  getQuestions():Question[] {
    //if currentStorage doesnt exist, make it
    if(sessionStorage.getItem("list") === null) {
            
      sessionStorage.setItem("list", JSON.stringify(QUESTIONS));
  
    } else {
      //gets a Question array for homepage component to use from sessionStorage;
      const tmp:Question[] = JSON.parse(sessionStorage.getItem("list"))
      return tmp;
    }
  }

  //puts new Question into sessionStorage
  postQuestion(question:Question) {
    let currentStorage:Question[] = JSON.parse(sessionStorage.getItem("list"));

    currentStorage.push(question);

    sessionStorage.setItem("list", JSON.stringify(currentStorage));
    
  }

}
