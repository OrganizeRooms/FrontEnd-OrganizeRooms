import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Pessoa, Response } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PessoaService {
    constructor(private http: HttpClient) { }

    buscarTodasPessoas(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/pessoas`);
    }

    adicionarAtualizarPessoa(pessoa: Pessoa): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas`, pessoa);
    }

    importarPessoas(pessoas: Array<Pessoa>): Observable<Response>{
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas/importar`, pessoas);
    }

    resetarSenha(pessoa: Pessoa): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas/resetarSenha`, pessoa);
    }

}