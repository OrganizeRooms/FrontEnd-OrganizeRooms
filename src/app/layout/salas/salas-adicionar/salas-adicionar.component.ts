import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Sala, OrganizeRoomsService, StorageService, SalaService, UnidadeService, Pessoa } from 'src/app/shared';

@Component({
    selector: 'app-salas-adicionar',
    templateUrl: './salas-adicionar.component.html',
    styleUrls: ['./salas-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class SalasAdicionarComponent implements OnInit {
    labelPosition = 'before';
    permissao;

    formAddSala: FormGroup;
    listUnidades;

    selSala;
    selUnidade = new FormControl();

    salaDtAtualizacao;
    salaPesAtualizacao;

    constructor(
        private formBuilder: FormBuilder,
        private salaService: SalaService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private storageService: StorageService
    ) { }

    ngOnInit() {
        this.selSala = this.organizeRoomsService.getValue();

        if (this.selSala != null && this.selSala.salaPesAtualizacao != null) {
            this.salaPesAtualizacao = this.selSala.salaPesAtualizacao.pesNome;
            this.salaDtAtualizacao = this.selSala.salaDtAtualizacao;
        }

        console.log(this.selUnidade)
        this.carregarUnidades();
        this.criarFormulario();

        this.permissao = this.storageService.getLocalUser().pessoa.pesPermissao;
    }

    carregarUnidades() {
        this.unidadeService.buscarUnidadesAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    criarFormulario() {
        if (this.selSala != null) {
            this.formAddSala = this.formBuilder.group({
                salaId: [this.selSala.salaId],
                salaNome: [this.selSala.salaNome],
                salaLotacao: [this.selSala.salaLotacao],
                salaAtiva: [this.selSala.salaAtiva],
                salaDtCadastro: [this.selSala.salaDtCadastro]
            });
            console.log('criar form 1')
            console.log(this.selUnidade)
            this.selUnidade = new FormControl(this.selSala.salaUnidade)
            console.log('criar form 2')
            console.log(this.selUnidade)
        } else {
            this.formAddSala = this.formBuilder.group({
                salaId: [0],
                salaNome: [null],
                salaLotacao: [null],
                salaAtiva: [true],
                salaDtCadastro: [new Date()]
            });
        }
    }

    adicionarSala() {

        var cSalaPesCadastro: Pessoa;
        var cSalaDtCadastro;
        if (this.selSala != null) {
            cSalaPesCadastro = this.selSala.salaPesCadastro;
            cSalaDtCadastro = this.selSala.salaDtCadastro;
        } else {
            cSalaPesCadastro = this.storageService.getLocalUser().pessoa;
            cSalaDtCadastro = new Date();
        }

        const sala: Sala = {
            salaId: this.formAddSala.value.salaId,
            salaNome: this.formAddSala.value.salaNome,
            salaLotacao: this.formAddSala.value.salaLotacao,
            salaAtiva: this.formAddSala.value.salaAtiva,
            salaPesCadastro: cSalaPesCadastro,
            salaDtCadastro: cSalaDtCadastro,
            salaPesAtualizacao: this.storageService.getLocalUser().pessoa,
            salaDtAtualizacao: new Date(),
            salaUnidade: this.selUnidade.value
        };
        console.log(sala)
        this.salaService.adicionarAtualizarSala(sala).subscribe(ret => {
            console.log("retorno")
            console.log(ret.data)
            if (ret.data != null) {
                if (this.selSala != null) {
                    alert('Sala ' + ret.data.salaNome + ' Atualizada com Sucesso!');
                } else {
                    alert('Sala ' + ret.data.salaNome + ' Adicionada com Sucesso!');
                }
            }
        });
    }

    log(sala) {
        console.log(sala)
        console.log("----")
        console.log(this.selUnidade)
    }
}
