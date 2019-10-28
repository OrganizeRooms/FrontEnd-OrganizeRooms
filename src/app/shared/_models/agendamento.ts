import { Pessoa } from './pessoa';
import { Time } from '@angular/common';
import { Sala } from './sala';

export interface Agendamento {
    ageId: number;
    ageAssunto: string;
    ageDescricao: string;
    ageSala: Sala;
    agePesResponsavel: Pessoa;
    ageStatus: string;
    ageData: Date;
    ageHoraInicio: Time;
    ageHoraFim: Time;
    agePesCadastro: Pessoa;
    agePesAtualizacao: Pessoa;
    ageDtCadastro: Date;
    ageDtAtualizacao: Date;
}