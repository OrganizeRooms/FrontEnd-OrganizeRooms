import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS } from '../../../shared/utils/date-formats'

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _moment;

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
    listUnidades: any[];

    formAddPessoa: FormGroup;

    constructor(
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.carregarUnidades();
        this.criarFormulario();
    }

    carregarUnidades() {
        this.listUnidades = [
            { id: 1, unidade: "São Paulo" },
            { id: 2, unidade: "Blumenau" },
            { id: 3, unidade: "Rio de Janeiro" }
        ]
    }
    criarFormulario() {
        this.formAddPessoa = this.formBuilder.group({
            pesid: [null],
            pesnome: [null], //, Validators.compose([Validators.required])],
            pesemail: [null],
            pesddd: [null],
            pestelefone: [null]
        });
    }

    adicionarPessoa() {

    }

}
