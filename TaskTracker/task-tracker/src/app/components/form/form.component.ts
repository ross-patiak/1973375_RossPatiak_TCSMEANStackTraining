import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataServiceService } from '../../services/data-service.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  parentForm:FormGroup;

  
  constructor(private dataService: DataServiceService, private fb:FormBuilder) { }

  ngOnInit(): void {

    this.parentForm = this.fb.group({
      id: '',
      name: '',
      task: '',
      deadline: new Date() //has to be Date type because matDatepicker returns Date
    });

  }

  onSubmit() {
    const task = this.parentForm.value;

    //post this Object onto server
    this.dataService.postTask(task);

    //reload the window to refresh UI
    window.location.reload();

  } 

}
