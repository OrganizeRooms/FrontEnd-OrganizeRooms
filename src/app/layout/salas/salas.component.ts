import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { SalaService, StorageService } from '../../shared/_services';
import { Sala } from '../../shared';

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.scss'],
    animations: [routerTransition()]
})
export class SalasComponent implements OnInit {
    permissao;

    listSalas: any[];
    //listSalas: Sala[];

    displayedColumns: string[] = ['salaNome', 'unidade', 'salaLotacao', 'detalhes'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private salaService: SalaService,
        private storageService: StorageService,
    ) {
    }

    ngOnInit() {
        this.carregarSalas();
        this.configurarPaginador();
        this.tableData.data = this.listSalas;
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        
        this.permissao = this.storageService.getLocalUser().pessoa.pesPermissao;
    }

    carregarSalas() {
        //this.listSalas = this.salaService.buscarTodos();
        this.listSalas = [
            {
                salaId: 1005, salaNome: 'Sala de Reunião 3 Equipe Alpha', salaLotacao: 20, salaAtiva: true, salaDtCadastro: new Date("27/09/2019"),
                unidade: {
                    uniId: 3,
                    uniNome: 'Rio de Janeiro',
                    uniAtiva: true,
                    pessoaInclusao: '',
                    uniDtCadastro: new Date("27/09/2019"),
                    pessoaAtualizacao: '',
                    uniDtAtualizacao: new Date("27/09/2019"),
                },
                agendamentos: {
                    salaId: 1, assunto: 'Reunião Kanban', descricao: 'Conversar sobre Kanban', responsavel: 'Lucas Jansen',
                    status: 'Em Andamento', data: '20/10/2019', hrInicial: '08:00', hrFinal: '08:30'
                }
            },
            {
                salaId: 1005, salaNome: 'Sala de Reunião 4', salaLotacao: 20, salaAtiva: false, salaDtCadastro: new Date("27/09/2019"),
                unidade: {
                    uniId: 2,
                    uniNome: 'Blumenau',
                    pessoaInclusao: '',
                    uniDtCadastro: new Date("27/09/2019"),
                    pessoaAtualizacao: '',
                    uniDtAtualizacao: new Date("27/09/2019"),
                },
                agendamentos: {
                    salaId: 1, assunto: 'Reunião Kanban Equipe Beta', descricao: 'Montar Kanban', responsavel: 'Éder Jean Dias',
                    status: 'Agendado', data: '20/10/2019', hrInicial: '08:35', hrFinal: '09:15'
                }
            }, {
                salaId: 1005, salaNome: 'Sala Comercial', salaLotacao: 10, salaAtiva: true, salaDtCadastro: new Date("27/09/2019"),
                unidade: {
                    uniId: 1,
                    uniNome: 'São Paulo',
                    pessoaInclusao: '',
                    uniDtCadastro: new Date("27/09/2019"),
                    pessoaAtualizacao: '',
                    uniDtAtualizacao: new Date("27/09/2019"),
                },
                agendamentos: {
                    salaId: 1, assunto: 'Reunião Ajustes', descricao: 'Ajustes que serao feitos', responsavel: 'Felipe Haag',
                    status: 'Agendado', data: '20/11/2019', hrInicial: '09:30', hrFinal: '10:30'
                }
            }
        ];
    }

    salaSelecionada(rec) {

    }

    configurarPaginador() {
        this.paginator._intl.itemsPerPageLabel = 'Itens por Página';
        this.paginator._intl.getRangeLabel = rangeLabel;
        this.paginator.showFirstLastButtons = true;
        this.paginator.pageSizeOptions = [8, 10, 15, 20, 30];
    }
}