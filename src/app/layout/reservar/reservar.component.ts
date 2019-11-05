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
    UnidadeService, OrganizeRoomsService, SalaService, SessionStorageService, PessoaService,
    EquipamentoService, AgendamentoService, Agendamento, Pessoa, Equipamento, Participante, AgendamentoContext
} from 'src/app/shared';

// Metodos
//import { montarStringDataHora, montarStringDataEng, montarDataHora } from 'src/app/shared/utils';

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
    agendado = false;

    // Modal Participantes
    displayedColumnsParticipantes: string[] = ['selecionar', 'pesNome', 'pesUnidade', 'obrigatorio'];
    listPessoas = new MatTableDataSource<any>();
    pessoasSelecionadas = new SelectionModel<Pessoa>(true, []);

    filtrosModalPartic: FormGroup;

    // Modal Equipamentos
    displayedColumnsEquipamentos: string[] = ['selecionar', 'equNome', 'equDescricao'];
    listEquipamentos = new MatTableDataSource<any>();
    equipamentosSelecionados = new SelectionModel<Equipamento>(true, []);

    filtrosModalEquip: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private calendar: NgbCalendar,
        private modal: NgbModal,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService,
        private salaService: SalaService,
        private agendamentoService: AgendamentoService,


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
    }

    ngOnDestroy() {
        this.formAgendar = null;
        this.listUnidades = null;
        this.data = null;
        this.selUnidade = null
        this.lotacao = null;
    }

    // Inicio Métodos Passo 1 - Verificação
    carregarUnidades() {
        this.unidadeService.buscarUnidadesAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    filtrarSalas() {
        this.filtrarValido = this.verificarCampos();

        if (this.filtrarValido) {

            var dataHoraInicio = this.montarStringDataHora(this.data, this.horaInicio)
            var dataHoraFim = this.montarStringDataHora(this.data, this.horaFim)

            var nLotacao;
            if (!this.lotacao) {
                nLotacao = 0;
            } else {
                nLotacao = this.lotacao
            }

            var agendamentoContext: AgendamentoContext = {
                idUnidade: this.selUnidade.uniId,
                lotacao: nLotacao,
                dataAgendamento: this.montarStringDataEng(this.data),
                dataInicial: dataHoraInicio,
                dataFinal: dataHoraFim
            }

            this.agendamentoService.buscarSalasDisponiveis(agendamentoContext).subscribe(ret => {
                if (ret.data != null && ret.data != '') {
                    this.listSalas = ret.data;
                } else {
                    this.listSalas = '';
                }
            });

            this.apareceFiltrar = false;
        }
    }

    // Reload na tela para recarregar os campos
    limpar() {
        //window.location.reload()

        location.reload()
    }

    // Vai para o próximo passo
    next(stepper) {
        this.carregarEquipamentos();
        this.carregarPessoas();

        // Completa o Passo
        stepper.selected.completed = true;
        // Vai para o Próximo
        stepper.next();
    }

    // Verificação dos Campos OBRIGATÓRIOS da Verificação de Disponibilidade das Salas
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

        }*/ else if (this.horaInicio.hour == this.horaFim.hour && this.horaInicio.minute == this.horaFim.minute) {
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
            ageDescricao: [null],
        });
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

    marcarObrigatorio(registro) {
        console.log("marcarObrigatorio")
        console.log(registro)
        console.log(this.pessoasSelecionadas)
        /*if (registro.participanteObrigatorio) {
            registro.participanteObrigatorio = false;
        } else {
            registro.participanteObrigatorio = true;
        }

        console.log(registro.participanteObrigatorio)*/
    }

    carregarEquipamentos() {
        var dataHoraInicio = this.montarStringDataHora(this.data, this.horaInicio)
        var dataHoraFim = this.montarStringDataHora(this.data, this.horaFim)

        var agendamentoContext: AgendamentoContext = {
            idUnidade: this.selUnidade.uniId,
            lotacao: '0',
            dataAgendamento: this.montarStringDataEng(this.data),
            dataInicial: dataHoraInicio,
            dataFinal: dataHoraFim
        }

        this.equipamentoService.buscarEquipamentosDisponiveis(agendamentoContext).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listEquipamentos.data = ret.data;
            }
        })
    }

    realizarReserva(stepper) {

        var nAgeData = this.montarStringDataEng(this.data)
        var dataHoraInicio = new Date(this.montarStringDataHora(this.data, this.horaInicio))
        var dataHoraFim = new Date(this.montarStringDataHora(this.data, this.horaFim))

        var nAgeParticipantes: Array<Participante>;
        if (this.pessoasSelecionadas.hasValue) {
            nAgeParticipantes = this.montaArrayParticipantes();
        } else {
            nAgeParticipantes = null;
        }

        const agendamento: Agendamento = {
            ageId: null,
            ageAssunto: this.formAgendar.value.ageAssunto,
            ageDescricao: this.formAgendar.value.ageDescricao,
            ageSala: this.selSala,
            agePesResponsavel: this.responsavel,
            ageStatus: 'AGENDADO',
            ageData: new Date(nAgeData),
            ageHoraInicio: dataHoraInicio,
            ageHoraFim: dataHoraFim,
            agePesCadastro: this.sessionService.getSessionUser().pessoa.pesId,
            agePesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            ageDtCadastro: new Date(),
            ageDtAtualizacao: new Date(),
            ageEquipamentos: this.equipamentosSelecionados.selected,
            //ageParticipantes: this.pessoasSelecionadas.selected
            ageParticipantes: nAgeParticipantes
        }
        this.agendamentoService.addAgendamento(agendamento).subscribe(ret => {
            if (ret.data != null) {
                this.next(stepper);
                this.agendado = true;
                //alert('Agendamento Realizado com Sucesso!');
            } else {
                alert('Não foi possível Finalizar o Agendamento! Tente novamente.');
            }
        });
    }

    montaArrayParticipantes(): Array<Participante> {

        var participantes = new Array<Participante>()
        this.pessoasSelecionadas.selected.forEach(pessoa => {
            var part: Participante = {
                parId: null,
                parTipo: 1,
                parPessoa: pessoa,
                parAgendamento: null,
            }
            participantes.push(part)
        });

        return participantes
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


    // Pega Data e Hora e retorna um DateTime
    montarDataHora(data, hora): Date {
        var dataHora = new Date(data.year, data.month, data.day, hora.hour, hora.minute, hora.second);
        return dataHora;
    }

    montarStringDataHora(parData, parHora) {

        var mes = this.validarData(parData, 1);
        var dia = this.validarData(parData, 2);
        var hora = this.validarData(parHora, 3);
        var minuto = this.validarData(parHora, 4);

        var dataHora = parData.year + '/' + mes + '/' + dia + ' ' + hora + ':' + minuto + ':00';
        return dataHora;
    }

    montarStringDataEng(data) {

        var mes = this.validarData(data, 1);
        var dia = this.validarData(data, 2);

        var stringData = data.year + '/' + mes + '/' + dia
        return stringData
    }

    montarStringDataPtBr(data) {

        var mes = this.validarData(data, 1);
        var dia = this.validarData(data, 2);

        var stringData = dia + '/' + mes + '/' + data.year
        return stringData
    }

    montarStringHoraMinuto(horaMinuto) {

        var hora = this.validarData(horaMinuto, 3);
        var minuto = this.validarData(horaMinuto, 4);

        var stringHoraMinuto = hora + ':' + minuto
        return stringHoraMinuto
    }

    validarData(valor, tipoValor) {

        var mes;        /// TIPO 1
        var dia;        /// TIPO 2
        var hora;       /// TIPO 3
        var minuto;     /// TIPO 4

        // Mes
        if (tipoValor == 1) {
            if (valor.month < 10) {
                mes = '0' + valor.month
            } else {
                mes = valor.month
            }
            return mes
        }

        // Dia
        if (tipoValor == 2) {
            if (valor.day < 10) {
                dia = '0' + valor.day
            } else {
                dia = valor.day
            }
            return dia
        }

        // Hora
        if (tipoValor == 3) {
            if (valor.hour < 10) {
                hora = '0' + valor.hour
            } else {
                hora = valor.hour
            }
            return hora
        }

        if (tipoValor == 4) {
            if (valor.minute < 10) {
                minuto = '0' + valor.minute
            } else {
                minuto = valor.minute
            }
            return minuto
        }
    }

    // Fim Métodos Passo 2 - Realizar Agendamento
}