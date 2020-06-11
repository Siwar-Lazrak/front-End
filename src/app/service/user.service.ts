import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/Model/UserModel';
import { authInterceptorProviders } from './authInterceptorProviders';
import { Contact } from 'src/app/Model/Contact';
import { Module } from 'src/app/Model/Module';
import { SousModule } from 'src/app/Model/sousModule';
import { Useraccess } from 'src/app/Model/Useraccess';
import { Rapport } from 'src/app/Model/Rapport';
import { Tables } from '../Model/Tables';

const API_URL = 'http://localhost:8080/api/test/';
const baseUrl = 'http://localhost:8080/api/test';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Url = 'http://localhost:8080/api/test/user';


  constructor(private http: HttpClient) { }
// dashboard
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getSuperadminBoard(): Observable<any> {
    return this.http.get(API_URL + 'superadmin', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
// user
  register(user): Observable<any> {
    return this.http.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  getUsersList(): Observable<any> {
    return this.http.get<UserModel>(API_URL + 'getAllusers', httpOptions );
  }

  getUser(id): Observable<any> {
    return this.http.get(`${this.Url}/${id}`);
  }
  updateUser(user) {
    return this.http.put(`${API_URL}update/${user.id}`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${API_URL}users/${id}`);
  }
  // email
  getCustomersByEmail(email: string): Observable<any> {
    return this.http.get(`${baseUrl}email/${email}`);
  }

  sendEmail(formdata: Contact) {
    return this.http.post<Contact>(API_URL + 'sendEmailAttechment', formdata, httpOptions);
  }
   // module

  getModuleList(): Observable<any> {
    return this.http.get<Module>(API_URL + 'getAllModuls', httpOptions );
  }

  createModule(module): Observable<any> {
    return this.http.post(API_URL + 'modul', module);
  }

  updateModule(module) {
    return this.http.put(`${API_URL}updateModule/${module.idModule}`, module);
  }
  deleteModule(idModule: number): Observable<any> {
    return this.http.delete(`${API_URL}deleteModule/${idModule}`, { responseType: 'text' });
  }

  getModule(idModule): Observable<any> {
    return this.http.get(`${baseUrl}/getModuleId/${idModule}`);
  }
// sousmodule

createSousmodule(sousmodule, idModule: number): Observable<any> {
  return this.http.post(`http://localhost:8080/api/test/createSousmodule/${idModule}`, sousmodule);
}
 getSousodule(idSousModule: number): Observable<any> {
    return this.http.get(`${baseUrl}/getSousmodule/${idSousModule}`);
  }
getSousmoduleList(): Observable<any> {
  return this.http.get<SousModule>(API_URL + 'getAllSousmodule', httpOptions );
}
deletesousmodule(idSousModule: number): Observable<any> {
  return this.http.delete(`${API_URL}deleteSousmodule/${idSousModule}`, { responseType: 'text' });
}
getsousModule(idModule: number): Observable<any> {
  return this.http.get(`${baseUrl}/getSousmoduleByModule/${idModule}`);
}

// <!--problme-- >
updatesousmodule(sousModule) {
  return this.http.put(`${API_URL}update/${sousModule.idSousModule}`, sousModule);
}
// <!--Access-->
createUseraccess(id: number, idSousModule: number ): Observable<any> {
  return this.http.post(`http://localhost:8080/api/test/createuseraccess/${id}/${idSousModule}`, {});
}


getAccessList(): Observable<any> {
  return this.http.get<Useraccess>(API_URL + 'getAllAccess', httpOptions );
}

// <!--Rapport-->
createRapport(rapport, idSousModule): Observable<any> {
  return this.http.post(`http://localhost:8080/api/test/createRapport/${idSousModule}`, rapport);
}
getRapportList(): Observable<any> {
  return this.http.get<Rapport>(API_URL + 'getAllRapport', httpOptions );
}


// <!--forgot-Password-->
forgotPassword(email: string): Observable<any> {
  return this.http.post(`http://localhost:8080/api/test/forgot-password/${email}`, httpOptions);
}
// <!--confirm-token-->
confirmReset(): Observable<any> {
  return this.http.get(`http://localhost:8080/api/test/confirm-reset`, httpOptions);
}

// <!--reset-token-->
resetPassword(email: string, password: string): Observable<any> {
  return this.http.post(`http://localhost:8080/api/test/reset-password/${email}/${password}`, httpOptions);
}

// <!--gettables-->

getAlltables(): Observable<any> {
  return this.http.get<Tables>(API_URL + 'getAlltables', httpOptions );
}

getTablesColumns(tableName): Observable<any> {
  return this.http.get(API_URL + `getTablesColumns?tableName=${tableName}`, httpOptions );
}

// <!--Xabscisse-->
createXabscisse(Xabscisse, idRapport): Observable<any> {
  return this.http.post(`http://localhost:8080/api/test/createXabscisse/${idRapport}`, Xabscisse);
}
}
