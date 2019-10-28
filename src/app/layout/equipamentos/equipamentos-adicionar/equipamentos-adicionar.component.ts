import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
    EquipamentoService, UnidadeService, OrganizeRoomsService, Equipamento, SessionStorageService
} from 'src/app/shared';

@Component({
    selector: 'app-equipamentos-adicionar',
    templateUrl: './equipamentos-adicionar.component.html',
    styleUrls: ['./equipamentos-adicionar.component.scss'],
    animations: [routerTransition()]
})

export class EquipamentosAdicionarComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;

    formAddEquipamento: FormGroup;
    listUnidades;

    selEquipamento;
    selUnidade = new FormControl();

    equDtAtualizacao;
    equPesAtualizacao;

    constructor(
        private formBuilder: FormBuilder,
        private equipamentoService: EquipamentoService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService,
    ) { }

    ngOnInit() {
        this.selEquipamento = this.organizeRoomsService.getValue();

        /*if (this.selEquipamento != null && this.selEquipamento.equPesAtualizacao != null) {
            this.equPesAtualizacao = this.selEquipamento.equPesAtualizacao.pesNome;
            this.equDtAtualizacao = this.selEquipamento.equDtAtualizacao;
        }*/

        this.carregarUnidades();
        this.criarFormulario();

        this.permissao = this.sessionService.getSessionUser().pessoa.pesPermissao;
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    carregarUnidades() {
        this.unidadeService.buscarUnidadesAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    criarFormulario() {
        if (this.selEquipamento != null) {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [this.selEquipamento.equId],
                equNome: [this.selEquipamento.equNome, Validators.compose([Validators.required])],
                equDescricao: [this.selEquipamento.equDescricao, Validators.compose([Validators.required])],
                equAtiva: [this.selEquipamento.equAtiva],
                equDtCadastro: [this.selEquipamento.equDtCadastro]
            });
            console.log(this.selUnidade)
            this.selUnidade = new FormControl(this.selEquipamento.equUnidade)
            console.log(this.selUnidade)
        } else {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [0],
                equNome: [null, Validators.compose([Validators.required])],
                equDescricao: [null, Validators.compose([Validators.required])],
                equAtiva: [true],
                equDtCadastro: [new Date()]
            });
        }
    }

    adicionarEquipamento() {

        var cEquPesCadastro: Number;
        var cEquPesDtCadastro;
        if (this.selEquipamento != null) {
            cEquPesCadastro = this.selEquipamento.equPesCadastro;
            cEquPesDtCadastro = this.selEquipamento.equDtCadastro;
        } else {
            cEquPesCadastro = this.sessionService.getSessionUser().pessoa.pesId;
            cEquPesDtCadastro = new Date();
        }

        const equipamento: Equipamento = {
            equId: this.formAddEquipamento.value.equId,
            equNome: this.formAddEquipamento.value.equNome,
            equDescricao: this.formAddEquipamento.value.equDescricao,
            equAtiva: this.formAddEquipamento.value.equAtiva,
            equUnidade: this.selUnidade.value,
            equPesCadastro: cEquPesCadastro,
            equDtCadastro: cEquPesDtCadastro,
            equPesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            equDtAtualizacao: new Date(),
        };
        console.log(equipamento)
        this.equipamentoService.adicionarAtualizarEquipamento(equipamento).subscribe(ret => {
            console.log("retorno")
            console.log(ret.data)
            if (ret.data != null) {
                if (this.selEquipamento != null) {
                    alert('Equipamento ' + ret.data.equNome + ' Atualizada com Sucesso!');
                } else {
                    alert('Equipamento ' + ret.data.equNome + ' Adicionada com Sucesso!');
                }
            }
        });
    }

    log(unidade) {
        console.log(unidade)
        console.log("----")
        console.log(this.selUnidade)
    }

}
