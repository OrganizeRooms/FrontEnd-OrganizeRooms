import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
    StorageService, EquipamentoService, UnidadeService, OrganizeRoomsService, Pessoa, Equipamento
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

    equPesDtAtualizacao;
    equPesAtualizacao;

    constructor(
        private formBuilder: FormBuilder,
        private equipamentoService: EquipamentoService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private storageService: StorageService,
    ) { }

    ngOnInit() {
        this.selEquipamento = this.organizeRoomsService.getValue();

        if (this.selEquipamento != null && this.selEquipamento.equPesAtualizacao != null) {
            this.equPesAtualizacao = this.selEquipamento.equPesAtualizacao.pesNome;
            this.equPesDtAtualizacao = this.selEquipamento.equPesDtAtualizacao;
        }

        this.carregarUnidades();
        this.criarFormulario();

        this.permissao = this.storageService.getLocalUser().pessoa.pesPermissao;
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
        if (this.selEquipamento != null) {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [this.selEquipamento.equId],
                equNome: [this.selEquipamento.equNome],
                equDescricao: [this.selEquipamento.equDescricao],
                equAtiva: [this.selEquipamento.equAtiva],
                equDtCadastro: [this.selEquipamento.equDtCadastro]
            });
            console.log(this.selUnidade)
            this.selUnidade.setValue = this.selEquipamento.equUnidade
            console.log(this.selUnidade)
        } else {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [0],
                equNome: [null],
                equDescricao: [null],
                equAtiva: [true],
                equDtCadastro: [new Date()]
            });
        }
    }

    adicionarEquipamento() {

        var cEquPesCadastro: Pessoa;
        var cEquPesDtCadastro;
        if (this.selEquipamento != null) {
            cEquPesCadastro = this.selEquipamento.equPesCadastro;
            cEquPesDtCadastro = this.selEquipamento.equPesDtCadastro;
        } else {
            cEquPesCadastro = this.storageService.getLocalUser().pessoa;
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
            equPesAtualizacao: this.storageService.getLocalUser().pessoa,
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
