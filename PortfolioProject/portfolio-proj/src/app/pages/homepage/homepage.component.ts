import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  user:string;
  firstName:string;
  contacts:Array<any>;
  contactForm:FormGroup;

  constructor(private route:ActivatedRoute, private fb:FormBuilder) { 
    //using ActivatedRoute module, get current user from URL param
    this.user = this.route.snapshot.paramMap.get("user");
   }

  ngOnInit(): void {
    //being on this page means are logged out
    sessionStorage.setItem("isLoggedIn", JSON.stringify(true));

    //get all data from current user
    const currentData = JSON.parse(sessionStorage.getItem("users"));
    let { firstName, data } = currentData[this.user];
    this.firstName = firstName;
    this.contacts = data;

    this.contactForm = this.fb.group({
      name: '',
      phone: ''
    });

    
  }

  onSubmit():void {
    const newContact = this.contactForm.value;

    this.contacts.push(newContact);

    let currentData = JSON.parse(sessionStorage.getItem("users"));

    currentData[this.user].data = this.contacts;

    sessionStorage.setItem("users", JSON.stringify(currentData));


  }
}
