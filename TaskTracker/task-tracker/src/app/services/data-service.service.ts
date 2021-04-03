import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../task-model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient ) { }

  url:string  = "http://localhost:3000/tasks"
  getTasks() {
    return this.http.get<Task[]>(this.url);
  }

  //takes <any> type because Objects passed to this function will contain a Date type for deadline while Task has it as a string
  postTask(added:any) {
    const headers = { 'content-type': 'application/json'}

    //separate deadline to turn into string so I can post Task object to server
    let { deadline, ...rest } = added
    const tmp = deadline.toDateString();
    deadline = tmp;

    //http.post return Observable so I must subscribe here to finalize changes
    return this.http.post<Task>(this.url, { deadline, ...rest }, {'headers':headers}).subscribe();
  }
}
