import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Unidade, UnidadeService, OrganizeRoomsService, SessionStorageService } from 'src/app/shared';

@Component({
    selector: 'app-agendamentos-detalhes',
    templateUrl: './agendamentos-detalhes.component.html',
    styleUrls: ['./agendamentos-detalhes.component.scss'],
    animations: [routerTransition()],
})

export class AgendamentosDetalhesComponent implements OnInit, OnDestroy {
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

        var cUniPesCadastro;
        var cUniDtCadastro;
        if (this.selUnidade != null) {
            cUniPesCadastro = this.selUnidade.uniPesCadastro;
            cUniDtCadastro = this.selUnidade.uniDtCadastro;
        } else {
            cUniPesCadastro = this.sessionService.getSessionUser().pessoa.pesId;
            cUniDtCadastro = new Date();
        }

        const unidade: Unidade = {
            uniId: this.formAddUnidade.value.uniId,
            uniNome: this.formAddUnidade.value.uniNome,
            uniAtiva: this.formAddUnidade.value.uniAtiva,
            uniPesCadastro: cUniPesCadastro,
            uniDtCadastro: cUniDtCadastro,
            uniPesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
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
