import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeDetalhesv1Component } from './home-detalhes.component';

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
        HomeDetalhesv1Component
    ]
})
export class HomeDetalhesv1Module { }
