import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { EquipamentoService, StorageService, OrganizeRoomsService } from '../../shared/_services';

@Component({
    selector: 'app-equipamentos',
    templateUrl: './equipamentos.component.html',
    styleUrls: ['./equipamentos.component.scss'],
    animations: [routerTransition()]
})
export class EquipamentosComponent implements OnInit {
    permissao;

    listEquipamentos: any[];

    displayedColumns: string[] = ['equId', 'equNome', 'equUnidade', 'equAtiva', 'detalhes'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private equipamentoService: EquipamentoService,
        private organizeRoomsService: OrganizeRoomsService,
        private storageService: StorageService,
    ) { }

    ngOnInit() {
        this.carregarEquipamentos();
        this.configurarPaginador();

        this.permissao = this.storageService.getLocalUser().pessoa.pesPermissao;
    }

    carregarEquipamentos() {
        this.equipamentoService.buscarTodosEquipamentos().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    editarEquipamento(registro) {
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