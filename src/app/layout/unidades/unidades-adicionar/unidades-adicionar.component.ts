import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Unidade, Pessoa, UnidadeService, OrganizeRoomsService, StorageService } from 'src/app/shared';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-unidades-adicionar',
    templateUrl: './unidades-adicionar.component.html',
    styleUrls: ['./unidades-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class UnidadesAdicionarComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;
    
    selUnidade;
    formAddUnidade: FormGroup;

    uniDtAtualizacao;
    uniPesAtualizacao;

    constructor(
        private formBuilder: FormBuilder,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private storageService: StorageService,
        private modal: NgbModal) { }

    ngOnInit() {
        this.selUnidade = this.organizeRoomsService.getValue()

        if (this.selUnidade != null && this.selUnidade.uniPesAtualizacao != null) {
            this.uniPesAtualizacao = this.selUnidade.uniPesAtualizacao.pesNome;
            this.uniDtAtualizacao = this.selUnidade.uniDtAtualizacao
        }
        this.criarFormulario();

        this.permissao = this.storageService.getLocalUser().pessoa.pesPermissao;
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
            if (ret.data != null) {
                if (this.selUnidade == null) {
                    alert('Unidade ' + ret.data.uniNome + ' Adicionada com Sucesso!');
                } else {
                    alert('Unidade ' + ret.data.uniNome + ' Atualizada com Sucesso!');
                }
            }
        });


        // this.open(content);
    }

    //   open(content) {
    //      this.modal.open(content)
    //  }

}
