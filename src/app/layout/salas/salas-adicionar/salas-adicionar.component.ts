import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Unidade, Pessoa, Sala } from 'src/app/shared';
import { MY_FORMATS } from '../../../shared/utils';
import { ActivatedRoute } from '@angular/router';

const moment = _moment;

@Component({
    selector: 'app-salas-adicionar',
    templateUrl: './salas-adicionar.component.html',
    styleUrls: ['./salas-adicionar.component.scss'],
    animations: [routerTransition()],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})

export class SalasAdicionarComponent implements OnInit {

    salaSelecionada;
    formAddSala: FormGroup;
    salaDtCadastro = new FormControl(moment());
    listUnidades: Unidade[];

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.carregarUnidades();

        let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        
        console.log('1 - ' + this.salaSelecionada)

        this.criarFormularioVazio();

    }

    carregarUnidades() {
        this.listUnidades = [
            {
                uniId: 1, uniNome: "São Paulo", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), pessoaInclusao: new Pessoa, pessoaAtualizacao: new Pessoa()
            },
            {
                uniId: 2, uniNome: "Blumenau", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), pessoaInclusao: new Pessoa, pessoaAtualizacao: new Pessoa()
            },
            {
                uniId: 3, uniNome: "Rio de Janeiro", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), pessoaInclusao: new Pessoa, pessoaAtualizacao: new Pessoa()
            }
        ]
    }
    criarFormularioVazio() {
        this.formAddSala = this.formBuilder.group({
            salaId: [null],
            salaNome: [null], //, Validators.compose([Validators.required])],
            salaLotacao: [null],
            salaAtiva: [null],
            salaDtCadastro: [null]
        });
    }

    criarFormulario(sala) {
        console.log(sala)
        /*this.formAddSala = this.formBuilder.group({
            salaId: [this.sala.ageId],
            salaNome: [this.sala.salaNome], //, Validators.compose([Validators.required])],
            salaLotacao: [this.sala.salaLotacao],
            salaAtiva: [this.sala.salaAtiva],
            salaDtCadastro: [this.sala.salaDtCadastro],
            //unidade: [this.sala.unidade]
        });*/
    }

    adicionarSala() {

    }

}
