import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Unidade } from '../_models';

@Injectable({ providedIn: 'root' })
export class UnidadeService {
    constructor(private http: HttpClient) { }

    buscarTodos() {
        return this.http.get<Unidade[]>(`${API_CONFIG.baseUrl}/unidades`);
    }
}