import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Notificacao } from '../_models';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
    constructor(private http: HttpClient) { }

    /*buscarTodos() {
        return this.http.get<Notificacao[]>(`${environment.apiUrl}/notificacoes`);
    }*/
}