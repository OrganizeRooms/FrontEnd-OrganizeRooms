import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { routerTransition } from '../../router.animations';
// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n, NgbDateCustomParserFormatter } from 'src/app/shared/utils';
import { Agendamento, AgendamentoService, SessionStorageService, ParticipanteService, Participante, AgendamentoContext } from 'src/app/shared';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class HomeComponent implements OnInit {

    // listAgendamentos: Agendamento;
    listAgendamentos;
    data: NgbDateStruct;
    selAgendamento;
    pessoaLogada;

    constructor(
        private modal: NgbModal,
        private calendar: NgbCalendar,
        private sessionService: SessionStorageService,
        private agendamentoService: AgendamentoService,
        private participanteService: ParticipanteService
    ) { }

    ngOnInit() {
        var today = this.calendar.getToday()
        this.data = today;

        this.pessoaLogada = this.sessionService.getSessionUser().pessoa;
        this.filtro();

        //this.carregarAgendamentos();

    }

    carregarAgendamentos() {
        this.agendamentoService.buscarTodosAgendamentos().subscribe(ret => {
            this.listAgendamentos = ret.data;
        });
    }

    filtro() {

        var nData = this.montarStringDataEng(this.data);

        var agendamentoContext: AgendamentoContext = {
            idUnidade: null,
            lotacao: null,
            dataInicial: null,
            dataFinal: null,
            idSala: null,
            // Filtrar por Participante somente utiliza os campos abaixo
            dataAgendamento: nData,
            idParticipante: this.pessoaLogada.pesId,
        }
        this.agendamentoService.buscarAgendamentoDoUsuarioPorDia(agendamentoContext).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listAgendamentos = ret.data
            } else {
                this.listAgendamentos = null;
            }
        })
    }

    verificarPessoa(agePesResponsavel) {
        var retorno = false
        if (this.pessoaLogada.pesId != agePesResponsavel.pesId) {
            return retorno = true
        }
        return retorno
    }

    verificarStatus(agend) {
        var retorno = false
        if (agend.ageStatus == 'AGENDADO' || agend.ageStatus == 'EM ANDAMENTO') {
            return retorno = true
        }
        return retorno
    }

    verificarConfirmacao(agend) {

        var retorno = false
        agend.ageParticipantes.forEach(part => {
            if (part.parPessoa.pesId == this.pessoaLogada.pesId) {
                if (part.parConfirmado == null) {
                    return retorno = true
                }
            }
        });
        return retorno
    }

    aceitarAgendamento(agend) {

        var agendamento = this.gerarNovoAgendamento(agend)
        var part: Participante = {
            parId: null,
            parTipo: null,
            parConfirmado: true,
            parPessoa: this.pessoaLogada,
            parAgendamento: agendamento
        }

        var msg = "Aceito"
        this.alterarParticipante(part, msg)
        location.reload();
    }

    recusarAgendamento(agend) {

        var agendamento = this.gerarNovoAgendamento(agend)

        var part: Participante = {
            parId: null,
            parTipo: null,
            parConfirmado: false,
            parPessoa: this.pessoaLogada,
            parAgendamento: agendamento
        }

        var msg = "Recusado"
        this.alterarParticipante(part, msg)
        location.reload();
    }

    concluirAgendamento(agend) {
        const agendamento: Agendamento = {
            ageId: agend.ageId,
            ageAssunto: agend.ageAssunto,
            ageDescricao: agend.ageDescricao,
            ageStatus: 'CONCLUIDO',
            agePesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            ageDtAtualizacao: new Date(),
            ageEquipamentos: agend.ageEquipamentos,
            // Atributos que não são alterados e possuem trava no BackEnd
            ageDtCadastro: null,
            ageSala: null,
            agePesResponsavel: null,
            ageData: null,
            ageHoraInicio: null,
            ageHoraFim: null,
            agePesCadastro: null,
            ageParticipantes: null
        }
        console.log(agendamento)

        this.agendamentoService.atualizarAgendamento(agendamento).subscribe(ret => {
            if (ret.data != null) {
                alert('Agendamento Concluido com Sucesso!');
                location.reload();
            } else {
                alert('Não foi possível Concluir o Agendamento! Tente novamente.');
            }
        });
    }

    alterarParticipante(participante, msg) {
        this.participanteService.alterarParticipante(participante).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                alert("Agendamento " + msg + " com Sucesso!")
                location.reload()
            } else {
                alert("Agendamento não" + msg + "! Tente novamente.")
            }
        });
    }

    gerarNovoAgendamento(agend): Agendamento {
        let agendamento: Agendamento = {
            ageId: agend.ageId,
            ageAssunto: null,
            ageDescricao: null,
            ageSala: null,
            agePesResponsavel: null,
            ageStatus: null,
            ageData: null,
            ageHoraInicio: null,
            ageHoraFim: null,
            agePesCadastro: null,
            agePesAtualizacao: null,
            ageDtCadastro: null,
            ageDtAtualizacao: null,
            ageEquipamentos: null,
            ageParticipantes: null
        }
        return agendamento
    }

    montarStringDataEng(data) {

        var mes;
        var dia;

        if (data.month < 10) {
            mes = '0' + data.month
        } else {
            mes = data.month
        }

        if (data.day < 10) {
            dia = '0' + data.day
        } else {
            dia = data.day
        }

        var stringData = data.year + '/' + mes + '/' + dia
        return stringData
    }

    abrirModal(agend, modalDetalhes) {
        this.selAgendamento = agend;
        this.modal.open(modalDetalhes)
    }
}
