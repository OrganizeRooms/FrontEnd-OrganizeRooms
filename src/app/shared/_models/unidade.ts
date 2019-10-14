import { Pessoa } from './pessoa';

export interface Unidade {
    uniId: number;
    uniNome: string;
    uniAtiva: boolean;
    uniPesCadastro: Pessoa;
    uniDtCadastro: Date;
    uniPesAtualizacao: Pessoa;
    uniDtAtualizacao: Date;
}