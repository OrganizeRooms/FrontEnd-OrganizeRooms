import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Pessoa } from '../_models';

const pessoas: Pessoa[] = [
    {
        pesId: 1, pesEmail: 'admin@gmail.com', pesSenha: 'admin', pesNome: 'Administrador',
        pesPermissao: 'ADM', pesDDD: '', pesTelefone: '', pesTipoInclusao: '1',
        pesDtCadastro: new Date('18/09/2019'), pesDtAtualizacao: new Date('18/09/2019'),
    },
    {
        pesId: 1, pesEmail: 'lucasrainoldojansen@gmail.com', pesSenha: 'lucas', pesNome: 'Lucas Jansen',
        pesPermissao: 'ADM', pesDDD: '047', pesTelefone: '992821333', pesTipoInclusao: '1',
        pesDtCadastro: new Date('18/09/2019'), pesDtAtualizacao: new Date('18/09/2019'),
    }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/pessoas/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/pessoas') && method === 'GET':
                    return getPessoas();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { pesEmail, pesSenha } = body;
            const pessoa = pessoas.find(x => x.pesEmail === pesEmail && x.pesSenha === pesSenha);
            if (!pessoa) return error('E-mail ou Senha estão Incorretos!');
            return ok({
                pesId: pessoa.pesId,
                pesEmail: pessoa.pesEmail,
                pesSenha: pessoa.pesSenha,
                pesNome: pessoa.pesNome,
                pesPermissao: pessoa.pesPermissao,
                pesDDD: pessoa.pesDDD,
                pesTelefone: pessoa.pesTelefone,
                pesTipoInclusao: pessoa.pesTipoInclusao,
                pesDtCadastro: pessoa.pesDtCadastro,
                pesDtAtualizacao: pessoa.pesDtAtualizacao,
                token: 'fake-jwt-token'
            })
        }

        function getPessoas() {
            if (!isLoggedIn()) return unauthorized();
            return ok(pessoas);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};