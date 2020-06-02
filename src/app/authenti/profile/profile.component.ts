import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
import { UserModel } from '../../Model/UserModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  myuser: UserModel = {
  id: null,
  username: '',
  email: '',
  password: ''

};
panels = [
    {
      active: true,
      disabled: false,
      name: 'Username',
    },
    {
      active: false,
      disabled: true,
      name: 'Email'
    },
    {
      active: false,
      disabled: true,
      name: 'Password'
    },
     {
      active: false,
      disabled: true,
      name: 'Role'
    }
  ];
  editStremail: any;
  editStrusername: any;
  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.tokenStorageService.getUser();
    console.log('currect==' + this.currentUser);
    this.editStrusername = this.currentUser.username;
    this.editStremail = this.currentUser.email;
    // this.editStrpassword = this.currentUser.email;
  }
  onSubmit() {

    this.userService.updateUser(this.myuser).subscribe( user => {

    });
  }

}
