import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Unidade } from '../_models';

@Injectable({ providedIn: 'root' })
export class UnidadeService {
    constructor(private http: HttpClient) { }

    buscarTodos() {
        return this.http.get<Unidade[]>(`${environment.apiUrl}/unidades`);
    }
}