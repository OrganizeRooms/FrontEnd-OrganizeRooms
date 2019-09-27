import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Unidade, Pessoa, Sala } from 'src/app/shared';

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
    },
};

@Component({
    selector: 'app-salas-adicionar',
    templateUrl: './salas-adicionar.component.html',
    styleUrls: ['./salas-adicionar.component.scss'],
    //animations: [routerTransition()]
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})

export class SalasAdicionarComponent implements OnInit {

    formAddSala: FormGroup;
    salaDtCadastro = new FormControl(moment());
    listUnidades: Unidade[];

    constructor(
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.carregarUnidades();
        this.criarFormulario();
    }

    carregarUnidades() {
        this.listUnidades = [
            {
                uniId: 1, uniNome: "São Paulo", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), pessoa_inclusao: new Pessoa, pessoa_atualizacao: new Pessoa()
            },
            {
                uniId: 2, uniNome: "Blumenau", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), pessoa_inclusao: new Pessoa, pessoa_atualizacao: new Pessoa()
            },
            {
                uniId: 3, uniNome: "Rio de Janeiro", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), pessoa_inclusao: new Pessoa, pessoa_atualizacao: new Pessoa()
            }
        ]
    }
    criarFormulario() {
        this.formAddSala = this.formBuilder.group({
            salaId: [null],
            salaNome: [null], //, Validators.compose([Validators.required])],
            salaLotacao: [null],
            salaAtiva: [null],
            salaDtCadastro: [null]
        });
    }

    adicionarSala() {

    }

}
