import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TokenStorageService } from '../../service/token-storage.service';
import { SousModule } from '../../Model/sousModule';
import { Observable } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Module } from '../../Model/Module';
import { Useraccess } from '../../Model/Useraccess';
import { findIndex } from 'rxjs/operators';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-sousmod-admin',
  templateUrl: './sousmod-admin.component.html',
  styleUrls: ['./sousmod-admin.component.scss']
})
export class SousmodAdminComponent implements OnInit {
  mysousmodule: SousModule = {
    idSousModule: null,
    nomSousModule: '',
    descriptionSousModule: '',
    idmodule: null,
    module: null,
  };
modulee: number;
  mymodule: Module = {
    idModule: null,
    nom: '',
    description: '',
  };

  confirmModal: NzModalRef;
  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  htmlModalVisible = false;
  disabled = false;
  submitted = false;
  isLoggedIn = false;
  useraccess: Useraccess[];
 roles: string[] = [];
showUserBoard = false;
 currentUser: any;
  // creation sousmodul
  sousmodul: SousModule = new SousModule();
  user: number;
  sousM: any;
  id: any;
  rObjuser: any[];
  modules: Array<Module> = [];
  selectedModule: Module = new Module();
  // lister
  soumodule: any[];
  sousModule: SousModule[];
  module: Module[];
  isVisible = false;
  visible = false;
  searchValue = '';
  isConfirmLoading = false;
  mapOfExpandData: { [key: string]: boolean } = {};
  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NzModalService, private userService: UserService, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute ) { }
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
  this.sousModule = this.sousModule.filter((item: SousModule) => item.nomSousModule.indexOf(this.searchValue) !== -1);
}
  showModal(): void {
    this.isVisible = true;
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
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
       const user = this.tokenStorage.getUser();
       this.roles = user.roles;
       this.id = user.id;
       console.log(this.id);
       this.userService.getSousmoduleList().subscribe(
           (data: SousModule[]) => {
             this.sousModule = data;
           },
           err => {
             console.log('erreur');
           }
         );

       this.userService.getModuleList().subscribe(
          (data: Module[]) => {
            this.module = data;
            console.log(data);
          },
          err => {
            console.log('erreur');
          }
        );
       this.userService.getAccessList().subscribe(
         (data: Useraccess[]) => {
           this.useraccess = data;
           console.log(data);
         },
         err => {
           console.log('erreur');
         }
       );

       this.userService.getaccessByuserId(this.id).subscribe(
        (data) => {
          this.rObjuser = data;
          console.log('useraccs' + this.rObjuser);
          console.log(data);
        },
        err => {
          console.log('erreur');
        }
      );
     }
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
   myFnct = async () => {
      const promise = await  this.userService.createSousmodule(this.sousmodul, this.modulee).toPromise();
      console.log('adddddddddddd' + promise);
      this.sousM = promise;
      console.log('bndejdjejdje' + this.sousM)
      return promise;
  }

  destroyTplModal = async () => {
   this.tplModalButtonLoading = true;
   setTimeout(() => {
        this.tplModalButtonLoading = false;
        this.tplModal.destroy();
      }, 1000);
   this.myFnct2();
  }
  myFnct2 = async () => {
    const promise2 = await this.userService.createUseraccess(this.id, await this.myFnct()).toPromise();
    console.log('adddddddddddd' + promise2);
    return promise2;
}
  onSubmit() {
    this.submitted = true;
  }
  deletesousmodule(idSousModule: number) {
    this.userService.deletesousmodule(idSousModule)
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
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
    this.router.navigate(['/sousmoduleAdmin']);
  }
  editsousmodule(sousModule) {
    this.mysousmodule = sousModule;

  }
  updatesousModule() {
    this.userService.updatesousmodule(this.mysousmodule).subscribe(
       sousModule => {

    });
    this.isConfirmLoading = true;
  }

}
