import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.scss'],
    //animations: [routerTransition()]
})
export class SalasComponent implements OnInit {

    listSalas: any[];

    displayedColumns: string[] = ['nome', 'unidade', 'lotacaoMax', 'agendamentos'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor() {
    }

    ngOnInit() {
        this.carregarSalas();
        this.configurarPaginador();
        this.tableData.data = this.listSalas;
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
    }

    carregarSalas() {
        this.listSalas = [
            {
                codigo: 1005, nome: 'Sala de Reunião 3 Equipe Alpha', unidade: 'Rio de Janeiro', lotacaoMax: 20,
                agendamentos: {
                    código: 1, assunto: 'Reunião Kanban', descricao: 'Conversar sobre Kanban', responsavel: 'Lucas Jansen',
                    status: 'Em Andamento', data: '20/10/2019', hrInicial: '08:00', hrFinal: '08:30'
                }
            },
            {
                código: 1005, nome: 'Sala de Reunião 4', unidade: 'Rio de Janeiro', lotacaoMax: 20,
                agendamentos: {
                    código: 1, assunto: 'Reunião Kanban Equipe Beta', descricao: 'Montar Kanban', responsavel: 'Éder Jean Dias',
                    status: 'Agendado', data: '20/10/2019', hrInicial: '08:35', hrFinal: '09:15'
                }
            }, {
                código: 1005, nome: 'Sala Comercial', unidade: 'Blumenau', lotacaoMax: 10,
                agendamentos: {
                    código: 1, assunto: 'Reunião Ajustes', descricao: 'Ajustes que serao feitos', responsavel: 'Felipe Haag',
                    status: 'Agendado', data: '20/11/2019', hrInicial: '09:30', hrFinal: '10:30'
                }
            }, {
                código: 1005, nome: 'Reuniões com Fornecedores SA-02', unidade: 'São Paulo', lotacaoMax: 22,
                agendamentos: {
                    código: 1, assunto: 'Novos valores', descricao: 'Discutir sobre novos valores', responsavel: 'Patricio Souza',
                    status: 'Finalizado', data: '12/08/2019', hrInicial: '08:00', hrFinal: '08:30'
                }
            },
            {
                código: 1005, nome: 'Reuniões com Fornecedores SA-02', unidade: 'São Paulo', lotacaoMax: 22,
                agendamentos: {
                    código: 1, assunto: 'Novos valores', descricao: 'Discutir sobre novos valores', responsavel: 'Patricio Souza',
                    status: 'Finalizado', data: '12/08/2019', hrInicial: '08:00', hrFinal: '08:30'
                }
            },
            {
                código: 1005, nome: 'Reuniões com Fornecedores SA-02', unidade: 'São Paulo', lotacaoMax: 22,
                agendamentos: {
                    código: 1, assunto: 'Novos valores', descricao: 'Discutir sobre novos valores', responsavel: 'Patricio Souza',
                    status: 'Finalizado', data: '12/08/2019', hrInicial: '08:00', hrFinal: '08:30'
                }
            },
            {
                código: 1005, nome: 'Reuniões com Fornecedores SA-02', unidade: 'São Paulo', lotacaoMax: 22,
                agendamentos: {
                    código: 1, assunto: 'Novos valores', descricao: 'Discutir sobre novos valores', responsavel: 'Patricio Souza',
                    status: 'Finalizado', data: '12/08/2019', hrInicial: '08:00', hrFinal: '08:30'
                }
            },
            {
                código: 1005, nome: 'Reuniões com Fornecedores SA-02', unidade: 'São Paulo', lotacaoMax: 22,
                agendamentos: {
                    código: 1, assunto: 'Novos valores', descricao: 'Discutir sobre novos valores', responsavel: 'Patricio Souza',
                    status: 'Finalizado', data: '12/08/2019', hrInicial: '08:00', hrFinal: '08:30'
                }
            },
            {
                código: 1005, nome: 'Reuniões com Fornecedores SA-02', unidade: 'São Paulo', lotacaoMax: 22,
                agendamentos: {
                    código: 1, assunto: 'Novos valores', descricao: 'Discutir sobre novos valores', responsavel: 'Patricio Souza',
                    status: 'Finalizado', data: '12/08/2019', hrInicial: '08:00', hrFinal: '08:30'
                }
            },
        ];
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
