import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { UnidadeService, OrganizeRoomsService } from '../../shared/_services';
import { Sala, Unidade } from '../../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-unidades',
    templateUrl: './unidades.component.html',
    styleUrls: ['./unidades.component.scss'],
    animations: [routerTransition()]
})
export class UnidadesComponent implements OnInit {

    listUnidades;

    displayedColumns: string[] = ['uniId', 'uniNome', 'uniAtiva', 'detalhes'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService
    ) { }

    ngOnInit() {
        this.carregarUnidades();
        this.configurarPaginador();
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