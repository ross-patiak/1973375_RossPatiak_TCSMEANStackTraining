import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Task } from 'src/app/task-model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Task', 'Deadline'];
  dataSource:Task[] = [];

  constructor(private dataService:DataServiceService) {
   }


  ngOnInit(): void {

    //http.get onInit to get tasks from server
    this.dataService.getTasks().subscribe((response) => {
      //tie response to dataSource which is used by mat-table to display UI
      this.dataSource = response;
    }, (error)=> {
      console.log("Error Occured : " + error);
    });
  }

}
