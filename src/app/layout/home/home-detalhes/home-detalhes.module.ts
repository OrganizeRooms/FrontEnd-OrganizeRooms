import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeDetalhesComponent } from './home-detalhes.component';

// Modules
import { FormsModule } from '@angular/forms';

import {MatDialogModule, MatToolbarModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatToolbarModule
    ],
    declarations: [
        HomeDetalhesComponent
    ]
})
export class HomeDetalhesModule { }
