import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SalasRoutingModule } from './salas-routing.module';
import { SalasComponent } from './salas.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        SalasRoutingModule,
        PageHeaderModule,
        NgbModule
    ],
    declarations: [
        SalasComponent
    ]
})
export class SalasModule { }
