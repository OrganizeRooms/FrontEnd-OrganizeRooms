import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { PessoaService } from '../../shared/_services';
import { Pessoa } from '../../shared';

@Component({
    selector: 'app-pessoas',
    templateUrl: './pessoas.component.html',
    styleUrls: ['./pessoas.component.scss'],
    animations: [routerTransition()]
})
export class PessoasComponent implements OnInit {

    listPessoas: any[];
    //listPessoas: Pessoa[];
    displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'dtCadastro'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private pessoaService: PessoaService
    ) { }

    ngOnInit() {
        this.carregarPessoas();
        this.configurarPaginador();
        this.tableData.data = this.listPessoas;
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
    }

    carregarPessoas() {
        //this.listPessoas = this.pessoaService.buscarTodos();
        this.listPessoas = [
            { codigo: 5081, nome: 'João da Silva', unidade: 'Rio de Janeiro', dtCadastro: '19/09/2019' },
            { codigo: 5082, nome: 'Maria Aparecida', unidade: 'São Paulo', dtCadastro: '22/10/2019' },
            { codigo: 5083, nome: 'Felipe Haag', unidade: 'Blumenau', dtCadastro: '19/10/2019' },
            { codigo: 5084, nome: 'Éder Jean Dias', unidade: 'Blumenau', dtCadastro: '31/11/2019' },
            { codigo: 5085, nome: 'Airan Possamai', unidade: 'Blumenau', dtCadastro: '02/12/2019' },
            { codigo: 5086, nome: 'Airan Possamai', unidade: 'Blumenau', dtCadastro: '22/02/2019' },
            { codigo: 5087, nome: 'Éder Jean Dias', unidade: 'Blumenau', dtCadastro: '13/08/2019' },
            { codigo: 5088, nome: 'Éder Jean Dias', unidade: 'Blumenau', dtCadastro: '25/02/2019' },
            { codigo: 5089, nome: 'Felipe Haag', unidade: 'Blumenau', dtCadastro: '02/04/2019' },
            { codigo: 5090, nome: 'Felipe Haag', unidade: 'Blumenau', dtCadastro: '20/07/2019' },
            { codigo: 5091, nome: 'João da Silva', unidade: 'Rio de Janeiro', dtCadastro: '13/08/2019' },
            { codigo: 5092, nome: 'João da Silva', unidade: 'Rio de Janeiro', dtCadastro: '13/09/2019' },
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