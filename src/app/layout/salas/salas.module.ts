import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalasRoutingModule } from './salas-routing.module';
import { SalasComponent } from './salas.component';
import { PageHeaderModule } from '../../shared';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        SalasRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    declarations: [
        SalasComponent
    ]
})
export class SalasModule { }
