import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signin-form',
  templateUrl: './user-signin-form.component.html',
  styleUrls: ['./user-signin-form.component.css']
})
export class UserSigninFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});
  
  @Output()
  formValuesChanged = new EventEmitter<User>();
  
  @Output()
  formSubmitted = new EventEmitter<User>();
  
  registerForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder, private router: Router,private userService: UserService) { }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }
  get username() { return this.registerForm.get('username')!; }

  get uname() { return this.loginForm.get('email')!; }
  get pw() { return this.loginForm.get('password')!; }



  ngOnInit() {
    this.initialState.subscribe(user => {
      this.registerForm = this.fb.group({
        username: [ user.username, [Validators.required] ],
        password: [ user.password, [ Validators.required ] ],
        email: [ user.email, [ Validators.required ] ]
      });
    });
  
    this.registerForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });

    this.initialState.subscribe(user => {
      this.loginForm = this.fb.group({
        uname: [ user.username, [Validators.required] ],
        pw: [ user.password, [ Validators.required ] ]
      });
    });
  
    this.loginForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitRegForm() {
    console.log(this.registerForm.value);
    this.userReg(this.registerForm.value);
  }

  submitLogForm() {
    console.log(this.registerForm.value);
    this.userReg(this.registerForm.value);
  }

  userReg(user: User) {
    this.userService.createUser(user)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
          alert("Successfull");
        },
        error: (error) => {
          alert("Failed to create user");
        }
 });
 
}

userLog(user: User) {
  this.userService.login(user)
    .subscribe({
      next: () => {
        this.router.navigate(['/home']);
        alert("Successfull");
      },
      error: (error) => {
        alert("Failed to create user");
      }
});

}
}