import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
// Modal
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Modules
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Date Picker
import { MatFormFieldModule, MatDatepickerModule, MatInputModule} from '@angular/material';

// Components
import { HomeComponent } from './home.component';
import { NotificationComponent } from './components';
// Modal
import { HomeDetalhesComponent } from './home-detalhes/home-detalhes.component';

import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        HomeRoutingModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
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
