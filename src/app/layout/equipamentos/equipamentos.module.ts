import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipamentosRoutingModule } from './equipamentos-routing.module';
import { EquipamentosComponent } from './equipamentos.component';
import { PageHeaderModule } from '../../shared';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        EquipamentosRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    declarations: [
        EquipamentosComponent
    ]
})
export class EquipamentosModule { }
