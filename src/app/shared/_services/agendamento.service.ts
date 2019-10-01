import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Agendamento } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
    constructor(private http: HttpClient) { }

    buscarTodosAgendamentos() {
        return this.http.get<Agendamento[]>(`${API_CONFIG.baseUrl}/agendamentos`);
    }

    getPorUsuario() {
        return this.http.get<Agendamento[]>(`${API_CONFIG.baseUrl}/agendamentos`);
    }

    addAgendamento(ingrediente: Agendamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/ingrediente`, ingrediente);
    }

    atualizarAgendamento(ingrediente: Agendamento): Observable<Response> {
        return this.http.put<Response>(`${API_CONFIG.baseUrl}/ingrediente`, ingrediente);
    }

    //deletarAgendamento(ingrediente: Agendamento): Observable<Response> {
   //     return this.http.delete<Response>(`${API_CONFIG.baseUrl}/ingrediente/${ingrediente.id}`);
    //}

}