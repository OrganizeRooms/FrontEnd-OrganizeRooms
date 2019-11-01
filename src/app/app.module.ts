import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor, ErrorInterceptor } from './shared/guard';

// Services
import { StorageService, AuthenticationService, OrganizeRoomsService, SessionStorageService } from './shared/_services';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [       
        StorageService,
        SessionStorageService,
        AuthenticationService,
        OrganizeRoomsService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
