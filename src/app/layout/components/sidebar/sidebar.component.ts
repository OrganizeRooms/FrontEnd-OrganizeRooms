import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService, PessoaService, SessionStorageService } from '../../../shared/_services';
import { Pessoa } from '../../../shared/_models';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    currentPessoa;

    permissao;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router: Router,
        private sessionService: SessionStorageService,
        private authenticationService: AuthenticationService,
        private pessoaService: PessoaService
    ) {

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
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';

        this.permissao = this.sessionService.getSessionUser().pessoa.pesPermissao;
    }

    resetarSenha() {
        this.pessoaService.resetarSenha(this.currentPessoa).subscribe(ret => {
            if (ret.data != 'false') {
                alert("Senha Resetada com Sucesso!")
            } else {
                alert("Erro ao Resetar Senha!")
            }
        });
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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
