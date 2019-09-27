import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Sala } from '../_models';

@Injectable({ providedIn: 'root' })
export class SalaService {
    constructor(private http: HttpClient) { }

    buscarTodos() {
        return this.http.get<Sala[]>(`${environment.apiUrl}/salas`);
    }
}