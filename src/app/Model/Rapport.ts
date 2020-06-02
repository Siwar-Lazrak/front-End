import { SousModule } from './SousModule';

export class Rapport {
    idRapport: number;
    nomRapport: string;
    descriptionRapport: string;
    idSousModule: number;
    sousmodule: SousModule['idSousModule'];

}
