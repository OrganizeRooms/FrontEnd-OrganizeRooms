import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipamentosAdicionarRoutingModule } from './equipamentos-adicionar-routing.module';
import { EquipamentosAdicionarComponent } from './equipamentos-adicionar.component';
import { PageHeaderModule } from '../../../shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Date Picker
import { MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        EquipamentosAdicionarRoutingModule,
        PageHeaderModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        EquipamentosAdicionarComponent
    ]
})
export class EquipamentosAdicionarModule { }
