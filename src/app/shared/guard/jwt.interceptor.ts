import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentPessoa = this.authenticationService.currentPessoaValue;
        if (currentPessoa && currentPessoa.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentPessoa.token}`
                }
            });
        }

        return next.handle(request);
    }
}