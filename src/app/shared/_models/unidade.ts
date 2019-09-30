import { Pessoa } from './pessoa';

export interface Unidade {
    uniId: number;
    uniNome: string;
    uniAtiva: boolean;
    pessoaInclusao: Pessoa;
    uniDtCadastro: Date;
    pessoaAtualizacao: Pessoa;
    uniDtAtualizacao: Date;
}