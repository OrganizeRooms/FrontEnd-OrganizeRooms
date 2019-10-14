import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { PessoaService, OrganizeRoomsService } from '../../shared/_services';
import { Pessoa } from '../../shared';

@Component({
    selector: 'app-pessoas',
    templateUrl: './pessoas.component.html',
    styleUrls: ['./pessoas.component.scss'],
    animations: [routerTransition()]
})
export class PessoasComponent implements OnInit {

    listPessoas;

    displayedColumns: string[] = ['pesId', 'pesNome', 'pesDescricaoPermissao', 'unidade', 'pesDtCadastro', 'detalhes'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private pessoaService: PessoaService,
        private organizeRoomsService: OrganizeRoomsService
    ) { }

    ngOnInit() {
        this.carregarPessoas();
        this.configurarPaginador();
    }

    carregarPessoas() {
        this.pessoaService.buscarTodasPessoas().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    editarPessoa(registro) {
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