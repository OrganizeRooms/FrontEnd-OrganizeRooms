import { Pessoa } from './pessoa';
import { Time } from '@angular/common';
import { Sala } from './sala';
import { Unidade } from './unidade';

export interface Agendamento {
    ageId: number;
    ageAssunto: string;
    ageDescricao: string;
    sala: Sala;
    unidade: Unidade;
    pessoa_responsavel: Pessoa;
    ageStatus: string;
    ageData: Date;
    ageHoraInicio: Time;
    ageHoraFim: Time;
    pessoa_inclusao: Pessoa;
    pessoa_atualizacao: Pessoa;
    ageDtCadastro: Date;
    ageDtAtualizacao: Date;
}