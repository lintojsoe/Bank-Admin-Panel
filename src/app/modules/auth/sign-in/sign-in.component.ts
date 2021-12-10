import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes, UtilitiesService } from 'app/shared';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class AuthSignInComponent implements OnInit {
  signInForm: FormGroup;

  get username() {
    return this.signInForm.get('username').value;
  }

  get password() {
    return this.signInForm.get('password').value;
  }

  constructor(
    private utilitiesService: UtilitiesService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['admin@fund.com', [Validators.required, Validators.email]],
      password: ['admin@123', Validators.required],
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }
    if (this.username == 'admin@fund.com' && this.password == 'admin@123') {
      this.utilitiesService.setStorageItem('isLogin', 'true');
      this._router.navigate([AppRoutes.user]);
    } else {
      this.utilitiesService.showErrorToast('Invalid username or password');
    }
  }
}
