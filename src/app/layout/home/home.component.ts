import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Agendamento } from 'src/app/shared';

// Dialog
import { MatDialog, MatDialogConfig } from "@angular/material";
import { HomeDetalhesComponent } from './home-detalhes/home-detalhes.component';
// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n } from 'src/app/shared/utils';
import { TouchSequence } from 'selenium-webdriver';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n } // define custom NgbDatepickerI18n provider
    ],
})
export class HomeComponent implements OnInit {

    // listAgendamentos: Agendamento;
    listAgendamentos;
    DetalhesAgendamento;
    model: NgbDateStruct;
    agendamentoSelecionado;

    constructor(
        private dialog: MatDialog,
        private modal: NgbModal) {
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

    ngOnInit() {
        this.carregarAgendamentos();
    }

    carregarAgendamentos() {
        this.listAgendamentos = [
            {
                ageId: 1, sala: 'Sala de Reunião 3', pessoa_responsavel: 'Lucas Jansen', unidade: 'Rio de Janeiro',
                ageAssunto: 'Montar Kanban', ageData: new Date('09/08/2019'),
                ageHoraInicio: '08:00', ageHoraFim: '08:30', ageStatus: 'Agendado',
                ageDescricao: 'Lorem Lorem orem Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
                    + 'Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa '
                    + 'molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            },
            {
                ageId: 2, sala: 'Sala de Reunião 4', pessoa_responsavel: 'Lucas Jansen', unidade: 'Rio de Janeiro',
                ageAssunto: 'Montar Kanban', ageData: new Date('08/09/2019'),
                ageHoraInicio: '08:00', ageHoraFim: '08:30', ageStatus: 'Agendado',
                ageDescricao: 'Lorem Lorem orem Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
                    + 'Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa '
                    + 'molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            },
            {
                ageId: 2, sala: 'Sala de Reunião 5', pessoa_responsavel: 'Lucas Jansen', unidade: 'Rio de Janeiro',
                ageAssunto: 'Montar Kanban', ageData: new Date('08/09/2019'),
                ageHoraInicio: '08:00', ageHoraFim: '08:30', ageStatus: 'Agendado',
                ageDescricao: 'Lorem Lorem orem Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
                    + 'Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa '
                    + 'molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            },
            {
                ageId: 3, sala: 'Sala Comercial', pessoa_responsavel: 'Éder jean Dias', unidade: 'Blumenau',
                ageAssunto: 'Montar Kanban', ageData: new Date('08/09/2019'),
                ageHoraInicio: '08:00', ageHoraFim: '08:30', ageStatus: 'Agendado',
                ageDescricao: 'Lorem Lorem orem Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
                    + 'Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa '
                    + 'molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            },
            {
                ageId: 4, sala: 'Sala Dos Top', pessoa_responsavel: 'Felipe Haag', unidade: 'Blumenau',
                ageAssunto: 'Montar Kanban', ageData: new Date('09/26/2019'),
                ageHoraInicio: '08:00', ageHoraFim: '08:30', ageStatus: 'Agendado',
                ageDescricao: 'Lorem Lorem orem Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
                    + 'Voluptates est animi quibusdam praesentium quam, et perspiciatis,consectetur velit culpa '
                    + 'molestias dignissimosvoluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum'
            }
        ]

    }


    /*public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }


    filtro(data: FormControl) {
        var fdata = new Date(data.value)
        this.listAgendamentosFiltrado = [];
        this.listAgendamentos.forEach(element => {
            if (moment(element.ageData, 'DD/MM/YYYY').toString() == moment(fdata, 'DD/MM/YYYY').toString()) {
                // console.log('5 - Entrou - data elemento = ' + moment(element.ageData, 'DD/MM/YYYY').toString()
                //   + ' data escolhida= ' + moment(fdata, 'DD/MM/YYYY').toString())
                this.listAgendamentosFiltrado.push(element);
            }
        });
    }*/

    openDialog(agends) {
        const dialogConfig = new MatDialogConfig();

        //dialogConfig.maxHeight = '80%';
        //dialogConfig.maxWidth = '50%';
        dialogConfig.panelClass = 'col-12';
        dialogConfig.panelClass = 'col-sm-12';
        dialogConfig.panelClass = 'col-lg-6';
        dialogConfig.panelClass = 'col-xl-6';

        dialogConfig.data = {
            ageId: agends.ageId,
            sala: agends.sala,
            unidade: agends.unidade,
            pessoa_responsavel: agends.pessoa_responsavel,
            ageAssunto: agends.ageAssunto,
            ageData: agends.ageData,
            ageHoraInicio: agends.ageHoraInicio,
            ageHoraFim: agends.ageHoraFim,
            ageStatus: agends.ageStatus,
            ageDescricao: agends.ageDescricao,
        };

        this.dialog.open(HomeDetalhesComponent, dialogConfig);
    }


    // this.open(content);

    abrirDetalhes(agend, modalDetalhes){
        this.agendamentoSelecionado = agend

        this.abrirModal(modalDetalhes);
    }

    abrirModal(modalDetalhes) {
        this.modal.open(modalDetalhes)
    }

}
