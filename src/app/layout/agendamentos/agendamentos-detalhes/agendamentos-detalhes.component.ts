import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Unidade, UnidadeService, OrganizeRoomsService, SessionStorageService, PessoaService, EquipamentoService } from 'src/app/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

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

    // Modal Participantes
    displayedColumnsParticipantes: string[] = ['selecionar', 'pesId', 'pesNome', 'pesUnidade'];
    listPessoas = new MatTableDataSource<any>();
    participantesSelecionados = new SelectionModel<any>(true, []);

    filtrosModalPartic: FormGroup;

    // Modal Equipamentos
    displayedColumnsEquipamentos: string[] = ['selecionar', 'equId', 'equNome', 'equUnidade'];
    listEquipamentos = new MatTableDataSource<any>();
    equipamentosSelecionados = new SelectionModel<any>(true, []);

    filtrosModalEquip: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private modal: NgbModal,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService,
        private unidadeService: UnidadeService,
        private pessoaService: PessoaService,
        private equipamentoService: EquipamentoService
    ) { }

    ngOnInit() {
        this.selAgendamento = this.organizeRoomsService.getValue()

        /*if (this.selAgendamento != null && this.selAgendamento.uniPesAtualizacao != null) {
            this.uniPesAtualizacao = this.selAgendamento.uniPesAtualizacao.pesNome;
            this.uniDtAtualizacao = this.selAgendamento.uniDtAtualizacao
        }*/
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
                ageAssunto: [this.selAgendamento.ageAssunto, Validators.compose([Validators.required])],
                ageDescricao: [this.selAgendamento.ageDescricao],
                ageDtCadastro: [this.selAgendamento.ageDtCadastro]
            });
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

    adicionarUnidade() {
        /*
        var cUniPesCadastro;
        var cUniDtCadastro;
        if (this.selAgendamento != null) {
            cUniPesCadastro = this.selAgendamento.uniPesCadastro;
            cUniDtCadastro = this.selAgendamento.uniDtCadastro;
        } else {
            cUniPesCadastro = this.sessionService.getSessionUser().pessoa.pesId;
            cUniDtCadastro = new Date();
        }

        const unidade: Unidade = {
            uniId: this.formAddUnidade.value.uniId,
            uniNome: this.formAddUnidade.value.uniNome,
            uniAtiva: this.formAddUnidade.value.uniAtiva,
            uniPesCadastro: cUniPesCadastro,
            uniDtCadastro: cUniDtCadastro,
            uniPesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            uniDtAtualizacao: new Date(),
        };

        this.unidadeService.adicionarAtualizarUnidade(unidade).subscribe(ret => {
            if (ret.data != null) {
                if (this.selAgendamento == null) {
                    alert('Unidade ' + ret.data.uniNome + ' Adicionada com Sucesso!');
                } else {
                    alert('Unidade ' + ret.data.uniNome + ' Atualizada com Sucesso!');
                }
            }
        });


        // this.open(content);*/
    }

    //   open(content) {
    //      this.modal.open(content)
    //  }

    // ---- Inicio Métodos do Modal Participantes
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelectedPart() {
        const numSelected = this.participantesSelecionados.selected.length;
        const numRows = this.listPessoas.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterTogglePart() {
        this.isAllSelectedPart() ?
            this.participantesSelecionados.clear() :
            this.listPessoas.data.forEach(rowPart => this.participantesSelecionados.select(rowPart));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabelPart(rowPart?: any): string {
        if (!rowPart) {
            return `${this.isAllSelectedPart() ? 'select' : 'deselect'} all`;
        }
        return `${this.participantesSelecionados.isSelected(rowPart) ? 'deselect' : 'select'} rowPart ${rowPart.position + 1}`;
    }
    // ---- Fim Métodos do Modal Participantes

    // ---- Inicio Métodos do Modal Equipamentos
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
