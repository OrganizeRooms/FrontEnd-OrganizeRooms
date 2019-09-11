import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas.component';
import { PageHeaderModule } from '../../shared';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        PessoasRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    declarations: [
        PessoasComponent
    ]
})
export class PessoasModule { }
