import { Pessoa } from './pessoa';
import { Unidade } from './unidade';

export interface Equipamento {
    equId: number;
    equNome: string;
    equDescricao: string;
    equAtiva: String;
    equUnidade: Unidade;
    equPesCadastro: Pessoa;
    equDtCadastro: Date;
    equPesAtualizacao: Pessoa;
    equDtAtualizacao: Date;
}