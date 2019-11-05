import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sala, OrganizeRoomsService, SalaService, UnidadeService, SessionStorageService } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-salas-adicionar',
    templateUrl: './salas-adicionar.component.html',
    styleUrls: ['./salas-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class SalasAdicionarComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;

    formAddSala: FormGroup;
    listUnidades;

    selSala;
    selUnidade = new FormControl();

    salaDtAtualizacao;
    salaPesAtualizacao;

    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private salaService: SalaService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService
    ) { }

    ngOnInit() {
        this.selSala = this.organizeRoomsService.getValue();

        /*if (this.selSala != null && this.selSala.salaPesAtualizacao != null) {
            this.salaPesAtualizacao = this.selSala.salaPesAtualizacao.pesNome;
            this.salaDtAtualizacao = this.selSala.salaDtAtualizacao;
        }*/

        console.log(this.selUnidade)
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
        if (this.selSala != null) {
            this.formAddSala = this.formBuilder.group({
                salaId: [this.selSala.salaId],
                salaNome: [this.selSala.salaNome, Validators.compose([Validators.required])],
                salaLotacao: [this.selSala.salaLotacao, Validators.compose([Validators.required])],
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
                salaNome: [null, Validators.compose([Validators.required])],
                salaLotacao: [null, Validators.compose([Validators.required])],
                salaAtiva: [true],
                salaDtCadastro: [new Date()]
            });
        }
    }

    adicionarSala() {

        var salaPesCadastro;
        if (this.selSala != null) {
            salaPesCadastro = null
        } else {
            salaPesCadastro = this.sessionService.getSessionUser().pessoa.pesId
        }

        const sala: Sala = {
            salaId: this.formAddSala.value.salaId,
            salaNome: this.formAddSala.value.salaNome,
            salaLotacao: this.formAddSala.value.salaLotacao,
            salaAtiva: this.formAddSala.value.salaAtiva,
            salaPesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            salaDtAtualizacao: new Date(),
            salaUnidade: this.selUnidade.value,
            salaPesCadastro: salaPesCadastro,
            // NÃO É ATUALIZADO 
            salaDtCadastro: null,
        };
        console.log(sala)
        this.salaService.adicionarAtualizarSala(sala).subscribe(ret => {
            console.log("retorno")
            console.log(ret.data)
            if (ret.data != null) {
                if (this.selSala != null) {
                    alert('Sala ' + ret.data.salaNome + ' Atualizada com Sucesso!');
                    this.router.navigate(['/salas']);
                } else {
                    alert('Sala ' + ret.data.salaNome + ' Adicionada com Sucesso!');
                    this.router.navigate(['/salas']);
                }
            }
        });
    }

    excluir() {

    }

    log(sala) {
        console.log(sala)
        console.log("----")
        console.log(this.selUnidade)
    }
}
