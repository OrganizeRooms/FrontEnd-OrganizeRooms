import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Sala, Response } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalaService {
    constructor(private http: HttpClient) { }

    buscarTodasSalas(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/salas`);
    }

    buscarSalaPorId(id: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/salas` + id);
    }

    adicionarAtualizarSala(sala: Sala): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/salas`, sala);
    }

}