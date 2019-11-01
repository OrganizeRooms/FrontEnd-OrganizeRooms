import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PessoaService, OrganizeRoomsService, UnidadeService, Pessoa, SessionStorageService } from 'src/app/shared';

@Component({
    selector: 'app-pessoas-adicionar',
    templateUrl: './pessoas-adicionar.component.html',
    styleUrls: ['./pessoas-adicionar.component.scss'],
    animations: [routerTransition()]
})

export class PessoasAdicionarComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;

    formAddPessoa: FormGroup;
    listUnidades;

    selPessoa;
    selUnidade = new FormControl();
    selPermissao;

    pesDtAtualizacao;
    pesAtualizacao;

    constructor(
        private formBuilder: FormBuilder,
        private pessoaService: PessoaService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        private sessionService: SessionStorageService
    ) { }

    ngOnInit() {
        this.selPessoa = this.organizeRoomsService.getValue();

        /*if (this.selPessoa != null && this.selPessoa.pesAtualizacao != null) {
            this.pesAtualizacao = this.selPessoa.pesAtualizacao.pesNome;
            this.pesDtAtualizacao = this.selPessoa.pesDtAtualizacao;
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
        if (this.selPessoa != null) {
            this.formAddPessoa = this.formBuilder.group({
                pesId: [this.selPessoa.pesId],
                pesNome: [this.selPessoa.pesNome, Validators.compose([Validators.required])],
                pesEmail: [this.selPessoa.pesEmail, Validators.compose([Validators.required])],
                // pesPermissao: [this.selPessoa.pesPermissao],
                pesDDD: [this.selPessoa.pesDdd],
                pesTelefone: [this.selPessoa.pesTelefone],
                pesTipoInclusao: [this.selPessoa.pesTipoInclusao],
                pesDtCadastro: [this.selPessoa.pesDtCadastro],
            });
            this.selPermissao = this.selPessoa.pesPermissao
            console.log(this.selUnidade)
            this.selUnidade = new FormControl(this.selPessoa.pesUnidade)
            console.log(this.selUnidade)
        } else {
            this.formAddPessoa = this.formBuilder.group({
                pesId: [0],
                pesNome: [null, Validators.compose([Validators.required])],
                pesEmail: [null, Validators.compose([Validators.required])],
                // pesPermissao: [null],
                pesDDD: [null],
                pesTelefone: [null],
                pesTipoInclusao: ['SIS'],
                pesDtCadastro: [new Date()],
            });
            this.selPermissao = 'ROLE_USUARIO';
        }
    }

    adicionarPessoa() {

        const pessoa: Pessoa = {
            pesId: this.formAddPessoa.value.pesId,
            pesNome: this.formAddPessoa.value.pesNome,
            pesEmail: this.formAddPessoa.value.pesEmail,
            pesPermissao: this.selPermissao,
            pesDescricaoPermissao: null,
            pesUnidade: this.selUnidade.value,
            pesDdd: this.formAddPessoa.value.pesDDD,
            pesTelefone: this.formAddPessoa.value.pesTelefone,
            pesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            pesDtAtualizacao: new Date(),
            // NÃO É ATUALIZADO 
            pesTipoInclusao: null,
            pesCadastro: null,
            pesDtCadastro: null,
        };
        console.log(pessoa)
        this.pessoaService.adicionarAtualizarPessoa(pessoa).subscribe(ret => {
            console.log("retorno")
            console.log(ret.data)
            if (ret.data != null) {
                if (this.selPessoa != null) {
                    alert('Pessoa ' + ret.data.pesNome + ' Atualizada com Sucesso!');
                } else {
                    alert('Pessoa ' + ret.data.pesNome + ' Adiconada com Sucesso!');
                }
            }
        });
    }

    resetarSenha(){
        this.pessoaService.resetarSenha(this.selPessoa).subscribe(ret => {
            if(ret.data != 'false'){
                alert("Senha Resetada com Sucesso!")
            }else{
                alert("Erro ao Resetar Senha!")
            }
        });
    
    }

    log(unidade) {
        console.log(unidade)
        console.log("----")
        console.log(this.selUnidade)
    }

}
