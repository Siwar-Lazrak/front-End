import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordVisible = false;
  validateForm: FormGroup;
  isLoginFailed = false;
  errorMessage = '';
  form: any = {};
  email: string;
  password: string;
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]   });
  }
  onSubmit() {
    this.userService.resetPassword(this.form.email, this.form.password).subscribe(
      data => {
        this.isLoginFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;

      }
    );
  }

}
