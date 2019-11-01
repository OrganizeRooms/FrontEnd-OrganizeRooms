import { Pessoa } from './pessoa';

export interface Participante {
    parId: number;
    parTipo: number;
    parPessoa: Pessoa;
}