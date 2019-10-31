import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamentosDetalhesRoutingModule } from './agendamentos-detalhes-routing.module';
import { AgendamentosDetalhesComponent } from './agendamentos-detalhes.component';
import { PageHeaderModule } from '../../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Date Picker
import { MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        AgendamentosDetalhesRoutingModule,
        PageHeaderModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AgendamentosDetalhesComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AgendamentosDetalhesModule { }
