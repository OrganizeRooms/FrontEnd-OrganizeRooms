import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Equipamento } from '../_models';

@Injectable({ providedIn: 'root' })
export class EquipamentoService {
    constructor(private http: HttpClient) { }

    buscarTodos() {
        return this.http.get<Equipamento[]>(`${environment.apiUrl}/equipamentos`);
    }
}