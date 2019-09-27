import { Pessoa } from './pessoa';

export class Notificacao {
    notId: number;
    notTitulo: String;
    notDescricao: string;
    notAtiva: boolean;
    pessoa: Pessoa;
    notDtCadastro: Date;
}