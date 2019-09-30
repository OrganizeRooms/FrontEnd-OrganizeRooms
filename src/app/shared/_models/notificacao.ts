import { Pessoa } from './pessoa';

export interface Notificacao {
    notId: number;
    notTitulo: String;
    notDescricao: string;
    notAtiva: boolean;
    pessoa: Pessoa;
    notDtCadastro: Date;
}