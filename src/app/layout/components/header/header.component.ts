import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService, PessoaService, SessionStorageService } from '../../../shared/_services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    currentPessoa;
    
    constructor(public router: Router,
        private sessionService: SessionStorageService,
        private authenticationService: AuthenticationService,
        private pessoaService: PessoaService) {
        
        this.currentPessoa = this.sessionService.getSessionUser().pessoa;

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    resetarSenha(){
        this.pessoaService.resetarSenha(this.currentPessoa).subscribe(ret => {
            if(ret.data != 'false'){
                alert("Senha Resetada com Sucesso!")
            }else{
                alert("Erro ao Resetar Senha!")
            }
        });
    
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    logout() {
        this.authenticationService.noSuccessfulLogin();//DESLOGAR
        this.router.navigate(['/login']);
    }
}
