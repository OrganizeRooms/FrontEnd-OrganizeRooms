import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { PageHeaderModule } from '../../shared';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        UnidadesRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    declarations: [
        UnidadesComponent
    ]
})
export class UnidadesModule { }
