import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';

// Modal
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Modules
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { HomeComponent } from './home.component';
import { NotificationComponent } from './components';
// Modal
import { HomeDetalhesComponent } from './home-detalhes/home-detalhes.component';

import { MatDialogModule } from '@angular/material/dialog';

// Date Picker
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material';
import { MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        NgbModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
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
