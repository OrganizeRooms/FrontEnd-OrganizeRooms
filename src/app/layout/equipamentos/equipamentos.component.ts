import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-equipamentos',
    templateUrl: './equipamentos.component.html',
    styleUrls: ['./equipamentos.component.scss'],
    animations: [routerTransition()]
})
export class EquipamentosComponent implements OnInit {
    listEquipamentos: any[];

    displayedColumns: string[] = ['codigo', 'nome', 'unidade'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor() {
    }

    ngOnInit() {
        this.carregarEquipamentos();
        this.configurarPaginador();
        this.tableData.data = this.listEquipamentos;
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
    }

    carregarEquipamentos() {
        this.listEquipamentos = [
            { codigo: 50, nome: 'Notebook Acer AMD', unidade: 'Blumenau', },
            { codigo: 51, nome: 'Notebook DELL i3', unidade: 'São Paulo', },
            { codigo: 52, nome: 'Notebook acer AMD', unidade: 'Rio de Janeiro', },
            { codigo: 53, nome: 'Mochila Grande', unidade: 'Rio de Janeiro', },
            { codigo: 54, nome: 'Mochila Média', unidade: 'Blumenau', },
            { codigo: 55, nome: 'Notebook', unidade: 'Blumenau', },
            { codigo: 56, nome: 'Projeto aH23', unidade: 'São Paulo', },
            { codigo: 57, nome: 'Projeto aH87', unidade: 'Rio de Janeiro', },
            { codigo: 58, nome: 'Notebook DELL i3', unidade: 'Blumenau', },
            { codigo: 59, nome: 'Notebook', unidade: 'Rio de Janeiro', },
            { codigo: 60, nome: 'Notebook', unidade: 'São Paulo', },
            { codigo: 61, nome: 'Notebook', unidade: 'Rio de Janeiro', },
            { codigo: 62, nome: 'Notebook', unidade: 'Rio de Janeiro', },
            { codigo: 63, nome: 'Notebook DELL i5', unidade: 'São Paulo', },
            { codigo: 64, nome: 'Projeto 54', unidade: 'Rio de Janeiro', },
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

const rangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 de ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
}

