import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { UnidadeService } from '../../shared/_services';
import { Sala } from '../../shared';

@Component({
    selector: 'app-unidades',
    templateUrl: './unidades.component.html',
    styleUrls: ['./unidades.component.scss'],
    animations: [routerTransition()]
})
export class UnidadesComponent implements OnInit {

    listUnidades: any[];
    //listUnidades: Sala[];

    displayedColumns: string[] = ['uniId', 'uniNome', 'uniAtiva', '#'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private unidadeService: UnidadeService,
    ) {
    }

    ngOnInit() {
        this.carregarUnidades();
        this.configurarPaginador();
        this.tableData.data = this.listUnidades;
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
    }

    carregarUnidades() {
        //this.listUnidades = this.unidadeService.buscarTodos();
        this.listUnidades = [
            {
                uniId: 1,
                uniNome: 'Rio de Janeiro',
                uniAtiva: true,
                pessoaInclusao: '',
                uniDtCadastro: new Date("27/09/2019"),
                pessoaAtualizacao: '',
                uniDtAtualizacao: new Date("27/09/2019"),
            },
            {
                uniId: 2,
                uniNome: 'Blumenau',
                uniAtiva: true,
                pessoaInclusao: '',
                uniDtCadastro: new Date("27/09/2019"),
                pessoaAtualizacao: '',
                uniDtAtualizacao: new Date("27/09/2019"),
            },
            {
                uniId: 3,
                uniNome: 'São Paulo',
                uniAtiva: true,
                pessoaInclusao: '',
                uniDtCadastro: new Date("27/09/2019"),
                pessoaAtualizacao: '',
                uniDtAtualizacao: new Date("27/09/2019"),
            },
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