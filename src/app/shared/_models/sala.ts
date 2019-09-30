import { Pessoa } from './pessoa';
import { Unidade } from './unidade';

export interface Sala {
    salaId: number;
    salaNome: string;
    unidade: Unidade;
    salaLotacao: number;
    salaAtiva: boolean;
    pessoaInclusao: Pessoa;
    salaDtCadastro: Date;
    pessoaAtualizacao: Pessoa;
    salaDtAtualizacao: Date;
}