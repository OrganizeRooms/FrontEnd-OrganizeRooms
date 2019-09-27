import { Pessoa } from './pessoa';

export class Unidade {
    uniId: number;
    uniNome: string;
    uniAtiva: boolean;
    pessoa_inclusao: Pessoa;
    uniDtCadastro: Date;
    pessoa_atualizacao: Pessoa;
    uniDtAtualizacao: Date;
}