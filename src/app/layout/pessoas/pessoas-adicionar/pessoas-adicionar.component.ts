import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PessoaService, OrganizeRoomsService, UnidadeService, StorageService } from 'src/app/shared';

@Component({
    selector: 'app-pessoas-adicionar',
    templateUrl: './pessoas-adicionar.component.html',
    styleUrls: ['./pessoas-adicionar.component.scss'],
    animations: [routerTransition()]
})

export class PessoasAdicionarComponent implements OnInit, OnDestroy {
    labelPosition = 'before';

    formAddPessoa: FormGroup;
    listUnidades;

    selPessoa;
    selUnidade = new FormControl('');
    selPermissao;

    pesDtAtualizacao;
    pesAtualizacao;

    constructor(
        private formBuilder: FormBuilder,
        private pessoaService: PessoaService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private storageService: StorageService,
    ) { }

    ngOnInit() {
        this.selPessoa = this.organizeRoomsService.getValue();

        if (this.selPessoa != null && this.selPessoa.pesAtualizacao != null) {
            this.pesAtualizacao = this.selPessoa.pesAtualizacao.pesNome;
            this.pesDtAtualizacao = this.selPessoa.pesDtAtualizacao;
        }
        this.carregarUnidades();
        this.criarFormulario();
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
        if (this.selPessoa != null) {
            this.formAddPessoa = this.formBuilder.group({
                pesId: [this.selPessoa.pesId],
                pesNome: [this.selPessoa.pesNome], //, Validators.compose([Validators.required])],
                pesEmail: [this.selPessoa.pesEmail],
                // pesPermissao: [this.selPessoa.pesPermissao],
                pesDdd: [this.selPessoa.pesDdd],
                pesTelefone: [this.selPessoa.pesTelefone],
                pesTipoInclusao: [this.selPessoa.pesTipoInclusao],
                pesDtCadastro: [this.selPessoa.pesDtCadastro],
            });
            this.selPermissao = this.selPessoa.pesPermissao
            this.selUnidade.setValue = this.selPessoa.unidade
            console.log(this.selUnidade)
        } else {
            this.formAddPessoa = this.formBuilder.group({
                pesId: [0],
                pesNome: [null], //, Validators.compose([Validators.required])],
                pesEmail: [null],
                // pesPermissao: [null],
                pesDdd: [null],
                pesTelefone: [null],
                pesTipoInclusao: ['SIS'],
                pesDtCadastro: [new Date()],
            });
            this.selPermissao = 'ROLE_USUARIO';
        }

    }

    adicionarPessoa() {

    }

    

}
