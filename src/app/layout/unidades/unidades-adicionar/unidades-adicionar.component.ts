import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Unidade, Pessoa, UnidadeService, STORAGE_KEYS, OrganizeRoomsService, StorageService } from 'src/app/shared';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-unidades-adicionar',
    templateUrl: './unidades-adicionar.component.html',
    styleUrls: ['./unidades-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class UnidadesAdicionarComponent implements OnInit, OnDestroy {

    selUnidade;
    formAddUnidade: FormGroup;

    dtAtualizacao;
    pesAtualizacao;

    constructor(
        private formBuilder: FormBuilder,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private storageService: StorageService,
        private modal: NgbModal) { }

    ngOnInit() {
        this.selUnidade = this.organizeRoomsService.getValue()
        console.log(this.selUnidade)
        if (this.selUnidade != null) {
            this.pesAtualizacao = this.selUnidade.uniPesAtualizacao.pesNome;
            this.dtAtualizacao = this.selUnidade.uniDtAtualizacao
        }
        
        this.criarFormulario();
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    criarFormulario() {
        if (this.selUnidade != null) {
            this.formAddUnidade = this.formBuilder.group({
                uniId: [this.selUnidade.uniId],
                uniNome: [this.selUnidade.uniNome, Validators.compose([Validators.required])],
                uniAtiva: [this.selUnidade.uniAtiva],
                uniDtCadastro: [this.selUnidade.uniDtCadastro]
            });
        } else {
            this.formAddUnidade = this.formBuilder.group({
                uniId: [0],
                uniNome: [null, Validators.compose([Validators.required])],
                uniAtiva: [false],
                uniDtCadastro: [new Date()]
            });
        }
    }

    adicionarUnidade() {

        var cUniPesCadastro: Pessoa;
        var cUniDtCadastro;
        if (this.selUnidade != null) {
            cUniPesCadastro = this.selUnidade.uniPesCadastro;
            cUniDtCadastro = this.selUnidade.uniDtCadastro;
        } else {
            cUniPesCadastro = this.storageService.getLocalUser().pessoa;
            cUniDtCadastro = new Date();
        }

        const unidade: Unidade = {
            uniId: this.formAddUnidade.value.uniId,
            uniNome: this.formAddUnidade.value.uniNome,
            uniAtiva: this.formAddUnidade.value.uniAtiva,
            uniPesCadastro: cUniPesCadastro,
            uniDtCadastro: cUniDtCadastro,
            uniPesAtualizacao: this.storageService.getLocalUser().pessoa,
            uniDtAtualizacao: new Date(),
        };

        this.unidadeService.adicionarAtualizarUnidade(unidade).subscribe(ret => {
            if(ret.data != null){
                alert('Unidade '+ret.data.uniNome+' Adicionada com Sucesso!');
            }
        });

       
        // this.open(content);
    }

    //   open(content) {
    //      this.modal.open(content)
    //  }

}
