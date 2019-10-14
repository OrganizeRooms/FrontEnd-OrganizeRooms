import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_CONFIG } from '../../shared/_config';
import { LocalUser, Pessoa } from '../_models';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  pessoaLogada: EventEmitter<Boolean> = new EventEmitter();

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router) { }

  authenticate(creds: Pessoa) {
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
      pesEmail: ret.pessoa.pesEmail,
      pessoa: ret.pessoa
    };
    this.storageService.setLocalUser(user);
    this.pessoaLogada.emit(true);
    this.router.navigate(['/home']);
  }

  noSuccessfulLogin() {
    const user: LocalUser = {
      token: '',
      pesEmail: '',
      pessoa: ''
    };
    this.storageService.setLocalUser(null);
    this.pessoaLogada.emit(false);
  }

  // Logar sem utilizar o WebService
  fakelogin() {
    const user: LocalUser = {
      token: '234',
      pesEmail: 'admin@admin.com',
      pessoa: 'Administrador'
    };
    this.storageService.setLocalUser(user);
    this.pessoaLogada.emit(true);
  }
}