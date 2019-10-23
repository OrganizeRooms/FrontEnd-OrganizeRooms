import { Pessoa } from './pessoa';
import { Unidade } from './unidade';

export interface Sala {
    salaId: number;
    salaNome: string;
    salaLotacao: number;
    salaAtiva: boolean;
    salaPesCadastro: Pessoa;
    salaDtCadastro: Date;
    salaPesAtualizacao: Pessoa;
    salaDtAtualizacao: Date;
    salaUnidade: Unidade;
}