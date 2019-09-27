import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Agendamento } from '../_models';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
    constructor(private http: HttpClient) { }

    buscarTodos() {
        return this.http.get<Agendamento[]>(`${environment.apiUrl}/agendamentos`);
    }

    getPorUsuario() {
        return this.http.get<Agendamento[]>(`${environment.apiUrl}/agendamentos`);
    }
}