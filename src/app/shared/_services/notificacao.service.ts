import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Notificacao } from '../_models';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
    constructor(private http: HttpClient) { }

    /*buscarTodos() {
        return this.http.get<Notificacao[]>(`${API_CONFIG.baseUrl}/notificacoes`);
    }*/
}