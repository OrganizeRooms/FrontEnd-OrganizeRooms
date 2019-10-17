import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Unidade, Pessoa, Sala, StorageService } from 'src/app/shared';
import { MY_FORMATS } from '../../../shared/utils';
import { ActivatedRoute } from '@angular/router';

const moment = _moment;

@Component({
    selector: 'app-equipamentos-adicionar',
    templateUrl: './equipamentos-adicionar.component.html',
    styleUrls: ['./equipamentos-adicionar.component.scss'],
    animations: [routerTransition()],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})

export class EquipamentosAdicionarComponent implements OnInit {
    permissao;

    salaSelecionada;
    formAddSala: FormGroup;
    salaDtCadastro = new FormControl(moment());
    listEquipamentos: Unidade[];
    listUnidades: any[];

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private storageService: StorageService,
        ) { }

    ngOnInit() {
        this.carregarEquipamentos();

        let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

        this.criarFormularioVazio();
        this.carregarUnidades();

        this.permissao = this.storageService.getLocalUser().pessoa.pesPermissao;

    }

    carregarEquipamentos() {
        this.listEquipamentos = [
            {
                uniId: 1, uniNome: "São Paulo", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), uniPesCadastro: null /*new Pessoa*/, uniPesAtualizacao: null /*new Pessoa*/
            },
            {
                uniId: 2, uniNome: "Blumenau", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), uniPesCadastro: null /*new Pessoa*/, uniPesAtualizacao: null /*new Pessoa*/
            },
            {
                uniId: 3, uniNome: "Rio de Janeiro", uniAtiva: true, uniDtCadastro: new Date("20/09/2019"), uniDtAtualizacao: new Date("20/09/2019"), uniPesCadastro: null /*new Pessoa*/, uniPesAtualizacao: null /*new Pessoa*/
            }
        ]
    }

    carregarUnidades() {
        this.listUnidades = [
            { id: 1, unidade: "São Paulo" },
            { id: 2, unidade: "Blumenau" },
            { id: 3, unidade: "Rio de Janeiro" }
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
