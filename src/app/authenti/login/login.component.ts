import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisible = false;
  password: string;
  validateForm: FormGroup;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  currentUser: any;

  showAdminBoard = false;
  showUserBoard = false;
  showSuperadminBoard = false;
  username: string;
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]   });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        if (this.isLoggedIn) {
          const user = this.tokenStorage.getUser();
          this.roles = user.roles;
          // tslint:disable-next-line:no-conditional-assignment
          if ( this.showAdminBoard = this.roles.includes('ROLE_ADMIN')) {
            // tslint:disable-next-line:no-unused-expression
            this.router.navigate(['/admin']);
            this.username = user.username;
          } else {
            this.showUserBoard = this.roles.includes('ROLE_USER');
            this.router.navigate(['/user']);
            this.username = user.username;
          }

        }

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log('eroor');
      }
    );
  }
  reloadPage() {
    window.location.reload();
  }

}
