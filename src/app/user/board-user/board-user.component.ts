import { Component, OnInit, Input, Output, TemplateRef, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { UserModel } from '../../Model/UserModel';
import { Module } from '../../Model/Module';
import { SousModule } from '../../Model/SousModule';
import { Useraccess } from '../../Model/Useraccess';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Rapport } from 'src/app/Model/Rapport';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  time = new Date();
   // avatar
   isVisible = false;

   mysousmodule: SousModule = {
     idSousModule: null,
     nomSousModule: '',
     descriptionSousModule: '',
     idmodule: null,
     module: null,
   };
   mymodule: Module = {
     idModule: null,
     nom: '',
     description: '',
   };

   myrapport: Rapport = {
     idRapport: null,
     nomRapport: '',
     descriptionRapport: '',
     idSousModule: null,
     sousmodule: null,
   };

   tplModal: NzModalRef;
   tplModalButtonLoading = false;
   htmlModalVisible = false;
   disabled = false;
   inputValue: string;
   options: Array<{ value: string; category: string; count: number }> = [];

   size = 'large';
   nb: any;
   countsousModule: any;

   content = '';
   isCollapsed = false;
   private roles: string[];
   isLoggedIn = false;
   showAdminBoard = false;
   showModeratorBoard = false;
   username: string;
   id: any;
   email: any;
   nommodule: string;
   idaccess: any;
   users: UserModel[];
   module: Module[];
   sousModule: SousModule[];
   userModel: UserModel[];
   rapport: Rapport[];
   idSousModule: number;
   useraccess: Useraccess[];
   visible = false;
   nomModule: any;
   modulenb: any;


   open(): void {
     this.visible = true;
   }

   close(): void {
     this.visible = false;
   }

   log(): void {
     console.log('click dropdown button');
   }
   onValueChange(value: Date): void {
     console.log(`Current value: ${value}`);
   }

   onPanelChange(change: { date: Date; mode: string }): void {
     console.log(`Current value: ${change.date}`);
     console.log(`Current mode: ${change.mode}`);
   }
   // tslint:disable-next-line:member-ordering
   data = [{
       name: 'Lily'
     }
   ];
   showModal(): void {
     this.isVisible = true;
   }

   handleOk(): void {
     console.log('Button ok clicked!');
     this.isVisible = false;
   }

   handleCancel(): void {
     console.log('Button cancel clicked!');
     this.isVisible = false;
   }
   onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.options = new Array(this.getRandomInt(5, 15))
      .join('.')
      .split('.')
      // tslint:disable-next-line:variable-name
      .map((_item, idx) => ({
        value,
        category: `${value}${idx}`,
        count: this.getRandomInt(200, 100)
      }));
  }
  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }

  // tslint:disable-next-line:max-line-length
  constructor(private notification: NzNotificationService, private userService: UserService, private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.email = user.email;
      console.log(this.email);
      this.id = user.id;
      console.log(this.id);
    }
    if (this.tokenStorageService.getToken()) {
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
    if (this.tokenStorageService.getToken()) {
            this.isLoggedIn = true;
            this.userService.getSousmoduleList().subscribe(
              (data: SousModule[]) => {
                this.sousModule = data;
                this.countsousModule = data.length;

              },
              err => {
                console.log('siwar');
              }
            );
        }
    if (this.tokenStorageService.getToken()) {
          this.isLoggedIn = true;
          this.userService.getUsersList().subscribe(
        (data: UserModel[]) => {
          this.userModel = data;
          console.log(data);


        },
        err => {
          console.log('lazrkkk');
        }
      );
    }
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.userService.getModuleList().subscribe(
    (data: Module[]) => {
      this.module = data;
      console.log(data);
      this.modulenb = data.length;

    },
    err => {
      console.log('lazrkkk');
    }
  );
}
    if (this.tokenStorageService.getToken()) {
  this.isLoggedIn = true;
  this.userService.getRapportList().subscribe(
    (data: Rapport[]) => {
      this.rapport = data;
      console.log(data);
      this.nb = data.length;

    }
  );
}


  }
  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
