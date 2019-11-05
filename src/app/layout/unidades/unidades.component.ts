import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { UnidadeService, OrganizeRoomsService, SessionStorageService } from '../../shared/_services';

@Component({
    selector: 'app-unidades',
    templateUrl: './unidades.component.html',
    styleUrls: ['./unidades.component.scss'],
    animations: [routerTransition()]
})
export class UnidadesComponent implements OnInit {
    permissao;

    listUnidades;

    displayedColumns: string[] = ['uniId', 'uniNome', 'uniAtiva', 'detalhes'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService
    ) { }

    ngOnInit() {
        this.carregarUnidades();
        this.configurarPaginador();

        this.permissao = this.sessionService.getSessionUser().pessoa.pesPermissao;
    }

    carregarUnidades() {
        this.unidadeService.buscarTodasUnidades().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    editarUnidade(registro) {
        this.organizeRoomsService.setValue(registro);
    }

    excluir(registro){

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