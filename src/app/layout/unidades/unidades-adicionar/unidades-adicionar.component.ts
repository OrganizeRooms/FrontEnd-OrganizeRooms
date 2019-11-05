import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unidade, UnidadeService, OrganizeRoomsService, SessionStorageService } from 'src/app/shared';
import { Router } from '@angular/router';

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
        public router: Router,
        private formBuilder: FormBuilder,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService
    ) { }

    ngOnInit() {
        this.selUnidade = this.organizeRoomsService.getValue()

        /*if (this.selUnidade != null && this.selUnidade.uniPesAtualizacao != null) {
            this.uniPesAtualizacao = this.selUnidade.uniPesAtualizacao.pesNome;
            this.uniDtAtualizacao = this.selUnidade.uniDtAtualizacao
        }*/
        this.criarFormulario();

        this.permissao = this.sessionService.getSessionUser().pessoa.pesPermissao;
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
                uniAtiva: [true],
                uniDtCadastro: [new Date()]
            });
        }
    }

    adicionarUnidade() {

        var uniPesCadastro;
        if (this.selUnidade != null) {
            uniPesCadastro = null
        } else {
            uniPesCadastro = this.sessionService.getSessionUser().pessoa.pesId
        }

        const unidade: Unidade = {
            uniId: this.formAddUnidade.value.uniId,
            uniNome: this.formAddUnidade.value.uniNome,
            uniAtiva: this.formAddUnidade.value.uniAtiva,
            uniPesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            uniDtAtualizacao: new Date(),
            uniPesCadastro: uniPesCadastro,
            // NÃO É ATUALIZADO 
            uniDtCadastro: null,
        };

        this.unidadeService.adicionarAtualizarUnidade(unidade).subscribe(ret => {
            if (ret.data != null) {
                if (this.selUnidade == null) {
                    alert('Unidade ' + ret.data.uniNome + ' Adicionada com Sucesso!');
                    this.router.navigate(['/unidades']);
                } else {
                    alert('Unidade ' + ret.data.uniNome + ' Atualizada com Sucesso!');
                    this.router.navigate(['/unidades']);
                }
            }
        });
    }

    excluir() {

    }
}
