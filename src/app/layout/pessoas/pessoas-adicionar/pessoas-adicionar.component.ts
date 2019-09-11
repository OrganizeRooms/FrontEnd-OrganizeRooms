import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl } from '@angular/forms';

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
    },
};

@Component({
    selector: 'app-pessoas-adicionar',
    templateUrl: './pessoas-adicionar.component.html',
    styleUrls: ['./pessoas-adicionar.component.scss'],
    //animations: [routerTransition()]
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})

export class PessoasAdicionarComponent implements OnInit {

    date = new FormControl(moment());
    listUnidades:any[];

    constructor() { }

    ngOnInit() {
        this.carregarUnidades();
    }

    carregarUnidades(){
        this.listUnidades = [
            {id: 1, unidade:"São Paulo"},
            {id: 2, unidade:"Blumenau"},
            {id: 3, unidade:"Rio de Janeiro"}
        ]
    }

    adicionarPessoa(){

    }
    
}
