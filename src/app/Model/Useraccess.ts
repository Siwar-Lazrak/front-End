
import { UserModel } from './usermodel';
import { SousModule } from './SousModule';
import { Module } from './Module';

export class Useraccess {

    idaccess: number;
    user: UserModel['id'];
    sousmodule: SousModule['idSousModule'];
    module: Module['idModule'];

}
