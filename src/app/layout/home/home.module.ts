import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modal
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Modules
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { HomeComponent } from './home.component';
import { NotificationComponent } from './components';
// Modal
import { MatDialogModule } from '@angular/material/dialog';
import { HomeDetalhesComponent } from './home-detalhes/home-detalhes.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        NgbModule
    ],
    declarations: [
        HomeComponent,
        NotificationComponent,
        HomeDetalhesComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [
        HomeDetalhesComponent
    ]
})
export class HomeModule { }
