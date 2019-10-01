import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Pessoa } from '../_models';

@Injectable({ providedIn: 'root' })
export class PessoaService {
    constructor(private http: HttpClient) { }

    buscarTodos() {
        return this.http.get<Pessoa[]>(`${API_CONFIG.baseUrl}/pessoas`);
    }
}