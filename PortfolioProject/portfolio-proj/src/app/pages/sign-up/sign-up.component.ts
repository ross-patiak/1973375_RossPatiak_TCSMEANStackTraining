import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  signupForm:FormGroup;

  constructor(private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  
  //being on this page means are logged out
  sessionStorage.setItem("isLoggedIn", JSON.stringify(false));

    this.signupForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });

  }

  onSubmit():void {
    const { firstName, lastName, email, password } = this.signupForm.value;
    const currentData = JSON.parse(sessionStorage.getItem("users"));
    let notRegistered:boolean = true;
    
    //loop through current user data to see if they are registered
    Object.entries(currentData).forEach(([key, value]) => {
      if(value['email'] === email && value['password'] === password) {
        //if registered, log them in successfully+redirect to homepage
        notRegistered = false;
        this.router.navigateByUrl('/login');
        alert('Already registered!');
      }
    });


    //if not registered yet, sign them up
    if(notRegistered) {
      const userKey = "user"+ Object.keys(currentData).length;

      //create user Object to add to sessionStorage
      const newUser = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            data:[]
        }
  
      currentData[userKey] = newUser;

      //will not update JSON bc it is not required
      sessionStorage.setItem("users", JSON.stringify(currentData));
      
      this.router.navigateByUrl('/login');
      alert('Registration Successful!');

    }
   
  }

}
