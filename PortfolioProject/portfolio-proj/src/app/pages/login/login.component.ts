import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
//had to add some flags to tsconfig to import JSON files
import userData from '../../data/user-data.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  
  //being on this page means are logged out
  sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
  
  //create sessionStorage for user state if doesn't exist
  if(sessionStorage.getItem("users") === null) {
    sessionStorage.setItem("users", JSON.stringify(userData));
  }

    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });

  }

  onSubmit():void {
    const { email, password } = this.loginForm.value;
    const currentData = JSON.parse(sessionStorage.getItem("users"));
    let user:any = '';
    
    //loop through current user data to see if they are registered
    Object.entries(currentData).forEach(([key, value]) => {
      if(value['email'] === email && value['password'] === password) {
        //user variable here acts as an id param to redirect to the proper user profile
        user = key;
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      }
    });

    //if registered, log them in successfully+redirect to homepage
    if(sessionStorage.getItem("isLoggedIn") === "false") {
      alert('Wrong email or password');
    } else { 
      this.router.navigateByUrl('/home/'+user);
    }

  }
}
