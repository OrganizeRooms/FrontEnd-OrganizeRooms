import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

// Date Picker
import {
    NgbDateStruct, NgbDatepickerI18n, NgbModal,
    NgbDateParserFormatter, NgbCalendar
} from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n, NgbDateCustomParserFormatter } from 'src/app/shared/utils';

import {
    UnidadeService, OrganizeRoomsService, SalaService,
    SessionStorageService, PessoaService, EquipamentoService
} from 'src/app/shared';

@Component({
    selector: 'app-reservar',
    templateUrl: './reservar.component.html',
    styleUrls: ['./reservar.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class ReservarComponent implements OnInit, OnDestroy {

    // Outros
    today;

    // Verificação de Disponibilidade e Seleção da Sala
    listUnidades;
    selUnidade = null;//= new FormControl(this.storageService.getLocalUser().pessoa.pesUnidade);
    lotacao;
    data: NgbDateStruct;
    horaInicio = { hour: 0, minute: 0, second: 0 };
    horaFim = { hour: 0, minute: 0, second: 0 };
    listSalas;
    selSala; // Sala Selecionada

    filtrarValido: Boolean;
    apareceFiltrar = true;

    // Agendamento
    formAgendar: FormGroup;
    responsavel;

    // Modal Participantes
    displayedColumnsParticipantes: string[] = ['selecionar', 'pesId', 'pesNome', 'pesUnidade'];
    listPessoas = new MatTableDataSource<any>();
    pessoasSelecionadas = new SelectionModel<any>(true, []);

    filtrosModalPartic: FormGroup;

    // Modal Equipamentos
    displayedColumnsEquipamentos: string[] = ['selecionar', 'equId', 'equNome', 'equUnidade'];
    listEquipamentos = new MatTableDataSource<any>();
    equipamentosSelecionados = new SelectionModel<any>(true, []);

    filtrosModalEquip: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService,
        private salaService: SalaService,
        private calendar: NgbCalendar,
        private modal: NgbModal,

        // Temporario
        private pessoaService: PessoaService,
        private equipamentoService: EquipamentoService
    ) { }

    ngOnInit() {
        //  this.carregarSalas();
        this.today = this.calendar.getToday()
        this.data = this.today;
        this.responsavel = this.sessionService.getSessionUser().pessoa;

        this.carregarUnidades();
        this.criarFormularioAgendamento();

        this.filtrosModalPartic = this.formBuilder.group({
            pesId: [null],
        });

        // temporario
        this.carregarPessoas()
        this.carregarEquipamentos()
    }

    ngOnDestroy() {
        this.formAgendar = null;
        this.listUnidades = null;
        this.data = null;
        this.selUnidade = null
        this.lotacao = null;
    }

    // temporario
    carregarPessoas() {
        this.pessoaService.buscarTodasPessoas().subscribe(ret => {
            this.listPessoas.data = ret.data
        });
    }
    carregarEquipamentos() {
        this.equipamentoService.buscarTodosEquipamentos().subscribe(ret => {
            this.listEquipamentos.data = ret.data;
        });
    }
    // FIM temporario

    // Inicio Métodos Passo 1 - Verificação
    carregarUnidades() {
        this.unidadeService.buscarUnidadesAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    filtrarSalas() {
        this.filtrarValido = this.verificarCampos();

        if (this.filtrarValido) {
            var nhoraInicio = new Date(this.data.year, this.data.month, this.data.day,
                this.horaInicio.hour, this.horaInicio.minute, this.horaInicio.second);

            var nhoraFim = new Date(this.data.year, this.data.month, this.data.day,
                this.horaFim.hour, this.horaFim.minute, this.horaFim.second);

            this.salaService.buscarTodasSalas().subscribe(ret => {
                if (ret.data != null && ret.data != '') {
                    this.listSalas = ret.data;
                } else {
                    this.listSalas = '';
                }
            });
            this.apareceFiltrar = false;
        }
    }

    limpar() {
        window.location.reload()
    }

    next(stepper) {
        // complete the current step
        stepper.selected.completed = true;

        // move to next step

        stepper.next();
    }

    verificarCampos(): Boolean {

        var mfiltrarValido = false;

        if (!this.selUnidade) {
            alert('Informe a Unidade!')

        } else if (!this.data) {
            alert('Informe uma Data!')

        } /*else if (this.horaFim.hour != 0 && this.horaFim.minute >= 0
            && this.horaInicio.hour == 0 && this.horaInicio.minute == 0) {
            alert('Informe uma Hora Inicio!')

        } else if (this.horaInicio.hour != 0 && this.horaInicio.minute >= 0
            && this.horaFim.hour == 0 && this.horaFim.minute == 0) {
            alert('Informe uma Hora Fim!')

        }*/ else if (this.horaInicio.hour == this.horaFim.hour) {
            alert('Informe Horas Diferentes!')

        }/* else if ((this.horaInicio.hour >= this.horaFim.hour && this.horaInicio.minute >= this.horaFim.minute)
            && (this.horaInicio.hour >= 0 && this.horaInicio.minute >= 0 && this.horaFim.hour != 0 && this.horaFim.minute >= 0)) {
            alert('Informe uma "Hora Fim" MAIOR que a "Hora Inicio"!')

        }*/ else {
            mfiltrarValido = true
        }
        return mfiltrarValido
    }
    // Fim Métodos Passo 1 - Verificação

    // Inicio Métodos Passo 2 - Realizar Agendamento
    criarFormularioAgendamento() {
        this.formAgendar = this.formBuilder.group({
            ageAssunto: [null, Validators.required],
            ageDescricao: [null, Validators.required],
            //ageHoraInicio: [null],
            //ageHoraFim: [null],
        });
    }

    abrirModal(modal) {
        this.modal.open(modal)
    }

    // ---- Inicio Métodos do Modal Participantes
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

    // Fim Métodos Passo 2 - Realizar Agendamento
}