import { Unidade } from './unidade';

export interface Pessoa {
    pesId: number;
    pesEmail: string;
    pesSenha: string;
    pesNome: string;
    pesPermissao: string;
    pesDescricaoPermissao: string;
    pesUnidade: Unidade;
    pesDDD: String;
    pesTelefone: string;

    // SIS = Cadastro manual
    // IMP = Por Importação
    pesTipoInclusao: string;

    pesCadastro: Pessoa;
    pesDtCadastro: Date;

    pesAtualizacao: Pessoa;
    pesDtAtualizacao: Date;
}