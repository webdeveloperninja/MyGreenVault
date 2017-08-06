import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ti-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: Router
    ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      email: ['', Validators.required ], 
      password: ['', Validators.required ]
    });
  }

  login(loginForm) {
    let toolObj = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
    };
    this._authenticationService.authenticate(toolObj).subscribe((data) => {
      this._router.navigateByUrl('/');
    }, (err) => {
      console.log('There was an error in login.component', err);
    });
  }

  ngOnInit() {
  }

}
