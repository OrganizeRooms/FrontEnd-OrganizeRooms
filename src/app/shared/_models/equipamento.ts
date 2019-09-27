import { Pessoa } from './pessoa';
import { Unidade } from './unidade';

export class Equipamento {
    equId: number;
    equNome: string;
    equDescricao: string;
    unidade: Unidade;
    pes_inclusao: Pessoa;
    equDtCadastro: Date;
    pes_atualizacao: Pessoa;
    equDtAtualizacao: Date;
}