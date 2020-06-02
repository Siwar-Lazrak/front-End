import { Component, OnInit, Input, Output, HostListener, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Contact } from './../../Model/Contact';
import { Router } from '@angular/router';
import { Module } from 'src/app/Model/Module';
import { UserModel } from './../../Model/UserModel';

import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';

import { SousModule } from 'src/app/Model/sousModule';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  useer: UserModel;
User: UserModel[];
id: number;
myuser: UserModel = {
  id: null,
  username: '',
  email: '',
  password: ''

};




// modal droit acces
size = 'default';

@Input() user: UserModel;
sousmodule: SousModule[];

users: UserModel[];
isLoggedIn = false;
modules: Module = new Module();
isVisible = false;
isConfirmLoading = false;
listeM: any;
confirmModal: NzModalRef;
tplModal: NzModalRef;
tplModalButtonLoading = false;
htmlModalVisible = false;
disabled = false;

  // *****
  model = new Contact();
  submitted = false;
  error: {};

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  validateForm: FormGroup;
  validateForm2: FormGroup;

  submitForm2(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }



  submitForm(value: any): void {
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    e.preventDefault();
    this.validateForm2.reset();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm2.controls) {
      this.validateForm2.controls[key].markAsPristine();
      this.validateForm2.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  showModal(): void {
    this.isVisible = true;
  }
  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Etes-Vous sûr de vouloir supprimer cet Ustilisateur',
      nzOkText: 'Confirmer',
      nzCancelText: 'Cancel'
    });
  }
  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private formBuilder: FormBuilder, private message: NzMessageService, private router: Router, private tokenStorage: TokenStorageService, private modalService: NzModalService) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]]
    });

    this.validateForm2 = this.formBuilder.group({
      to: [null, [Validators.required]],
      messageSubject: [null, [Validators.required]],
      messageBody: [null, [Validators.required]]
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;

      const children = [];
      for (let i = 10; i < 36; i++) {
        children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
      }
      this.sousmodule = children;

      this.userService.getUsersList().subscribe(
    (data: UserModel[]) => {
      this.users = data;
      console.log(data);
      const nb = data.length;
      console.log(nb);

    },
    err => {
      console.log('erreur');
    }
  );
}


  }
  onSubmit() {
    this.userService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.createBasicMessage();
        this.validateForm.reset();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }


  onSubmitEmail() {
    this.submitted = true;
    return this.userService.sendEmail(this.model).subscribe(
      data => {
        this.model = data;
        console.log('erreur');
        this.createBasicMessageEmail();
        this.validateForm2.reset();
      });
  }


  createBasicMessage(): void {
    this.message.success('User add succ!!');
  }

  createBasicMessageEmail(): void {
    this.message.success('Email send!!');
  }


  createTplModal( tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal(): void {
    this.tplModalButtonLoading = true;
    this.onSubmit();
    this. onSubmitEmail();
    setTimeout(() => {
      this.tplModalButtonLoading = false;
      this.tplModal.destroy();
    }, 1000);

  }

  // tslint:disable-next-line:adjacent-overload-signatures
  onSubmit2() {
    this.submitted = true;
    this.destroyTplModal();
  }

  updateUser() {
    this.userService.updateUser(this.myuser).subscribe( user => {

    });
    this.isConfirmLoading = true;
  }

  delete(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/liste-users']);

        },
        error => console.log(error));
  }
  edituser(user) {
    this.myuser = user;

  }

}
