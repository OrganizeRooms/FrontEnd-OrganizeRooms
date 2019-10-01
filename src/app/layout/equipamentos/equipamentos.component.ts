import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { EquipamentoService } from '../../shared/_services';
import { Equipamento } from '../../shared';

@Component({
    selector: 'app-equipamentos',
    templateUrl: './equipamentos.component.html',
    styleUrls: ['./equipamentos.component.scss'],
    animations: [routerTransition()]
})
export class EquipamentosComponent implements OnInit {
    
    listEquipamentos: any[];
    //listEquipamentos: Equipamento[];

    displayedColumns: string[] = ['equiId', 'equiNome', 'unidade', '#'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private equipamentoService: EquipamentoService
    ) { }

    ngOnInit() {
        this.carregarEquipamentos();
        this.configurarPaginador();
        this.tableData.data = this.listEquipamentos;
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
    }

    carregarEquipamentos() {
        //this.listEquipamentos = this.equipamentoService.buscarTodos();
        this.listEquipamentos = [
            { equiId: 50, equiNome: 'Notebook Acer AMD', unidade: 'Blumenau', },
            { equiId: 51, equiNome: 'Notebook DELL i3', unidade: 'São Paulo', },
            { equiId: 52, equiNome: 'Notebook acer AMD', unidade: 'Rio de Janeiro', },
            { equiId: 53, equiNome: 'Mochila Grande', unidade: 'Rio de Janeiro', },
            { equiId: 54, equiNome: 'Mochila Média', unidade: 'Blumenau', },
            { equiId: 55, equiNome: 'Notebook', unidade: 'Blumenau', },
            { equiId: 56, equiNome: 'Projeto aH23', unidade: 'São Paulo', },
            { equiId: 57, equiNome: 'Projeto aH87', unidade: 'Rio de Janeiro', },
            { equiId: 58, equiNome: 'Notebook DELL i3', unidade: 'Blumenau', },
            { equiId: 59, equiNome: 'Notebook', unidade: 'Rio de Janeiro', },
            { equiId: 60, equiNome: 'Notebook', unidade: 'São Paulo', },
            { equiId: 61, equiNome: 'Notebook', unidade: 'Rio de Janeiro', },
            { equiId: 62, equiNome: 'Notebook', unidade: 'Rio de Janeiro', },
            { equiId: 63, equiNome: 'Notebook DELL i5', unidade: 'São Paulo', },
            { equiId: 64, equiNome: 'Projeto 54', unidade: 'Rio de Janeiro', },
        ];
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