import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_CONFIG } from '../../shared/_config';
import { Pessoa, LocalUser, UsuarioDTO } from '../_models';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    usuarioLogado: EventEmitter<Boolean> = new EventEmitter();


    constructor(private http: HttpClient,
      private storageService: StorageService,
      private router: Router) { }
  
    authenticate(creds: UsuarioDTO) {
      return this.http.post(
        `${API_CONFIG.baseUrl}/login`,
          creds, {
          observe: 'response',
          responseType: 'text'
        }
      );
    }
  
    successfulLogin(ret) {
      const user: LocalUser = {
        token: ret.data.token,
        email: '',
        usuario: ret.usuario
      };
      this.storageService.setLocalUser(user);
      this.usuarioLogado.emit(true);
      this.router.navigate(['/home']);
    }
  
    noSuccessfulLogin() {
      const user: LocalUser = {
        token: '',
        email: '',
        usuario: ''
      };
      this.storageService.setLocalUser(null);
      this.usuarioLogado.emit(false);
    }
}