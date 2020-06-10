import { SousModule } from './SousModule';

export class Rapport {
    idRapport: number;
    nomRapport: string;
    title: string;
    chartType: string;
    descriptionRapport: string;
    idSousModule: number;
    sousmodule: SousModule['idSousModule'];
}
