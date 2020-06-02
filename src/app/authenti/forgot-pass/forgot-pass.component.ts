import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Form, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  form: any = {};
form2: any = {};
  errorMessage = '';
  isLoginFailed = false;
  validateForm: FormGroup;

  // tslint:disable-next-line:ban-types
  email: String;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]]  });
  }
  onSubmit() {
    this.userService.forgotPassword(this.form.email).subscribe(
      data => {
        this.form2 = data;
      },
      err => {
        this.isLoginFailed = true;
      }
    );
  }

}
