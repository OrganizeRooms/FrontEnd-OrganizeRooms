import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    OrganizeRoomsService, SessionStorageService, PessoaService, EquipamentoService, AgendamentoService, Agendamento, Participante, Equipamento, Pessoa
} from 'src/app/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ParticipanteService } from 'src/app/shared/_services/participante.service';

@Component({
    selector: 'app-agendamentos-detalhes',
    templateUrl: './agendamentos-detalhes.component.html',
    styleUrls: ['./agendamentos-detalhes.component.scss'],
    animations: [routerTransition()],
})

export class AgendamentosDetalhesComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;

    selAgendamento;
    selUnidade;
    formAgendamento: FormGroup;
    ageParticipantes;
    ageEquipamentos;
    selAgeStatus;

    // Modal Participantes
    displayedColumnsParticipantes: string[] = ['selecionar', 'pesId', 'pesNome', 'pesUnidade'];
    listPessoas = new MatTableDataSource<any>();
    pessoasSelecionadas = new SelectionModel<Pessoa>(true, []);

    filtrosModalPartic: FormGroup;

    // Modal Equipamentos
    displayedColumnsEquipamentos: string[] = ['selecionar', 'equId', 'equNome', 'equUnidade'];
    listEquipamentos = new MatTableDataSource<any>();
    equipamentosSelecionados = new SelectionModel<Equipamento>(true, []);

    filtrosModalEquip: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private modal: NgbModal,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService,
        private pessoaService: PessoaService,
        private equipamentoService: EquipamentoService,
        private agendamentoService: AgendamentoService,
        private participanteService: ParticipanteService
    ) { }

    ngOnInit() {
        this.selAgendamento = this.organizeRoomsService.getValue()

        this.criarFormulario();
        this.carregarListas();
        this.carregarPessoas();
        this.carregarEquipamentos();

        this.permissao = this.sessionService.getSessionUser().pessoa.pesPermissao;
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    criarFormulario() {
        if (this.selAgendamento != null) {
            this.formAgendamento = this.formBuilder.group({
                ageId: [this.selAgendamento.ageId],
                ageAtiva: [this.selAgendamento.ageAtiva],
                ageData: [this.selAgendamento.ageData],
                ageAssunto: [this.selAgendamento.ageAssunto, Validators.compose([Validators.required])],
                ageDescricao: [this.selAgendamento.ageDescricao],
                ageDtCadastro: [this.selAgendamento.ageDtCadastro]
            });
            this.selAgeStatus = this.selAgendamento.ageStatus;
        }
    }

    carregarListas() {
        this.ageParticipantes = this.selAgendamento.ageParticipantes;
        this.ageEquipamentos = this.selAgendamento.ageEquipamentos;
    }

    abrirModal(modal) {
        this.modal.open(modal)
    }

    // temporario
    carregarPessoas() {
        this.pessoaService.buscarTodasPessoas().subscribe(ret => {
            this.listPessoas.data = ret.data
        });
    }

    carregarEquipamentos() {

        /*this.equipamentoService.buscarEquipamentosDisponiveis(
            this.selAgendamento.ageHoraInicio, this.selAgendamento.ageHoraFim, this.selAgendamento.ageSala.salaUnidade
        ).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listEquipamentos.data = ret.data;
            }
        })*/

        this.equipamentoService.buscarTodosEquipamentos().subscribe(ret => {
            this.listEquipamentos.data = ret.data;
        });
    }

    atualizarReserva() {

        const agendamento: Agendamento = {
            ageId: this.selAgendamento.ageId,
            ageAtiva: this.formAgendamento.value.ageAtiva,
            ageAssunto: this.formAgendamento.value.ageAssunto,
            ageDescricao: this.formAgendamento.value.ageDescricao,
            ageStatus: this.selAgeStatus,
            agePesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            ageDtAtualizacao: new Date(),
            ageEquipamentos: this.ageEquipamentos,
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

        var error = false;
        this.agendamentoService.atualizarAgendamento(agendamento).subscribe(ret => {
            if (ret.data != null) {
                alert('Agendamento Alterado com Sucesso!');
            } else {
                alert('Não foi possível Atualizar o Agendamento! Tente novamente.');
                error = true;
            }
        });

        /*if (!error) {
            if (this.pessoasSelecionadas.hasValue) {
                var errorAddParticipante = this.adicionarParticipante();
                if (!errorAddParticipante) {
                    alert('Não foi possível inserir os Novos Participantes!\nRecarregue a página e Tente novamente.');
                }
            }
        }*/
    }

    adicionarParticipante() {

        var error = false;
        this.pessoasSelecionadas.selected.forEach(pessoa => {
            var part = {
                parId: null,
                parTipo: 1,
                parPessoa: pessoa,
                parAgendamento: this.selAgendamento
            }
            console.log(part)
            this.participanteService.adicionarParticipante(part).subscribe(ret => {
                if (ret.data != null) {
                    //
                } else {
                    error = true
                }
            });
        });

        return error
    }

    // ---- Inicio Métodos do Modal Participantes

    //**** Metodos Gerais  *******
    inserirNovosParticipantes() {

    }
    // **** FIM Metodos Gerais  *******

    // **** Metodos do Select ******
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelectedPart() {
        const numSelected = this.pessoasSelecionadas.selected.length;
        const numRows = this.listPessoas.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterTogglePart() {
        this.isAllSelectedPart() ?
            this.pessoasSelecionadas.clear() :
            this.listPessoas.data.forEach(rowPart => this.pessoasSelecionadas.select(rowPart));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabelPart(rowPart?: any): string {
        if (!rowPart) {
            return `${this.isAllSelectedPart() ? 'select' : 'deselect'} all`;
        }
        return `${this.pessoasSelecionadas.isSelected(rowPart) ? 'deselect' : 'select'} rowPart ${rowPart.position + 1}`;
    }
    // ---- Fim Métodos do Modal Participantes

    // ---- Inicio Métodos do Modal Equipamentos


    // **** Metodos do Select ******
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelectedEquip() {
        const numSelected = this.equipamentosSelecionados.selected.length;
        const numRows = this.listEquipamentos.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggleEquip() {
        this.isAllSelectedEquip() ?
            this.equipamentosSelecionados.clear() :
            this.listEquipamentos.data.forEach(rowEquip => this.equipamentosSelecionados.select(rowEquip));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabelEquip(rowEquip?: any): string {
        if (!rowEquip) {
            return `${this.isAllSelectedEquip() ? 'select' : 'deselect'} all`;
        }
        return `${this.equipamentosSelecionados.isSelected(rowEquip) ? 'deselect' : 'select'} rowEquip ${rowEquip.position + 1}`;
    }
    // ---- Fim Métodos do Modal Equipamentos
}
