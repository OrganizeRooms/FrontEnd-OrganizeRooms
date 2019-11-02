import { Pessoa } from './pessoa';
import { Sala } from './sala';
import { Equipamento } from './equipamento';
import { Participante } from './participante';

export interface Agendamento {
    ageId: number;
    ageAssunto: string;
    ageDescricao: string;
    ageSala: Sala;
    agePesResponsavel: Pessoa;
    ageStatus: string;
    ageData: Date;
    ageHoraInicio: Date;
    ageHoraFim: Date;
    agePesCadastro: Pessoa;
    agePesAtualizacao: Pessoa;
    ageDtCadastro: Date;
    ageDtAtualizacao: Date;
    ageEquipamentos: Array<Equipamento>;
    ageParticipantes: Array<Participante>
}