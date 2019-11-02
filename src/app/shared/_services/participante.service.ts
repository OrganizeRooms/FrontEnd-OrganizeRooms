import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Response, Unidade, Participante } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParticipanteService {
    constructor(private http: HttpClient) { }

    buscarUnidadePorAgendamento(id: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/participantes/` + id);
    }

    adicionarParticipante(participante: Participante): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/participantes`, participante);
    }

    adicionarListaParticipantes(participantes: Array<Participante>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/participantes`, participantes);
    }

}