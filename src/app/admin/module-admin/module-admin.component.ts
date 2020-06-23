import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Module } from '../../Model/Module';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import {  FormControl, FormGroup, Validators} from '@angular/forms';
import { Useraccess } from '../../Model/Useraccess';
import { SousModule } from '../../Model/SousModule';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-module-admin',
  templateUrl: './module-admin.component.html',
  styleUrls: ['./module-admin.component.scss']
})
export class ModuleAdminComponent implements OnInit {
//  siwar

moduls: Observable<Module[]>;
deleteMessage = false;
validateForm: FormGroup;
private roles: string[];
 email: any;
username: string;
id: any;
useraccess: any[];
sousModule: SousModule[];
countsousModule: any;
visible = false;
searchValue = '';


mymodule: Module = {
  idModule: null,
  nom: '',
  description: '',
};

  module: Module[];
  isLoggedIn = false;
  modules: Module = new Module();
  submitted = false;
  confirmModal: NzModalRef;
  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  htmlModalVisible = false;
  isConfirmLoading = false;

  mapOfExpandData: { [idModule: string]: boolean } = {};
  // modal update
  isVisible = false;

// tslint:disable-next-line:max-line-length
constructor(private modalService: NzModalService, private userService: UserService, private tokenStorageService: TokenStorageService, private router: Router) { }
expandSet = new Set<number>();
onExpandChange(id: number, checked: boolean): void {
  if (checked) {
    this.expandSet.add(id);
  } else {
    this.expandSet.delete(id);
  }
}
reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.module = this.module.filter((item: Module) => item.nom.indexOf(this.searchValue) !== -1);
}
showModal(): void {
  this.isVisible = true;
}
handleCancel(): void {
  this.isVisible = false;
}


ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.id = user.id;
    console.log(this.id);

    this.userService.getAccessList().subscribe(
      (data) => {
        this.useraccess = data;
        console.log(data);
      });

    this.userService.getSousmoduleList().subscribe(
            (data) => {
              this.sousModule = data;
              this.countsousModule = data.length;
            });
    this.userService.getModuleList().subscribe(
  (data) => {
    this.module = data;
    console.log(data);
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
  this.userService.createModule(this.modules)
    .subscribe(data => console.log(data), error => console.log(error));
  this.modules = new Module();

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


deleteModule(idModule: number) {
  this.userService.deleteModule(idModule)
  .subscribe(
    data => {
      console.log(data);
    },
    error => console.log(error));

}
showConfirm(): void {
  this.confirmModal = this.modalService.confirm({
    nzTitle: 'Do you Want to delete these items?',
    nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',

    nzOnOk: () =>
      new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!')),
  });
}

handleOk(): void {
  this.isConfirmLoading = true;
  setTimeout(() => {
    this.isVisible = false;
    this.isConfirmLoading = false;
  }, 1000);
}

editmodule(module) {
  this.mymodule = module;

}
updateModule() {
  this.userService.updateModule(this.mymodule).subscribe( user => {

  });
  this.isConfirmLoading = true;
}

}
