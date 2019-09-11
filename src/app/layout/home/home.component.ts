import { Component, OnInit, Inject } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { HomeDetalhesComponent } from './home-detalhes/home-detalhes.component';

// Date Picker
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    }
};

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class HomeComponent implements OnInit {

    //public alerts: Array<any> = [];
    date = new FormControl(moment());
    listAgendamentos;

    DetalhesAgendamento;

    constructor(
        private dialog: MatDialog) {
        /*this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );*/
    }

    openDialog(agends) {
        const dialogConfig = new MatDialogConfig();

        //dialogConfig.maxHeight = '80%';
        //dialogConfig.maxWidth = '50%';
        dialogConfig.panelClass = 'col-12';
        dialogConfig.panelClass = 'col-sm-12'; 
        dialogConfig.panelClass = 'col-lg-6';
        dialogConfig.panelClass = 'col-xl-6';

        dialogConfig.data = {
            id: agends.id,
            sala: agends.sala,
            unidade: agends.unidade,
            responsavel: agends.responsavel,
            assunto: agends.assunto,
            data: agends.data,
            hrInicio: agends.hrInicio,
            hrFim: agends.hrFim,
            status: agends.status,
            descricao: agends.descricao,
        };

        this.dialog.open(HomeDetalhesComponent, dialogConfig);
    }

    ngOnInit() {
        this.carregarAgendamentos();
    }

    carregarAgendamentos() {
        this.listAgendamentos = [
            {
                id: 1, sala: 'Sala de Reunião 3', responsavel: 'Lucas Jansen', unidade: 'Rio de Janeiro', assunto: 'Montar Kanban', data: '08/09/2019',
                hrInicio: '08:00', hrFim: '08:30', status: 'Agendado',
                descricao: 'Lorem Lorem orem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            },
            {
                id: 1, sala: 'Sala de Reunião 2', responsavel: 'Eder Jean Dias', unidade: 'São Paulo', assunto: 'Novos preços Kanban', data: '08/09/2019',
                hrInicio: '10:00', hrFim: '11:30', status: 'Agendado',
                descricao: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            },
            {
                id: 1, sala: 'Sala de Reunião 3', responsavel: 'Felipe Haag', unidade: 'Rio de Janeiro', assunto: 'Montar Kanban', data: '08/09/2019',
                hrInicio: '08:00', hrFim: '08:30', status: 'Agendado',
                descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            },
            {
                id: 1, sala: 'Sala de Reunião 3', responsavel: 'Felipe Haag', unidade: 'São Paulo', assunto: 'Montar Kanban', data: '08/09/2019',
                hrInicio: '08:00', hrFim: '08:30', status: 'Agendado',
                descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            }
        ]
    }

    /*public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }*/

}
