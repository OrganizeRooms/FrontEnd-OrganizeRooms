import { Pessoa } from './pessoa';
import { Unidade } from './unidade';

export class Sala {
    salaId: number;
    salaNome: string;
    unidade: Unidade;
    salaLotacao: number;
    salaAtiva: boolean;
    pessoa_inclusao: Pessoa;
    salaDtCadastro: Date;
    pessoa_atualizacao: Pessoa;
    salaDtAtualizacao: Date;
}