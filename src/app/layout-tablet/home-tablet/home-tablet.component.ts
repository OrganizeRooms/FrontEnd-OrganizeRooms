import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { routerTransition } from '../../router.animations';
// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n, NgbDateCustomParserFormatter } from 'src/app/shared/utils';
import { Agendamento, AgendamentoService, SessionStorageService, ParticipanteService, Participante } from 'src/app/shared';

@Component({
    selector: 'app-home-tablet',
    templateUrl: './home-tablet.component.html',
    styleUrls: ['./home-tablet.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class HomeTabletComponent implements OnInit {

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
    ) { }

    ngOnInit() {
        var today = this.calendar.getToday()
        this.data = today;

        this.pessoaLogada = this.sessionService.getSessionUser().pessoa;
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

    verificarStatus(agend) {
        var retorno = false
        if (agend.ageStatus == 'AGENDADO' || agend.ageStatus == 'EM ANDAMENTO') {
            return retorno = true
        }
        return retorno
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

    abrirModal(agend, modalDetalhes) {
        this.selAgendamento = agend;
        this.modal.open(modalDetalhes)
    }
}
