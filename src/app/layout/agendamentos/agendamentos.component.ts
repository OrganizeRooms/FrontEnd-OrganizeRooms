import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { AgendamentoService, OrganizeRoomsService, SessionStorageService, UnidadeService } from '../../shared/_services';
import { NgbDateStruct, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter, CustomDatepickerI18n, I18n } from 'src/app/shared';

@Component({
    selector: 'app-agendamentos',
    templateUrl: './agendamentos.component.html',
    styleUrls: ['./agendamentos.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class AgendamentosComponent implements OnInit, OnDestroy {
    permissao;

    listUnidades;
    selUnidade = null;
    selAgeStatus;
    dataInicial: NgbDateStruct;
    dataFinal: NgbDateStruct;
    horaInicio = { hour: 0, minute: 0, second: 0 };
    horaFim = { hour: 0, minute: 0, second: 0 };

    filtrarValido: Boolean;
    apareceFiltrar = true;

    // Tabela com os Dados
    displayedColumns: string[] = ['ageAssunto', 'ageData', 'periodo', 'ageStatus', 'detalhes'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private agendamentoService: AgendamentoService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService
    ) { }

    ngOnInit() {
        // this.carregarAgendamentos();
        this.carregarUnidades();
        this.permissao = this.sessionService.getSessionUser().pessoa.pesPermissao;
    }

    ngOnDestroy() {
        this.listUnidades = null;
        this.dataInicial = null;
        this.dataFinal = null;
        this.selUnidade = null
    }

    carregarUnidades() {
        this.unidadeService.buscarUnidadesAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    carregarAgendamentos() {
        this.agendamentoService.buscarTodosAgendamentos().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    filtrarSalas() {
        this.filtrarValido = this.verificarCampos();

        if (this.filtrarValido) {
            this.carregarAgendamentos();

            var idResponsavel = this.sessionService.getSessionUser().pessoa.pesId

            var nDataInicial = new Date(this.montarStringData(this.dataInicial))
            var nDataFinal = new Date(this.montarStringData(this.dataFinal))

            /*this.agendamentoService.buscarPorResponsavel(
                idResponsavel, nDataInicial, nDataFinal, this.selUnidade, this.selAgeStatus
            ).subscribe(ret => {
                this.tableData.data = ret.data;
                this.tableData.paginator = this.paginator;
                this.tableData.sort = this.sort;
            });*/
            this.configurarPaginador();
        }
    }
    
    montarStringData(data){
        var stringData = data.year + '/' + data.month + '/' + data.day
        return stringData
    }

    limpar() {
        window.location.reload()
    }

    editarAgendamento(registro) {
        this.organizeRoomsService.setValue(registro);
    }

    // Verificação dos Campos OBRIGATÓRIOS da Verificação de Disponibilidade das Salas
    verificarCampos(): Boolean {

        var mfiltrarValido = false;

        /*if (!this.selUnidade) {
            alert('Informe a Unidade!')

        } else*/ if (!this.dataInicial) {
            alert('Informe uma Data Inicial!')

        } else if (!this.dataFinal) {
            alert('Informe uma Data Final!')

        }
        else {
            mfiltrarValido = true
        }
        return mfiltrarValido
    }

    aplicarFiltro(valor: string) {
        this.tableData.filter = valor.trim().toLowerCase();
    }

    configurarPaginador() {
        this.paginator._intl.itemsPerPageLabel = 'Itens por Página';
        this.paginator._intl.getRangeLabel = rangeLabel;
        this.paginator.showFirstLastButtons = true;
        this.paginator.pageSizeOptions = [8, 10, 15, 20, 30];
    }
}