import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalasAdicionarRoutingModule } from './salas-adicionar-routing.module';
import { SalasAdicionarComponent } from './salas-adicionar.component';
import { PageHeaderModule } from '../../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Date Picker
import { MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        SalasAdicionarRoutingModule,
        PageHeaderModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        SalasAdicionarComponent
    ]
})
export class SalasAdicionarModule { }
