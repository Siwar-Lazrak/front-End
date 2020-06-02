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
sousM: number;
id: any;
  modules: Array<Module> = [];
  selectedModule: Module = new Module();

  // lister
  sousModule: SousModule[];
  module: Module[];
  isVisible = false;
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
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.userService.getSousmoduleList().subscribe(
        (data: SousModule[]) => {
          console.log(data);
          this.sousModule = data;

        },
        err => {
          console.log('erreur');
        }
      );

      this.userService.getModuleList().subscribe(
        (data: Module[]) => {
          this.module = data;
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

  destroyTplModal(): void {
    if (this.tokenStorage.getToken()) {
         this.isLoggedIn = true;
         this.roles = this.tokenStorage.getUser().roles;
         this.id = this.tokenStorage.getUser().id;
         console.log('id user ===' + this.id);

         this.userService.createSousmodule(this.sousmodul, this.modulee).subscribe(
        data => console.log(data),
        error => console.log(error));

         this.sousmodul = new SousModule();

// console.log("id === "+this.modulee)
         this.router.navigate(['sous-module']);

/*partie n7eb n'insérit en mm temps fi useraccess
 if(this.showUserBoard = this.roles.includes('ROLE_USER')) {
     this.userService.createUseraccess(this.id, this.sousM).subscribe(
        data => console.log(data),
        error => console.log(error));
    }; */
         this.tplModalButtonLoading = true;
         setTimeout(() => {
        this.tplModalButtonLoading = false;
        this.tplModal.destroy();
      }, 1000);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.destroyTplModal();
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
    this.router.navigate(['/sous-module']);
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
