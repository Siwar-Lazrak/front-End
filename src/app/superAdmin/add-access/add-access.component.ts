
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserModel } from './../../Model/UserModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { Useraccess } from 'src/app/Model/Useraccess';
import { SousModule } from 'src/app/Model/sousModule';
@Component({
  selector: 'app-add-access',
  templateUrl: './add-access.component.html',
  styleUrls: ['./add-access.component.scss']
})
export class AddAccessComponent implements OnInit {
  useraccess: Useraccess[];
  users: UserModel[];
  sousModule: SousModule[];
// creation access
  access: Useraccess = new Useraccess();
  isLoggedIn = false;
  confirmModal: NzModalRef;
  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  htmlModalVisible = false;
  disabled = false;
  submitted = false;
  user: number;
  sousmodu: number;
validateForm: FormGroup;

  isVisible = false;
  isConfirmLoading = false;
  mapOfExpandData: { [key: string]: boolean } = {};
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private userService: UserService,  private router: Router , private tokenStorage: TokenStorageService, private modalService: NzModalService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.userService.getAccessList().subscribe(
        (data: Useraccess[]) => {
          console.log(data);
          this.useraccess = data;
          console.log(data);
        },
        err => {
          console.log('erreur');
        }
      );

  }
    this.userService.getUsersList().subscribe(
    (data: UserModel[]) => {
      this.users = data;
      console.log(data);

    },
    err => {
      console.log('erreur');
    }
  );
    this.userService.getSousmoduleList().subscribe(
    (data: SousModule[]) => {
      console.log(data);
      this.sousModule = data;
      console.log(data);
    },
    err => {
      console.log('erreur');
    }
  );
}

  showModal(): void {
    this.isVisible = true;
  }
  showConfirm(): void {
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Do you Want to delete these sousmodule?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',

      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!')),
    });
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }
  destroyTplModal(): void {


      this.userService.createUseraccess(this.user, this.sousmodu).subscribe(
        data => console.log(data),
        error => console.log(error));

      console.log('iduser === ' + this.user);
      console.log('idsous === ' + this.sousmodu);

      this.tplModalButtonLoading = true;
      setTimeout(() => {
        this.tplModalButtonLoading = false;
        this.tplModal.destroy();
      }, 1000);
    }
     onSubmit() {
    this.submitted = true;
    this.destroyTplModal();
  }


}
