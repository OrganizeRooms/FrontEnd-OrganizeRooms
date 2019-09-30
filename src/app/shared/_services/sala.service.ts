import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Sala } from '../_models';

@Injectable({ providedIn: 'root' })
export class SalaService {
    constructor(private http: HttpClient) { }

    buscarTodos() {
        return this.http.get<Sala[]>(`${API_CONFIG.baseUrl}/salas`);
    }
}