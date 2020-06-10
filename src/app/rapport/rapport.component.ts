import { Component, OnInit, TemplateRef } from '@angular/core';
import { SousModule } from '../Model/sousModule';
import { Rapport } from '../Model/Rapport';
import { TokenStorageService } from '../service/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Module } from '../Model/Module';
import { Tables } from '../Model/Tables';
import { Useraccess } from '../Model/Useraccess';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';


const options = [

];


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
  tableName: string;
  column: any;
  responseListeJobTask2: any;
  i: string;
 // tslint:disable-next-line:max-line-length
 constructor(private route: ActivatedRoute, private modalService: NzModalService, private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }
 selectedOS = null;
 validateForm: FormGroup;
 selectedValue = null;
 nzOptions: NzCascaderOption[] = options;
 values: string[] | null = null;
 isVisible = false;
 tables: number;

 table: any[];
 columns: any[];
 tablecolumns: any[];
 sousmodu: number;

 current = 0;
 index = 'First-content';
 confirmModal: NzModalRef;
 tplModal: NzModalRef;
 tplModalButtonLoading = false;
 htmlModalVisible = false;
 disabled = false;
 submitted = false;
useraccess: Useraccess[];
id: any;
private roles: string[];
  email: any;
 username: string;
   module: Module[];
   idtabe: any;

 sousModule: SousModule[];
 rapport: Rapport[];
 isLoggedIn = false;
 rapports: Rapport = new Rapport();
 mapOfExpandData: { [key: string]: boolean } = {};

 // tslint:disable-next-line:align
   isAllDisplayDataChecked = false;
   isOperating = false;
   isIndeterminate = false;
   listOfDisplayData: Rapport[] = [];
   listOfAllData: Rapport[] = [];
   mapOfCheckedId: { [key: string]: boolean } = {};
   numberOfChecked = 0;
   expandSet = new Set<number>();
   isOkLoading = false;
   value: string;
  isConfirmLoading = false;

    // tslint:disable-next-line:no-inferrable-types
 public chartType: string = 'line';

 public chartDatasets: Array<any> = [
   { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
   { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
 ];

 public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

 public chartColors: Array<any> = [
   {
     backgroundColor: 'rgba(105, 0, 132, .2)',
     borderColor: 'rgba(200, 99, 132, .7)',
     borderWidth: 2,
   },
   {
     backgroundColor: 'rgba(0, 137, 132, .2)',
     borderColor: 'rgba(0, 10, 130, .7)',
     borderWidth: 2,
   }
 ];

 public chartOptions: any = {
   responsive: true
 };
 panels = [
   {
     active: true,
     disabled: false,
     name: 'This is panel header 1',
     childPanel: [
       {
         active: true,
         name: 'This is panel header 1-1'
       },
       {
         active: false,
         name: 'This is panel header 1-2'
       }
     ]
   }
 ];
 listOfData = [
   {
     key: '1',
     name: 'Jim Red',
     name_reporting: 18,
     field_name: '0575-22098909',
   },
   {
     key: '2',
     name: 'Jim Red',
     name_reporting: 18,
     field_name: 'eqrqvregre',
   }
 ];
 public chartClicked(e: any): void { }
 public chartHovered(e: any): void { }
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
 showModal2(): void {
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
       this.isLoggedIn = true;
       this.userService.getAccessList().subscribe(
       (data: Useraccess[]) => {
         this.useraccess = data;
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
   destroyTplModal(): void {
     if (this.tokenStorage.getToken()) {
       this.isLoggedIn = true;
       this.tplModalButtonLoading = true;
       setTimeout(() => {
         this.tplModalButtonLoading = false;
         this.tplModal.destroy();
       }, 1000);
     }
   }
   onSubmit() {
     this.submitted = true;
   }
   deleterapport() {

   }
}
