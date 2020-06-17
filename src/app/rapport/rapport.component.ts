import { Component, OnInit, TemplateRef, Output, Input } from '@angular/core';
import { SousModule } from '../Model/sousModule';
import { Rapport } from '../Model/Rapport';
import { TokenStorageService } from '../service/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { NzModalRef, NzModalService, NzPlacementType } from 'ng-zorro-antd';
import { Module } from '../Model/Module';
import { Tables } from '../Model/Tables';
import { Useraccess } from '../Model/Useraccess';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { Xabscisse } from '../Model/Xabscisse';
import { async } from 'rxjs/internal/scheduler/async';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Yabscisse } from '../Model/Yabscisse';
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
  abs: Xabscisse[];
  absice: any;
 // tslint:disable-next-line:max-line-length
 constructor(private modalService: NzModalService, private userService: UserService, private tokenStorage: TokenStorageService) { }
tableName: string;
i: string;
raport: any;
 values: string[] | null = null;
 isVisible = false;
 tables: any;
 table: any[];
 columns: any[];
 sousmodu: any;
 current = 0;
 index = 'First-content';
 tplModal: NzModalRef;
 tplModalButtonLoading = false;
 submitted = false;
useraccess: Useraccess[];
id: any;
private roles: string[];
username: string;
module: Module[];
idSousModule: number;
sousModule: SousModule[];
rapport: Rapport[];
xabsicce: Xabscisse[];
yabsicce: Yabscisse[];
isLoggedIn = false;
rapports: Rapport = new Rapport();
xabscisse: Xabscisse = new Xabscisse();
yabscisse: Yabscisse = new Yabscisse();
listOfDisplayData: Rapport[] = [];
expandSet = new Set<number>();
isOkLoading = false;
value: string;
isConfirmLoading = false;
    // tslint:disable-next-line:no-inferrable-types
public chartType: string = 'line';
currentPageDataChange($event: Rapport[]): void {
     this.listOfDisplayData = $event;
   }
 pre(): void {
   this.current -= 1;
   this.changeContent();
 }

 next(): void {
   this.current += 1;
   this.changeContent();
  //  this.createRapport();
 }

 done(): void {
   console.log('done');
 }

 changeContent(): void {
   switch (this.current) {
     case 0: {
       this.index = 'First-content';
       break;
     }
     case 1: {
       this.index = 'Second-content';
       break;
     }
     case 2: {
       this.index = 'third-content';
       break;
     }
     default: {
       this.index = 'error';
     }
   }
 }


 open(): void {
   this.isVisible = true;
 }

 handleOk($event: MouseEvent): void {
   console.log('Button ok clicked!', this.values, $event);
   this.isVisible = false;
 }
 handleCancel(): void {
  this.isVisible = false;
}

 showModal(): void {
   this.isVisible = true;
 }
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }


  handleAdd(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancell(): void {
    this.isVisible = false;
  }
  showModal1(): void {
    this.isVisible = true;
  }

ngOnInit(): void {
  this.isLoggedIn = !!this.tokenStorage.getToken();
  if (this.isLoggedIn) {
     const user = this.tokenStorage.getUser();
     this.roles = user.roles;
     this.username = user.username;
     this.id = user.id;
     console.log(this.id);
   }
  if (this.tokenStorage.getToken()) {
       this.userService.getSousmoduleList().subscribe(
         (data: SousModule[]) => {
           this.sousModule = data;
         },
         err => {
           console.log('erreur');
         }
       );
       this.userService.getAlltables().subscribe(
        (data => {
          this.table = data;
        }),
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

       this.userService.getRapportList().subscribe(
      (data: Rapport[]) => {
        this.rapport = data;
        console.log(data);
      },
      err => {
        console.log('erreur');
      }
    );
       this.userService.getAllXabscisse().subscribe(
      (data: Xabscisse[]) => {
        this.xabsicce = data;
        console.log(data);
      },
      err => {
        console.log('erreur');
      }
    );
       this.userService.getAllYabscisse().subscribe(
      (data: Yabscisse[]) => {
        this.yabsicce = data;
        console.log(data);
      },
      err => {
        console.log('erreur');
      }
    );
     }
   }






   getColumn(event) {
    if (this.tokenStorage.getToken()) {
      this.userService.getTablesColumns(event.target.value).subscribe(
        (data => {
          // tslint:disable-next-line:semicolon
          this.columns = data;

        }),
        () => {
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
    const promise = await this.userService.createRapport(this.rapports, this.sousmodu).toPromise();
    console.log('iciiiiii' + promise);
    this.raport = promise;
    return promise ;

    // console.log('laaalalla' + this.raport)
    // Promise.resolve(this.raport);
   }
   myFnct2 = async () => {
    const promise2 = await this.userService.createXabscisse(this.xabscisse, await this.myFnct()).toPromise();
    console.log('adddddddddddd' + promise2);
    this.absice = promise2;
    return promise2;
  }

  destroyTplModal() {
     if (this.tokenStorage.getToken()) {
       this.isLoggedIn = true;
       this.tplModalButtonLoading = true;
       setTimeout(() => {
         this.tplModalButtonLoading = false;
         this.tplModal.destroy();
       }, 1000);
      }
    }
   async handleOkK() {
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.userService.createYabscisse(this.yabscisse, await this.myFnct2()).subscribe(
         (data: Yabscisse[]) => {
           this.yabscisse = new Yabscisse();
         },
         err => {
           console.log('erreur');
         }
       );
        this.isConfirmLoading = true;
        setTimeout(() => {
        this.isVisible = false;
        this.isConfirmLoading = false;
      }, 3000);
    }
    }
   onSubmit() {
     this.submitted = true;
     this.destroyTplModal();
     this.handleOkK();
   }
   deleterapport() {

   }


}

