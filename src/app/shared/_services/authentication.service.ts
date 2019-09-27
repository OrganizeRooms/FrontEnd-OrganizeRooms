import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Pessoa } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentPessoaSubject: BehaviorSubject<Pessoa>;
    public currentPessoa: Observable<Pessoa>;

    constructor(private http: HttpClient) {
        this.currentPessoaSubject = new BehaviorSubject<Pessoa>(JSON.parse(localStorage.getItem('currentPessoa')));
        this.currentPessoa = this.currentPessoaSubject.asObservable();
    }

    public get currentPessoaValue(): Pessoa {
       return this.currentPessoaSubject.value;
    }

    login(pesEmail: string, pesSenha: string) {
        return this.http.post<any>(`${environment.apiUrl}/pessoas/authenticate`, { pesEmail, pesSenha })
            .pipe(map(pessoa => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentPessoa', JSON.stringify(pessoa));
                this.currentPessoaSubject.next(pessoa);

                return pessoa;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentPessoa');
        this.currentPessoaSubject.next(null);
    }
}