import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService, OrganizeRoomsService, UnidadeService } from 'src/app/shared';

@Component({
    selector: 'app-pessoas-adicionar',
    templateUrl: './pessoas-adicionar.component.html',
    styleUrls: ['./pessoas-adicionar.component.scss'],
    //animations: [routerTransition()]
})

export class PessoasAdicionarComponent implements OnInit, OnDestroy {

    pessoa;
    listUnidades;

    unidadeSelecionada
    formAddPessoa: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private pessoaService: PessoaService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
    ) { }

    ngOnInit() {
        this.pessoa = this.organizeRoomsService.getValue()
       // this.criarFormulario();
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    carregarUnidades() {
        this.unidadeService.buscarTodasUnidades().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    criarFormulario() {
        if (this.pessoa != null) {
            var nomePessoaAtu = null;
            if (this.pessoa.pesAtualizacao != null) {
                var nomePessoaAtu = this.pessoa.pesAtualizacao.pesNome
            }

            this.formAddPessoa = this.formBuilder.group({
                pesId: [0],
                pesNome: [null], //, Validators.compose([Validators.required])],
                pesEmail: [null],
                pesPermissao: [null],
                pesDdd: [null],
                pesTelefone: [null],
                pesTipoInclusao: ['SIS'],
                pesAtualizacao: [nomePessoaAtu],
                pesDtAtualizacao: [new Date()],
            });
        } else {
            this.formAddPessoa = this.formBuilder.group({
                pesId: [0],
                pesNome: [null], //, Validators.compose([Validators.required])],
                pesEmail: [null],
                pesPermissao: [null],
                pesDdd: [null],
                pesTelefone: [null],
                pesTipoInclusao: ['SIS'],
                pesAtualizacao: [null],
                pesDtAtualizacao: [new Date()],
            });
        }

    }

    adicionarPessoa() {

    }

}
