import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Equipamento } from '../_models';

@Injectable({ providedIn: 'root' })
export class EquipamentoService {
    constructor(private http: HttpClient) { }

    buscarTodos() {
        return this.http.get<Equipamento[]>(`${API_CONFIG.baseUrl}/equipamentos`);
    }
}