import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { routerTransition } from '../../router.animations';
// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n, NgbDateCustomParserFormatter } from 'src/app/shared/utils';
import { Agendamento, AgendamentoService, SessionStorageService, ParticipanteService, Participante } from 'src/app/shared';

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
        private sessionStorage: SessionStorageService,
        private agendamentoService: AgendamentoService,
        private participanteService: ParticipanteService
    ) { }

    ngOnInit() {
        var today = this.calendar.getToday()
        this.data = today;

        this.pessoaLogada = this.sessionStorage.getSessionUser().pessoa;
        this.carregarAgendamentos();
    }

    carregarAgendamentos() {
        this.agendamentoService.buscarTodosAgendamentos().subscribe(ret => {
            this.listAgendamentos = ret.data;
        });
    }

    /*filtro(data: FormControl) {
        var fdata = new Date(data.value)
        this.listAgendamentosFiltrado = [];
        this.listAgendamentos.forEach(element => {
            if (moment(element.ageData, 'DD/MM/YYYY').toString() == moment(fdata, 'DD/MM/YYYY').toString()) {
                // console.log('5 - Entrou - data elemento = ' + moment(element.ageData, 'DD/MM/YYYY').toString()
                //   + ' data escolhida= ' + moment(fdata, 'DD/MM/YYYY').toString())
                this.listAgendamentosFiltrado.push(element);
            }
        });
    }*/
    aparecer(agend) {

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
    }

    concluirAgendamento(agend) {

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

    abrirModal(agend, modalDetalhes) {
        this.selAgendamento = agend;
        this.modal.open(modalDetalhes)
    }
}
