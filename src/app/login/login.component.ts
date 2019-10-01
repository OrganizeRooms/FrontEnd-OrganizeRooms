import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routerTransition } from '../router.animations';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../shared/_services';
import { UsuarioDTO } from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    @Input() logarDeslogar: boolean;

    creds: UsuarioDTO = {
        id: '',
        nome: '',
        email: '',
        perfil: '',
        senha: '',
        dsPerfil: '',
        nomeContato: '',
        telefone1: '',
        telefone2: '',
        telefoneFixo: '',
        rg: '',
        cpf: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        dataContrato: ''
    };

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            pesEmail: [null],
            pesSenha: [null]
        });

    }

    onSubmit() {
        this.creds.email = this.loginForm.value.pesEmail;
        this.creds.senha = this.loginForm.value.pesSenha;

        this.authenticationService.authenticate(this.creds).subscribe(response => {
            const aux = JSON.parse(response.body);
            this.authenticationService.successfulLogin(aux);
        }, error => {
            this.authenticationService.noSuccessfulLogin();
            this.showError();
        });
        console.log(this.logarDeslogar);
    }

    /*onSubmitRegistro() {
        const userEmail = {
            remetNome: this.formularioRegistro.value.remetNome,
            remetEmail: this.formularioRegistro.value.remetEmail,
            tipoEnvio: 1
        };

        this.enviarEmailService.EnviarEmail(userEmail).subscribe(ret => {
            if (ret.data) {
                alert('Email enviado com sucesso');
            }
        });
    }*/

    showError() {
        alert('funcionou não');
    }

    deslogar() {
        this.authenticationService.noSuccessfulLogin();
        this.router.navigate(['/login']);
    }

    logar() {

        this.router.navigate(['/home']);
    }

}