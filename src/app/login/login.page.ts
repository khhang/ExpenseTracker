import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private userService: UserService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {}

  async login() {
    try {
      this.userService.isLoggedIn = !!(await this.userService.authorize(
        this.loginForm.get('username').value.trim(),
        this.loginForm.get('password').value
      ).toPromise()).token;
    } catch {
      this.userService.isLoggedIn = false;
    }

    if (this.userService.isLoggedIn) {
      this.router.navigateByUrl('/home');
    }

    this.cdr.markForCheck();
  }

}
