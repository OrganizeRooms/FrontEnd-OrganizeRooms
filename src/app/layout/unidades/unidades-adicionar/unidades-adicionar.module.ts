import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesAdicionarRoutingModule } from './unidades-adicionar-routing.module';
import { UnidadesAdicionarComponent } from './unidades-adicionar.component';
import { PageHeaderModule } from '../../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Date Picker
import { MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        UnidadesAdicionarRoutingModule,
        PageHeaderModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        UnidadesAdicionarComponent
    ]
})
export class UnidadesAdicionarModule { }
